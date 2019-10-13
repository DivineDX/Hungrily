import React, { Component } from 'react';
import { Modal, Button, Icon } from 'semantic-ui-react'
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
        }
    }

    componentDidMount() {
        const name = this.props.match.params.name;
        console.log(name)
        this.setState({ name: name });
        fetch(`http://${url.fetchURL}/restaurant/${name}`)
            .then(resp => resp.json())
            .then(data => {
                this.setState({ data: data, notFound: false });
            });
    }

    render() {
        const { opening_hrs, price, closing_hrs, cuisine, area, name, address } = this.state.data;
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
                        className="mt3 pt4 relative"
                        id='pageImage'
                        src=""
                        onError={(e) => { e.target.onerror = null; e.target.src = wireframeImage }}
                        alt="Error" />
                    <div className="pv3">
                        <h1 className='f2 pageText relative'> {name} </h1>
                    </div>
                    <div className="pt2 pl7 pr7 relative" id='BookBox'>
                        <SearchFormRestaurants/>
                    </div>
                    <div className='row relative'>
                        <div className='column bg-mid-gray pt3'>
                            <div className='containerText'>
                                <h3> Cuisine </h3>
                                <p className='smallText'> {cuisine} </p>
                            </div>
                            <div className='containerText'>
                                <h3> Menu </h3>
                                <Modal trigger={<Button> Menu </Button>}>
                                    <Modal.Content>
                                        <p> Menu </p>
                                    </Modal.Content>
                                    <Modal.Actions>
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
                        <div className='column pl4 bg-mid-gray pr6 pt3'>
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