import React from 'react';
import { Link } from 'react-router-dom'
import { Card, Icon, Image } from 'semantic-ui-react';
import foodImage from '../../Images/food.jpg';

const ReservationCard = (props) => {
    const loadedData = props.data;
    const { Name, Area, BookingTime, url } = loadedData;

    return (
        <Card className='ResCard'>
            <Image
                fluid
                src={foodImage}
                alt="Error" className="w-100" id="cardImage"
            />
            <Card.Content>
                <Card.Header className='NameHeader'>
                    <Link to={`/restaurants/${url}`}>
                        {Name}
                    </Link>
                </Card.Header>

                <div>
                    <Card.Meta>
                        <span>Area: {Area}</span>
                    </Card.Meta>
                </div>
            </Card.Content>
            <Card.Content extra>
                <Icon name='clock' />
                Booking Time: {BookingTime}
            </Card.Content>
        </Card>
    )
}

export default ReservationCard;