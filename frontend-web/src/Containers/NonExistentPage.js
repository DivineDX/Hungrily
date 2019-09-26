import React, {Component} from 'react';
import { Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom';

class NonExistentPage extends Component{
	render() {
		return (	 //acts as a card list here
			<div className = 'ma5 tc'>
                <h1 className = 'baskerville fw5'>
                    Sorry, the page you are looking for does not exist!
                </h1>
				<Link to = '/'>
                        <Button>Back to Homepage</Button>
                </Link>
			</div>
    	);
  }
}

export default NonExistentPage;