import React from 'react';
import { Link } from 'react-router-dom'
import { Card, Icon, Image } from 'semantic-ui-react';
import foodImage from '../../Images/food.jpg';
import './CustomerResCard.css';

const CustomerResCard = (props) => {
    const loadedData = props.data;
    // const { Name, Area, BookDate, BookTime, Pax } = loadedData;

    return (
        <div class="ui card" id='ResvCard'>
            <Image
                fluid
                src={foodImage}
                alt="Error" className="w-100" id="cardImage"
            />
            {/* <div class="NameHeader"> {Name} </div> */}
            <div class="content">
                {/* <div class="meta"> Area: {Area} </div> */}
            </div>
            <div class="extra content">
                <Icon name='clock' /> 
                {/* Booking Time: {BookTime} */}
            </div>
        </div>
    )
}

export default CustomerResCard;