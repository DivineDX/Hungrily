import React from 'react';
import { Link } from 'react-router-dom'
import { Card, Icon, Image } from 'semantic-ui-react';
import foodImage from '../../Images/food.jpg';
import './RestaurantCard.css';

const RestaurantCard = (props) => {
    const loadedData = props.data;
    const { Name, Area, cuisine, Opening_hours, Closing_hours, url } = loadedData;

    return (
        <Card className='ResCard'>
            <Image src={foodImage} wrapped ui={false} />
            <Card.Content>
                <Card.Header className='NameHeader'>
                    <Link to={`/restaurants/${url}`}>
                        {Name}
                    </Link>
                </Card.Header>

                <div>
                    <Card.Meta>
                        <span>Cuisine: {cuisine}</span>
                    </Card.Meta>
                    <Card.Meta>
                        <span>Area: {Area}</span>
                    </Card.Meta>
                </div>
            </Card.Content>
            <Card.Content extra>
                <Icon name='clock' />
                Operating Hours: {Opening_hours} to {Closing_hours}
            </Card.Content>
        </Card>
    )
}

export default RestaurantCard;