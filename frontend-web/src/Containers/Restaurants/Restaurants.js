import React, { Component } from 'react';
import RestaurantCard from '../../Components/Cards/RestaurantCard';
import url from '../../Config/url'
// import DashboardDropDown from '../../Components/Dropdowns/DashboardDropDown';
// import Cookies from 'universal-cookie';
// import AuthFailed from '../NonExistentPage/AuthFailed';
// import EmptyDashboard from '../../Components/EmptyFillers/EmptyDashboard';
// import url from '../../Configs/url';

class Restaurants extends Component {
    constructor(props) {
        super(props)
        this.state = {
            displayedData: [],
        }
    }

    componentDidMount() {
        fetch(`http://${url.fetchURL}/resData`)
        .then(resp => resp.json())
        .then(data => {
            this.setState({ displayedData: data });
        });
    }

    render() {
        return (	 //acts as a card list here
            <div>
                <div className="w-75 pt5 center bb b--black-10">
                    <h1 className="tc baskerville f1 fw5">Restaurants</h1>
                </div>

                {this.state.displayedData.map((data) => {
                    return <RestaurantCard loadedData = {data}>
                    </RestaurantCard>
                })}
            </div>
        );
    }
}

export default Restaurants;