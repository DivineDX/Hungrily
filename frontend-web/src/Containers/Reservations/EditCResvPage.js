import React, { Component } from 'react';
import url from '../../Config/url';
import food from '../../Images/food.jpg'

import './EditCResvPage.css'
import BookRestaurant from '../SearchForm/BookRestaurant';
import DeleteModal from '../../Components/Modals/DeleteModal';

/**
 * Page that shows the list of Reservations that a customer has made
 */
class EditCResvPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            reservation: {},
        }
    }

    editReservation() {
        fetch(`${url.fetchURL}/editResv`, {
            method: 'post',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
                userID: this.props.userID,
            })
        })
            .then(resp => resp.json())
            .then(data => { 
                const resvData = data.map(x => {
                    const dateObj = {
                        dateTime: new Date(x.dateTime),
                    };
                    return Object.assign(x, dateObj)
                });
                this.setState({
                    reservation: resvData,
                });
            }).catch(error => {
                console.log(error);
            })
    }

    render() {
        // const { resName } = this.props.data;
        return (
            <div className='mb3 pb3 editContainer'>
                <h1 className='editHeader pt5'> Edit Reservation </h1>
                <img
                        className="mt3 pt3 relative pageimg"
                        src=""
                        onError={(e) => { e.target.onerror = null; e.target.src = food }}
                        alt="Error" />

                    <div className="pv3">
                        {/* <h1 className='restName'> { resName } </h1> */}
                        <h1 className='restName'> Name </h1> 
                    </div>
 
                <div className='bookbar'> 
                    <BookRestaurant/> 
                </div>
                <h2 className='white pt4 editText'> I wish to cancel my Reservation</h2>
                <div className = 'relative'>
                    <DeleteModal data = {this.props.data} userID = {this.props.userID} fetchReservations = {this.props.fetchReservations} className='deleteModal'/>

                </div>
            </div>
        );
    }
}

export default EditCResvPage;