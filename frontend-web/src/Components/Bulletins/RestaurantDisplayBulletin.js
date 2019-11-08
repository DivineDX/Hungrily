import React from 'react';
import RestaurantCard from '../Cards/RestaurantCard';
import './RestaurantDisplayBulletin.css';

const RestaurantDisplayBulletin = ({ resDisplay, visibleItems}) => {
    return (
        <div id='RDB'>
            {resDisplay.slice(0, visibleItems).map((data) => {
                return <RestaurantCard 
                    data={data} 
                    key={data.Name}/>
            })}
        </div>
    );
};

export default RestaurantDisplayBulletin;