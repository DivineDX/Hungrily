import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

//Import Containers
import Homepage from './Containers/Homepage';
import NonExistentPage from './Containers/NonExistentPage';

class App extends Component {
	render() {
		return (
			<BrowserRouter>
				<Switch>
					<Route path="/" exact component={Homepage} />
					<Route path="*" component={NonExistentPage} />
				</Switch>
			</BrowserRouter>
		)
	}

}

export default App;
