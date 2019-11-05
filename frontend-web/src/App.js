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
import LandingPage from './Containers/RestaurantLandingPage/LandingPage';
import ProtectedRoute from './Common/ProtectedRoute';
import Voucherlist from './Containers/VoucherList/VoucherList';
import ParticlesOptions from './Data/ParticlesOptions';
import LoginState from './Data/LoginState';

class App extends Component {
	constructor() {
		super();
		this.state = LoginState.customer;
	}

	isSignedIn = () => {
		return this.state.isSignedIn;
	}

	//for users not franchiseOwners
	loginUser = (userID, name) => {
		this.loginUser(userID, name, false)
	}

	loginUser = (userID, name, isFranchiseOwner) => {
		this.setState({
			isSignedIn: true,
			userID: userID,
			name: name,
			isFranchiseOwner: isFranchiseOwner
		});
	}

	signOutUser = () => {
		this.setState(LoginState.logout);
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
				<Particles className='particles' params={ParticlesOptions} />
				<NavBar
					loginProp={loginProp}
					isSignedIn={isSignedIn}
					name={this.state.name}
					isFranchiseOwner={this.state.isFranchiseOwner}
				/>
				<div className='body'>
					<Switch>
						<Route path="/" exact component={Homepage} />
						<Route path="/restaurants" exact render={(props) => <RestaurantsListPage {...props} isSignedIn={isSignedIn} userID={this.state.userID} isFranchiseOwner={this.state.isFranchiseOwner} />} />
						<ProtectedRoute path="/reservations" component={Reservations} userID={this.state.userID} isSignedIn={isSignedIn} isFranchiseOwner={this.state.isFranchiseOwner} />
						<Route path="/voucherlist" exact render={(props) => <Voucherlist {...props} />} />
						<Route path="/login" exact render={(props) => <LoginPage {...props} isSignedIn={isSignedIn} loginUser={this.loginUser} />} />
						<Route path="/register" exact component={Register} />
						<Route path="/restaurants/:name" render={(props) => <LandingPage {...props} isSignedIn={isSignedIn} userID={this.state.userID} isFranchiseOwner = {this.state.isFranchiseOwner}/>} />
						<Route path="*" component={NonExistentPage} />
					</Switch>
				</div>
			</BrowserRouter>

		)
	}

}

export default App;
