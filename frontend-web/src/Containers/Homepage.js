import React, { Component } from 'react';

// import logo from '../logo.svg';
import '../App.css'

class Homepage extends Component {
	render() {
		return (
			<div className="App">
				<header className="App-header">
					{/* <img src={logo} className="App-logo" alt="logo" /> */}
					<p>
						CS2102 Restaurant Reservation App!
          			</p>
					<a
						className="App-link"
						href="https://reactjs.org"
						target="_blank"
						rel="noopener noreferrer"
					>
						Learn React
          			</a>
				</header>
			</div>
		);
	}

}

export default Homepage;
