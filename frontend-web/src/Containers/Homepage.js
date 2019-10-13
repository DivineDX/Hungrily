import React, { Component } from 'react';

import '../App.css'
import SearchFormMain from './SearchForm/SearchFormMain';
import RestaurantCard from '../Components/Cards/RestaurantCard';
import '../Components/Cards/RestaurantCard.css';

class Homepage extends Component {
	constructor() {
		super();
		this.state = {
			displayResults: false
		}
	}

	displayResults = () => {
		this.setState({
			displayResults: true
		})
	}

	render() {
		return (
			<div className="pa7">
				<SearchFormMain triggerDisplay={this.displayResults} />
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
