import React from 'react';
import { Header, Segment } from 'semantic-ui-react'

/**
 * A card representing a food item
 * foodData is an object that consists of the keys name, cuisine, type and price
 */
const FoodCard = ({ foodData }) => {
    const { name, cuisine, type, price } = foodData;
    return (
        <div className=''>
            <Header as='h2' attached='top'>
                {name}
            </Header>
            <Segment attached className=''>
                <p className='black'>Cuisine: {cuisine}</p>
                <p className='black'>Type: {type}</p>
                <p className='black'>Price: {price}</p>
            </Segment>
        </div>

    );
}

export default FoodCard;