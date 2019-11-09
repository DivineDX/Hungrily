import React from 'react';
import MenuModal from '../../Components/Modals/MenuModal';
import './RestaurantDetailBox.css';

const RestaurantDetailBox = (props) => {
    const { location, area, opening_hours, closing_hours, cuisine, price } = props.resData;
    const specialOpHrsArr = props.specialOpHrs; //array of keys: day, open, close

    return (
        <div id='resDetailsBox' className='relative flex flex-row justify-center mt4 mb4'>
            <div className='flex flex-column pr3 detailBoxColumn'>
                <div className='containerText fl'>
                    <h3 className='b f3'> Cuisine </h3>
                    <p className=''> {cuisine} </p>
                </div>

                <div className='containerText'>
                    <MenuModal menuData={props.menuData} />
                </div>

                <div className='containerText'>
                    <h3 className='b f3'> Price </h3>
                    <p className=''> {price} </p>
                </div>

                <div className='containerText'>
                    <h3 className='b f3'> Location </h3>
                    <p className=''> {area} </p>
                </div>

                <div className='containerText mw5 addressField'>
                    <h3 className='b f3'> Address </h3>
                    <p className=''> {location} </p>
                </div>
            </div>

            <div className='flex flex-column'>
                <div className='containerText'>
                    <h3 className='b f3'> Opening Hours </h3>
                    <p className=''>
                        Mon-Sun: {opening_hours} - {closing_hours}
                    </p>
                </div>

                <div className='containerText'>
                    <h3 className='b f3'> Special Operating Hours: </h3>
                    {
                        specialOpHrsArr.length === 0
                            ? <p>None listed</p>
                            : <div> {
                                specialOpHrsArr.map(entry => {
                                    const string = entry.day + ": " + entry.open + "-" + entry.close;
                                    return <p>{string}</p>
                                })
                            } </div>
                    }
                </div>
            </div>
        </div>
    );
}

export default RestaurantDetailBox;