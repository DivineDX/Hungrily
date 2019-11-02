import React, { Component } from 'react';
import RestaurantCard from '../../Components/Cards/RestaurantCard';
import url from '../../Config/url'
import FranchiseOwnedResPage from '../Restaurants/FranchiseOwnedResPage';
import CustomerResDisplay from '../Restaurants/CustomerResDisplay'

/**
 * A simple page to show the entire list of Restaurants (For Customers),
 * or the entire list of Restaurants owned by a Franchise
 */
class RestaurantsPage extends Component {
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
                        : <CustomerResDisplay />
                    }
                </div>
            </div>
        );
    }
}

export default RestaurantsPage;