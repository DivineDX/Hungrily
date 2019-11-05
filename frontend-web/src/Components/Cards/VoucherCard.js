import React from 'react';
import { Header, Segment, Button } from 'semantic-ui-react'
import './VoucherCard.css'

/**
 * A card representing a VoucherCard
 */
const VoucherCard = ({ data }) => {
    const { name, cost, discount, description } = data;
    const square = { width: 300, height: 300 }

    return (
        <div id='VoucherContainer'>
            <Segment circular style={square}>
                <Header as='h2' className='voucherFont'>
                    {name}
                    <div className='pb2 pt2'>
                        <Header.Subheader className='voucherFont'> {description} </Header.Subheader>
                    </div>
                    <div className='pt3 pb2'>
                        <Header.Subheader className='voucherFont'> Discount: {discount}% OFF </Header.Subheader>
                    </div>

                    <div className='pb2'>
                        <Header.Subheader className='voucherFont'> Cost: {cost} Points </Header.Subheader>
                    </div>
                    <Button> Buy Voucher</Button>
                </Header>
            </Segment>
        </div>

    );
}

export default VoucherCard;