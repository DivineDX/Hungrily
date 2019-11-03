import React, { Component } from 'react';
import FranchiseOwnedResPage from './FranchiseOwnedResPage';
import CustomerRestaurantListPage from './CustomerRestaurantListPage';

/**
 * A simple page to show the entire list of Restaurants (For Customers),
 * or the entire list of Restaurants owned by a Franchise
 */
class RestaurantsListPage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { isSignedIn, isFranchiseOwner } = this.props;
        return (	 //acts as a card list here
            <div>
                <div className="pt0 mt0">
                    {
                        isFranchiseOwner
                        ? <FranchiseOwnedResPage userID = {this.props.userID}/>
                        : <CustomerRestaurantListPage />
                    }
                </div>
            </div>
        );
    }
}

export default RestaurantsListPage;