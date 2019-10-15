import React, { Component } from 'react';

import SearchForm from './SearchForm/SearchForm';
import RestaurantDisplayBulletin from '../Components/Bulletins/RestaurantDisplayBulletin';
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
			filteredResults: []
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
		return (
			<div className="pa7">
				<SearchForm triggerDisplay={this.displayResults} />
				{
					this.state.displayResults &&
					<RestaurantDisplayBulletin resDisplay = {this.state.filteredResults}/>
					
					/* this.state.filteredResults.map((data) => {
						return <RestaurantCard
							data = {data}
							key = {data.Name}
						/>
					}) */
				}
			</div>
		);
	}

}

export default Homepage;
