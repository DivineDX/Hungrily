import React, { Component } from 'react';
import RestaurantCard from '../../Components/Cards/RestaurantCard';
import url from '../../Config/url'
import FranchiseORes from '../Reservations/FranchiseORes';
import RestaurantDisplayBulletin from '../../Components/Bulletins/RestaurantDisplayBulletin';


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
        console.log(this.state.restaurants);
        return (
            <div>
                <div className="w-75 pt5 center bb b--black-10">
                    <h1 className="tc baskerville f1 fw5"> All Restaurants</h1>
                </div>
                {/* {this.state.restaurants.map((data) => {
                    return <RestaurantCard data={data} />
                })} */}
                <div className = 'pa4'>
                    <RestaurantDisplayBulletin 
                    resDisplay = {this.state.restaurants}/>
                </div>
                
            </div>
        );
    }
}

export default RestaurantsPage;