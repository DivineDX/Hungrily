import React, { Component } from 'react';

import LoadMoreButton from '../Components/Button/LoadMoreButton';
import SearchForm from './SearchForm/SearchForm';
import RestaurantDisplayBulletin from '../Components/Bulletins/RestaurantDisplayBulletin';

import url from '../Config/url';

import '../Components/Cards/RestaurantCard.css';
import '../App.css'

const defaultVisibleItems = 6;

class Homepage extends Component {
	constructor() {
		super();
		this.state = {
			displayResults: false,
			loading: true,
			restaurants: [],
			filteredResults: [],
			visible: defaultVisibleItems
		}
	}

	loadMore = () => {
        this.setState({
            visible: (this.state.visible) + 3,
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
					filteredResults: data,
					visible: defaultVisibleItems
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
					<div>
						<RestaurantDisplayBulletin 
							resDisplay={this.state.filteredResults}
							visibleItems={this.state.visible}
						/>
						{this.state.visible < this.state.filteredResults.length &&
							<LoadMoreButton loadMore={this.loadMore} />
						}
					</div>

				}

			</div>
		);
	}

}

export default Homepage;
