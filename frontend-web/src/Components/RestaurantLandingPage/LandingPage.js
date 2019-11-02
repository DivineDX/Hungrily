import React, { Component } from 'react';
import { Modal, Button, Icon } from 'semantic-ui-react'
import NonExistentPage from '../../Containers/NonExistentPage';
import url from '../../Config/url';
import './LandingPage.css';
import BookRestaurant from '../../Containers/SearchForm/BookRestaurant';
import food from '../../Images/food.jpg'
import RestaurantDetailBox from './RestaurantDetailBox';

class LandingPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            notFound: true,
            name: '',
            data: [],
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
                    this.setState({ data: data, notFound: false });
                }
            });
    }

    render() {
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
                        <h1 className='f2 pageText relative'> {this.state.data.store_name} </h1>
                    </div>

                    <div className="pt2 pl7 pr7 relative" id='BookBox'>
                        <BookRestaurant/>
                    </div>
                    
                    <RestaurantDetailBox data = {this.state.data}/>
                </article>
            );
        }
    }
}

export default LandingPage;