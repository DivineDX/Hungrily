import React, { Component } from 'react';
import CustomerRes from '../Reservations/CustomerRes';
import FranchiseORes from '../Reservations/FranchiseORes';

import './CustomerRes.css'

/**
 * Container that renders Reservations Pages depending on the type of user logged in
 */
class Reservations extends Component {
    render() {
        const {isFranchiseOwner, userID} = this.props;
        return (
            <div className="w-75 pt5 pb0 mb0 center bb b--black-10">
                <h1 className="tc baskerville f1 fw5 pb0 mb0">My Reservations</h1>
                <div className="pt0 mt0">
                    {
                        isFranchiseOwner 
                        ? <FranchiseORes userID = {userID}/>
                        : <CustomerRes userID = {userID}/>
                    }
                </div>
            </div>
        );
    }
}

export default Reservations;