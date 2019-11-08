import React, { Component } from 'react';
import NonExistentPage from '../NonExistentPage';
import url from '../../Config/url';
import './LandingPage.css';
import BookRestaurant from '../SearchForm/BookRestaurant';
import food from '../../Images/food.jpg'
import RestaurantDetailBox from './RestaurantDetailBox';

class LandingPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            notFound: true,
            name: '',
            resData: {}, //Array of objs, Select * from Restaurants
            menuData: [],
        }
    }

    componentDidMount() {
        const name = this.props.match.params.name;
        this.setState({ name: name });
        
        fetch(`${url.fetchURL}/restaurant/${name}`)
            .then(resp => resp.json())
            .then(data => {
                if (data === 'Unable to Retrieve') {
                } else {
                    this.setState({ resData: data, notFound: false });
                }
            });

        fetch(`${url.fetchURL}/restaurantmenu/${name}`)
            .then(resp => resp.json())
            .then(data => {
                if (data === 'Unable to Retrieve') {
                } else {
                    this.setState({ menuData: data });
                }
            });
    }

    render() {
       
        const { isSignedIn, userID, isFranchiseOwner } = this.props;
        if (this.state.notFound) {
            return (
                <NonExistentPage />
            )
        } else {
            console.log("meepok")
            console.log(this.state.resData)
            return (
                
                <article id='landingPage'>
                    <img
                        className="mt3 pt4 relative"
                        id='pageImage'
                        src=""
                        onError={(e) => { e.target.onerror = null; e.target.src = food }}
                        alt="Error" />

                    <div className="pv3">
                        <h1 className='f2 pageText relative'> {this.state.resData.store_name} </h1>
                    </div>

                    {(!isFranchiseOwner && isSignedIn) &&
                        <div className="pt2 pl7 pr7 relative" id='BookBox'>
                            <BookRestaurant
                                userID={userID}
                                resUrl={this.state.resData.resUrl}
                                location = {this.state.resData.location}
                                franchisorId={this.state.resData.userid} //of franchisor
                            />
                        </div>
                    }
                    <RestaurantDetailBox
                        userID={userID}
                        resData={this.state.resData}
                        menuData={this.state.menuData} 
                        className = 'restaurantDetails'
                        />
                </article>
            );
        }
    }
}

export default LandingPage;