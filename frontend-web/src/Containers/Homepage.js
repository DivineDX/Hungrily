import React, { Component } from 'react';

import '../App.css'
import SearchForm from './SearchForm/SearchForm';

class Homepage extends Component {
	render() {
		return (
			<div className="pa7">
				<SearchForm/>
			</div>
		);
	}

}

export default Homepage;
