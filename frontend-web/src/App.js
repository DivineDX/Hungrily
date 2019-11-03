import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Particles from 'react-particles-js';

//Import Containers
import Homepage from './Containers/Homepage';
import NonExistentPage from './Containers/NonExistentPage';
import NavBar from './Containers/NavBar/NavBar';
import RestaurantsListPage from './Containers/Restaurants/RestaurantsListPage';
import Reservations from './Containers/Reservations/Reservations';
import LoginPage from './Containers/LoginPage/LoginPage';
import Register from './Containers/RegisterPage/RegisterPage';
import LandingPage from './Components/RestaurantLandingPage/LandingPage';
import ProtectedRoute from './Common/ProtectedRoute';
import Voucherlist from './Containers/VoucherList/VoucherList';

const particlesOptions = {
	"particles": {
		"number": {
			"value": 100,
			"density": { "enable": true, "value_area": 700 }
		},
		"color": { "value": "#c0c0c0" },
		"shape": {
			"type": "circle",
			"stroke": { "width": 0, "color": "#000000" },
			polygon: { nb_sides: 5 },
		},
		opacity: {
			"value": 0.5,
			"random": false,
			"anim": {
				"enable": false,
				"speed": 1,
				"opacity_min": 0.1,
				"sync": false
			}
		},
		"size": {
			"value": 5,
			"random": true,
			"anim": {
				"enable": true,
				"speed": 40,
				"size_min": 1,
				"sync": false
			}
		},
		"line_linked": { "enable": true, "distance": 150, "color": "#ffffff", "opacity": 0.4, "width": 1 },
		"move": {
			"enable": true,
			"speed": 4,
			"direction": "none",
			"random": false,
			"straight": false,
			"out_mode": "out",
			"bounce": false,
			"attract": {
				"enable": false,
				"rotateX": 600,
				"rotateY": 1200
			}
		}
	},
	"interactivity": {
		"detect_on": "canvas",
		"events": {
			"onhover": {
				"enable": true, "mode": "repulse"
			},
			"onclick": { "enable": true, "mode": "push" },
			"resize": true
		},
		"modes": {
			"grab": {
				"distance": 400,
				"line_linked": { "opacity": 1 }
			},
			"bubble": { "distance": 400, "size": 40, "duration": 2, "opacity": 8, "speed": 3 },
			"repulse": { "distance": 200, "duration": 0.4 },
			"push": { "particles_nb": 4 },
			"remove": { "particles_nb": 2 }
		}
	},
	"retina_detect": true
}


class App extends Component {
	constructor() {
		super();
		this.state = {
			isSignedIn: true, //default is false (not signed in)
			userID: 'admin', 
			name: '',
			isFranchiseOwner: false,
		}
	}

	isSignedIn = () => {
		return this.state.isSignedIn;
	}

	loginUser = (userID, name) => {
		this.setState({
			isSignedIn: true,
			userID: userID,
			name: name,
		});
	}

	signOutUser = () => {
		this.setState({
			isSignedIn: false,
			userID: '',
			name: ''
		})
	}

	getUserID = () => {
		return this.state.userID;
	}

	render() {
		const isSignedIn = this.state.isSignedIn;
		let loginProp =
			(isSignedIn) ? this.signOutUser : this.loginUser;
		// console.log(this.state);
		return (
			<BrowserRouter>
				<Particles className='particles' params={particlesOptions} />
				<NavBar loginProp={loginProp} isSignedIn={isSignedIn} name={this.state.name} />
				<div className='body'>
					<Switch>
						<Route path="/" exact component={Homepage} />
						<Route path="/restaurants" exact render={(props) => <RestaurantsListPage {...props} isSignedIn={isSignedIn} isFranchiseOwner = {this.state.isFranchiseOwner}/>} />
						<ProtectedRoute path="/reservations" component={Reservations} userID={this.state.userID} isSignedIn={isSignedIn} isFranchiseOwner={this.state.isFranchiseOwner}/>
						<Route path="/voucherlist" exact render={(props) => <Voucherlist {...props} />} />
						<Route path="/login" exact render={(props) => <LoginPage {...props} isSignedIn={isSignedIn} loginUser={this.loginUser} />} />
						<Route path="/register" exact component={Register} />
						<Route path="/restaurants/:name" render={(props) => <LandingPage {...props} isSignedIn = {isSignedIn} userID = {this.state.userID}/>} />
						<Route path="*" component={NonExistentPage} />
					</Switch>
				</div>
			</BrowserRouter>

		)
	}

}

export default App;
