import React, { Component } from 'react';

import SearchForm from './SearchForm/SearchForm';
import RestaurantCard from '../Components/Cards/RestaurantCard';
import url from '../Config/url';
import '../Components/Cards/RestaurantCard.css';
import '../App.css'


class Homepage extends Component {
	constructor() {
		super();
		this.state = {
			displayResults: false,
			loading: true,
			restaurants: [],
			displayedResults: []
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

		console.log("Mounting");
	}

	displayResults = (filters) => {
		//filters is object of date, starttime, pax, cuisine, area, restaurant

		fetch(`${url.fetchURL}/search`, {
            method: 'post',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(filters)
        })
            .then(resp => resp.json())
            .then(data => {
				console.log("Displayed Data", data);
				this.setState({
					displayResults: true
				})
            });
	}

	render() {
		return (
			<div className="pa7">
				<SearchForm triggerDisplay={this.displayResults} />
				{
					this.state.displayResults &&
					<div>
						<RestaurantCard
							resName="Lorem Ipsum Restaurant"
							cuisine="Asian"
							area="Kent Ridge"
							operatingHours="9am - 9pm"
							price="$$$"
							id='1'
						/>
					</div>
				}
			</div>
		);
	}

}

export default Homepage;
