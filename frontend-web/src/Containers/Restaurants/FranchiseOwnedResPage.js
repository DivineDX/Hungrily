import React, { Component } from 'react';
import RestaurantCard from '../../Components/Cards/RestaurantCard';
import url from '../../Config/url'
import AuthFailed from '../AuthFailed'
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
            authFailed: false,
        }
    }

    componentDidMount() {
        fetch(`${url.fetchURL}/ownedRestaurants`, {
            method: 'post',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
                userID: this.state.userID,
            })
        })
            .then(resp => resp.json())
            .then(data => {
                if (data === 'Auth failed') {
                    this.setState({ authFailed: true })
                } else {
                    this.setState({ 
                        restaurants: data, 
                        loading: false,
                    });
                }
            }).catch(error => {
                console.log(error);
            })
    }

    render() {
        if (this.state.authFailed) {
            return (
                <AuthFailed />
            )
        }
        return (	
            <div>
                <div className="w-75 pt5 center bb b--black-10">
                    <h1 className="tc baskerville f1 fw5"> My Restaurants</h1>
                </div>
                {this.state.restaurants.map((data) => {
                    return <RestaurantCard data={data} />
                })}
            </div>
        );
    }
}

export default RestaurantsPage;