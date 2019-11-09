import React from 'react';
import { Link } from 'react-router-dom'
import { Card, Icon, Image } from 'semantic-ui-react';
import foodImage from '../../Images/food.jpg';
import './RestaurantCard.css';

const RestaurantCard = (props) => {
    const loadedData = props.data;
    const { name, area, cuisine, openingHours, closingHours, price, url, ratings } = loadedData;

    return (
        <Card className='ResCard'>
            <Image src={foodImage} wrapped ui={false} />
            <Card.Content>
                <Card.Header className='NameHeader'>
                    <Link to={`/restaurants/${url}`}>
                        {name}
                    </Link>
                </Card.Header>

                <div>
                    <Card.Meta>
                        <span>Cuisine: {cuisine}</span>
                    </Card.Meta>
                    <Card.Meta>
                        <span>Area: {area}</span>
                    </Card.Meta>
                    <Card.Meta>
                        <span>Price: {price}</span>
                        <span id='Right'>Ratings: {ratings}</span>
                    </Card.Meta>
                </div>
            </Card.Content>
            <Card.Content extra>
                <Icon name='clock' />
                Operating Hours: {openingHours} to {closingHours}
            </Card.Content>
        </Card>
    )
}

export default RestaurantCard;