import React, { Component } from 'react';

import SearchForm from './SearchForm/SearchForm';
import RestaurantDisplayBulletin from '../Components/Bulletins/RestaurantDisplayBulletin';
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
			filteredResults: []
		}
	}

	displayResults = (filters) => {
		fetch(`${url.fetchURL}/search`, {
			method: 'post',
			headers: { 'Content-type': 'application/json' },
			body: JSON.stringify(filters)
		})
			.then(resp => resp.json())
			.then(data => {
				this.setState({
					displayResults: true,
					filteredResults: data
				})
			});
	}

	render() {
		console.log(this.state.restaurants);
		return (
			<div className="pa7">
				<SearchForm triggerDisplay={this.displayResults} />
				{
					this.state.displayResults &&
					<RestaurantDisplayBulletin resDisplay={this.state.filteredResults} />
				}
			</div>
		);
	}

}

export default Homepage;
