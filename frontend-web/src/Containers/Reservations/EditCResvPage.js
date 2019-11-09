import React, { Component } from 'react';

import './EditCResvPage.css'
import BookRestaurant from '../SearchForm/BookRestaurant';
import DeleteModal from '../../Components/Modals/DeleteModal';
import dateParser from '../../Common/ParserUtil';

/**
 * Page that shows the list of Reservations that a customer has made
 */
class EditCResvPage extends Component {
    render() {
        const { resvData, userID } = this.props.location.state;
        const { dateTime, location, pax , resName, resUrl, resid, table } = resvData;

        return (
            <div className='flex flex-column items-center relative'>
                <h1 className='editHeader pt5'> Edit Reservation </h1>

                <div className="pv3">
                    <h3 className> Restaurant Name: {resName} </h3>
                    <h3 className> Restaurant Location: {location} </h3>
                    <h3 className> Your Stated Pax: {pax} </h3>
                    <h3 className> Your Stated Table: {table} </h3>
                    <h3 className> Your Stated DateTime: {dateParser(dateTime)} </h3>

                </div>
                
                
                <BookRestaurant 
                    isEditing = {true}
                    userID = {userID}
                    resUrl = {resUrl}
                    franchisorId = {resid}
                    location = {location}
                    oldDateTime = {dateTime}
                    oldTableNumber = {table}
                />

                <h2 className='white pt4 editText'> I wish to cancel my Reservation</h2>
                <div className=''>
                    <DeleteModal
                        data={resvData}
                        userID={userID}
                        className='deleteModal' />
                </div>
            </div>
        );
    }
}

export default EditCResvPage;