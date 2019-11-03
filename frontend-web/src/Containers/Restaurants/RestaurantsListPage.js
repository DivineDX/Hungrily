import React, { Component } from 'react';
import FranchiseOwnedResPage from './FranchiseOwnedResPage';
import CustomerRestaurantListPage from './CustomerRestaurantListPage';

/**
 * A simple page to show the entire list of Restaurants (For Customers),
 * or the entire list of Restaurants owned by a Franchise
 */
class RestaurantsListPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true,
        }
    }

    render() {
        const { isSignedIn, isFranchiseOwner } = this.props;
        console.log(isSignedIn);
        console.log(isFranchiseOwner);

        return (	 //acts as a card list here
            <div>
                <div className="pt0 mt0">
                    {
                        isFranchiseOwner
                        ? <FranchiseOwnedResPage />
                        : <CustomerRestaurantListPage />
                    }
                </div>
            </div>
        );
    }
}

export default RestaurantsListPage;