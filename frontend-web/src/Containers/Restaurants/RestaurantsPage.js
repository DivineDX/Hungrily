import React, { Component } from 'react';
import RestaurantCard from '../../Components/Cards/RestaurantCard';
import url from '../../Config/url'
import FranchiseOResPage from '../Restaurants/FranchiseOResPage';
import CustomerResDisplay from '../Restaurants/CustomerResDisplay'
// import DashboardDropDown from '../../Components/Dropdowns/DashboardDropDown';
// import Cookies from 'universal-cookie';
// import AuthFailed from '../NonExistentPage/AuthFailed';
// import EmptyDashboard from '../../Components/EmptyFillers/EmptyDashboard';
// import url from '../../Configs/url';

class RestaurantsPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            restaurants: [],
            loading: true,
        }
    }

    componentDidMount() {
        fetch(`${url.fetchURL}/resData`)
            .then(resp => resp.json())
            .then(data => {
                this.setState({
                    restaurants: data,
                    loading: false,
                });
            }).catch(error => {
                console.log(error);
            })
    }

    render() {
        const { isFranchiseOwner } = this.props;
        return (	 //acts as a card list here
            <div>
                <div className="pt0 mt0">
                    {
                        isFranchiseOwner
                        ? <FranchiseOResPage />
                        : <CustomerResDisplay />
                    }
                </div>
            </div>
        );
    }
}

export default RestaurantsPage;