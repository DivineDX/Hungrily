import React from 'react';
import { Icon, Card } from 'semantic-ui-react';
import './LoyalCustomerCard.css'

const LoyalCustomerCard = ({loyalCustomerData}) => {

    const { userID, numBookings, percentBookings } = loyalCustomerData;

    return (
        <Card>
            <Card.Content>
                <Card.Header className = 'mb2 loyalHeaderText'>
                Customer UserID: {userID}
                </Card.Header>

                <div>
                    <Card.Meta>
                        <Icon name='book' />
                        <span className='ml1 loyalText'> Number of Bookings: {numBookings} </span>
                    </Card.Meta>
                    <Card.Meta>
                        <Icon name='percent' />
                        <span className='ml1 loyalText'> Percentage of Bookings: {percentBookings} </span>
                    </Card.Meta>

                </div>
            </Card.Content>
        </Card>
    )
}

export default LoyalCustomerCard;