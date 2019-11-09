import React, { Component } from 'react';
import { Header, Segment, Button } from 'semantic-ui-react'

import url from '../../Config/url';
import './VoucherCard.css'

/**
 * A card representing a VoucherCard
 */
export default class VoucherCard extends Component {
    state = {
        buyingLoad: false,
        buySuccess: false,
        error: false,
    }

    buyVoucher = () => {
        this.setState({ buyingLoad: true });
        fetch(`${url.fetchURL}/buyVoucher`, {
            method: 'post',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
                userID: this.props.userID,
                voucherName: this.props.data.voucherName
            })
        })
            .then(resp => resp.json())
            .then(data => {
                if (data === 'success') {
                    this.setState({ buyingLoad: false, buySuccess: true })
                    this.props.refresh()
                } else { //not enough points
                    this.setState({ buyingLoad: false, error: true })
                    this.props.refresh()
                }
            }).catch(error => {
                console.log(error);
            })
    }

    render() {
        const { voucherName, cost, discount, description, owned, canBuy } = this.props.data;
        const square = { width: 300, height: 300 }

        return (
            <div id='VoucherContainer'>
                <Segment circular style={square}>
                    <Header as='h2' className='voucherFont'>
                        {voucherName}
                        <div className='pb2 pt2'>
                            <Header.Subheader className='voucherFont'> {description} </Header.Subheader>
                        </div>
                        <div className='pb2'>
                            <Header.Subheader className='voucherFont'> Discount: {discount}% OFF </Header.Subheader>
                        </div>
                        <div className='pb2'>
                            <Header.Subheader className='voucherFont'> Cost: {cost} Points </Header.Subheader>
                        </div>
                        <div className='pb2'>
                            <Header.Subheader className='voucherFont'> <b className='black'>Currently Owned:</b> {owned} </Header.Subheader>
                        </div>
                        {this.state.buySuccess &&
                            <div className='pb2'>
                                <Header.Subheader className='voucherFont'>Voucher Successfully Bought!</Header.Subheader>
                            </div>
                        }

                        {this.state.error &&
                            <div className='pb2'>
                                <Header.Subheader className='voucherFont'>Something went wrong!</Header.Subheader>
                            </div>
                        }
                    </Header>

                    <Button
                        loading={this.state.buyingLoad}
                        disabled={!canBuy}
                        onClick={this.buyVoucher}
                    >
                        Buy Voucher
                    </Button>
                </Segment>
            </div>

        );
    }
}