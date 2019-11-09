import React, { Component } from 'react';
import FranchiseOwnedResPage from './FranchiseOwnedResPage';
import CustomerRestaurantListPage from './CustomerRestaurantListPage';

/**
 * A simple page to show the entire list of Restaurants (For Customers),
 * or the entire list of Restaurants owned by a Franchise
 */
class RestaurantsListPage extends Component {

    render() {
        const { userID, isFranchiseOwner } = this.props;
        return (
            <div>
                <div className="pt0 mt0">
                    {
                        isFranchiseOwner
                            ? <FranchiseOwnedResPage userID={userID} />
                            : <CustomerRestaurantListPage userID={userID}/>
                    }
                </div>
            </div>
        );
    }
}

export default RestaurantsListPage;