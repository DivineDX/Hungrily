import React, { Component } from 'react';

import url from '../../Config/url';
import VoucherCard from '../../Components/Cards/VoucherCard';
import './VoucherList.css';

class Voucherlist extends Component {
    constructor(props) {
        super(props)
        this.state = {
            vouchers: [],
            customerPoints: 0,
            loading: true,
            pointLoadFailed: false
        }
    }

    componentDidMount() {
        //refresh userdata (for point refresh)
        this.refreshPage();
    }

    refreshPage() {
        this.getUserPoints();
        this.fetchVouchers();
    }

    getUserPoints() {
        fetch(`${url.fetchURL}/userPoints`, {
            method: 'post',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
                userID: this.props.userID,
            })
        })
            .then(resp => resp.json())
            .then(points => {
                points === 'fail' || points === 'Unable to Retrieve'
                    ? this.setState({ pointLoadFailed: true })
                    : this.setState({ customerPoints: points })
            }).catch(error => {
                console.log(error);
            })
    }

    fetchVouchers() {
        fetch(`${url.fetchURL}/voucherList`, {
            method: 'post',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
                userID: this.props.userID,
            })
        })
            .then(resp => resp.json())
            .then(data => {
                this.setState({ vouchers: data, loading: false })
            }).catch(error => {
                console.log(error);
            })
    }

    render() {
        return (
            <div className="w-75 pt5 center bb b--black-10 relative">
                <h1 className="tc baskerville f1 fw5"> Vouchers Page</h1>

                <h3 className="tc baskerville fw5 white">
                    {
                        this.state.pointLoadFailed
                            ? <div>Error: Unable to load points</div>
                            : <div>You have {this.state.customerPoints} points to spend</div>
                    }

                </h3>
                <div id='voucherGrid'>
                    {this.state.vouchers.map((data) => {
                        return <VoucherCard
                            key={data.voucherName}
                            data={data}
                            userID={this.props.userID}
                            refresh={this.refreshPage.bind(this)}
                        />
                    })}
                </div>
            </div>
        );
    }
}

export default Voucherlist;