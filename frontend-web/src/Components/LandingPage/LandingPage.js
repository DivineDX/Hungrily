import React, { Component } from 'react';
import { Modal, Button, Header, Icon } from 'semantic-ui-react'
import NonExistentPage from '../../Containers/NonExistentPage';
import wireframeImage from '../../Images/wireframeImage.png';
import url from '../../Configs/url';
import './LandingPage.css';
import SearchFormRestaurants from '../../Containers/SearchForm/SearchFormRestaurant';

class LandingPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            notFound: true,
            name: '',
            data: [],
            displayResults: false,
        }
    }

	displayResults = () => {
		this.setState({
			displayResults: true
		})
	}

    componentDidMount() {
        const name = this.props.match.params.name;
        console.log(name)
        this.setState({name: name});
        fetch(`http://${url.fetchURL}/restaurant/${name}`)
        .then(resp => resp.json())
        .then(data => {
            this.setState({ data: data, notFound: false});
        });
    }

    render() {
        const { opening_hrs, price, closing_hrs, cuisine, area, name, address} = this.state.data;
        //unused consts: date-end, tags, numFollowing, finished
        // const { type, title, recipient, name, anonymity, date_started, description, imageurl, targetnumsupporters, currnumsupporters } = this.state.loadedData;
        if (this.state.notFound) {
            return (
                <NonExistentPage />
            )
        } else {
            return (
                <article id='landingPage'>
                    <img
                        className="mt3 pt4"
                        id='pageImage'
                        src= ""
                        onError={(e) => { e.target.onerror = null; e.target.src = wireframeImage }}
                        alt="Error" />
                    <div className="pv3">
                        <h1 className='f2 pageText'> {name} </h1>
                    </div>
                    <div className="pt2 pl7 pr7" id='BookBox'>
                        <SearchFormRestaurants triggerDisplay={this.displayResults} />
                        {this.state.displayResults}
                    </div>
                    <div className='row'>
                        <div className = 'column'>
                            <div className='containerText'>
                                <h3> Cuisine </h3>   
                                <p className='smallText'> {cuisine} </p>  
                            </div>
                            <div className='containerText'>
                                <h3> Menu </h3>   
                                <Modal trigger={<Button> Menu </Button>}>
                                <Header icon='archive' content='Archive Old Messages' />
                                <Modal.Content>
                                <p>
                                    Your inbox is getting full, would you like us to enable automatic
                                    archiving of old messages?
                                </p>
                                </Modal.Content>
                                <Modal.Actions>
                                <Button basic color='red' inverted>
                                    <Icon name='remove' /> No
                                </Button>
                                <Button color='green' inverted>
                                    <Icon name='checkmark' /> Yes
                                </Button>
                                </Modal.Actions>
                                </Modal>  
                            </div>
                            <div className='containerText'>
                                <h3> Opening Hours </h3>     
                                <p className='smallText'> Mon-Sun: {opening_hrs} - {closing_hrs} </p>
                            </div>
                        </div>
                        <div className='column'>
                            <div className='containerText'>
                                <h3> Location </h3> 
                                <p className='smallText'> {area} </p>  
    
                            </div>
                            <div className='containerText'>
                                <h3> Address </h3>    
                                <p className='smallText'> {address} </p>  
 
                            </div>
                            <div className='containerText'>
                                <h3> Price </h3>     
                                <p className='smallText'> {price} </p>
                            </div>
                        </div>
                    </div>
                    
                </article>
            );
        }
    }
}

export default LandingPage;