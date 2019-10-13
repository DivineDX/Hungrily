import React from 'react';
import { Link } from 'react-router-dom'
import { Button } from 'semantic-ui-react';
import './RestaurantCard.css';

const RestaurantCard = (props) => {
    const { name, area, cuisine, price, opening_hrs, closing_hrs, url } = props.data;

    return (
        <div id = "RestaurantCard" className="relative flex ba bw1 br4 shadow-5 ma3 pa3 bg-washed-red">
            <div className='flex flex-column w-80'>
                <h1 className = 'f3 black'>
                        <Link to={`/restaurants/${url}`}>
                            {name}
                        </Link>
                </h1>
                <div><b>Cuisine: </b>{cuisine}</div>
                <div><b>Area: </b>{area}</div>
                <div><b>Operating Hours: </b>{opening_hrs} to {closing_hrs}</div>
                <div><b>Price: </b>{price}</div>
            </div>
            <div className = 'w-20 flex items-center justify-center'>
                <Button className = ''>Book Now</Button>
            </div>
        </div>
    )
}

export default RestaurantCard;