import React from 'react';
import { Header, Segment, Button } from 'semantic-ui-react'
import './VoucherCard.css'

/**
 * A card representing a VoucherCard
 */
const VoucherCard = () => {
    const square = { width: 300, height: 300 }

    return (
        <div id='VoucherContainer'>
            <Segment circular style={square}>
                <Header as='h2' className='voucherFont'>
                    Voucher Name
                    <div className='pt3 pb2'>
                        <Header.Subheader className='voucherFont'> Voucher Code </Header.Subheader>
                    </div>
                    <div className='pb2'>
                        <Header.Subheader className='voucherFont'> Description </Header.Subheader>
                    </div>
                    <div className='pb2'>
                        <Header.Subheader className='voucherFont'> Cost </Header.Subheader>
                    </div>
                    <Button> Buy Voucher</Button>
                </Header>
            </Segment>
        </div>

    );
}

export default VoucherCard;