import React from 'react';
import RestaurantCard from '../Cards/RestaurantCard';
import './RestaurantDisplayBulletin.css';

const RestaurantDisplayBulletin = ({ resDisplay }) => {
    return (
        <div id='RDB'>
            {resDisplay.map((data) => {
                return <RestaurantCard data={data} key={data.Name}/>
            })}
        </div>
    );
};

export default RestaurantDisplayBulletin;