import React, { Component } from 'react';
import NonExistentPage from '../NonExistentPage';
import url from '../../Config/url';
import './LandingPage.css';
import BookRestaurant from '../SearchForm/BookRestaurant';
import food from '../../Images/food.jpg'
import RestaurantDetailBox from './RestaurantDetailBox';
import LoyalCustomerCard from '../../Components/Cards/LoyalCustomerCard';

class LandingPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            notFound: true,
            noLoyalCustomer: false,
            name: '',
            loyalCustomerData: {},
            resData: {}, //Array of objs, Select * from Restaurants
            menuData: [],
            specialOpHrs: [],
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

        fetch(`${url.fetchURL}/restaurantSpecialHrs/${name}`)
            .then(resp => resp.json())
            .then(data => {
                if (data === 'Unable to Retrieve') {
                } else {
                    this.setState({ specialOpHrs: data });
                }
            });


        fetch(`${url.fetchURL}/mostLoyalCustomer`, {
            method: 'post',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
                name: name
            })
        })
            .then(resp => resp.json())
            .then(data => {
                if (data === 'Unable to Retrieve') {
                    this.setState({ noLoyalCustomer: true });
                } else {
                    this.setState({ loyalCustomerData: data });
                }
            }).catch(error => {
                console.log(error);
            });
    }

    render() {
        const { isSignedIn, userID, isFranchiseOwner } = this.props;
        if (this.state.notFound) {
            return (
                <NonExistentPage />
            )
        } else {
            return (
                <article id='landingPage'>
                    <img
                        className="mt3 pt4 relative"
                        id='pageImage'
                        src=""
                        onError={(e) => { e.target.onerror = null; e.target.src = food }}
                        alt="Error" />

                    <div className="pv3">
                        <h1 className='f2 pageText relative tc'> {this.state.resData.store_name} </h1>
                    </div>

                    {(!isFranchiseOwner && isSignedIn) &&
                        <div className="pt2 pl7 pr7 relative" id='BookBox'>
                            <BookRestaurant
                                userID={userID}
                                resUrl={this.state.resData.resUrl}
                                location={this.state.resData.location}
                                franchisorId={this.state.resData.userid} //of franchisor
                                isEditing = {false}
                            />
                        </div>
                    }

                    <RestaurantDetailBox
                        userID={userID}
                        resData={this.state.resData}
                        menuData={this.state.menuData}
                        specialOpHrs={this.state.specialOpHrs}
                        className='restaurantDetails'
                    />

                    {(isFranchiseOwner && isSignedIn) &&
                        <div className='flex flex-column justify-center items-center mb5'>
                            <h1 className=''> Most Loyal Customer </h1>
                            {this.state.noLoyalCustomer
                                    ? <div className = 'white'>No Data Yet!</div>
                                    : <LoyalCustomerCard loyalCustomerData={this.state.loyalCustomerData} />
                            }

                        </div>
                    }
                </article>
            );
        }
    }
}

export default LandingPage;