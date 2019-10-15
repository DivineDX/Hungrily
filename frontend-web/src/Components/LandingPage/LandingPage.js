import React, { Component } from 'react';
import { Modal, Button, Icon } from 'semantic-ui-react'
import NonExistentPage from '../../Containers/NonExistentPage';
import url from '../../Config/url';
import './LandingPage.css';
import SearchFormRestaurants from '../../Containers/SearchForm/SearchFormRestaurant';
import food from '../../Images/food.jpg'

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
        this.setState({ name: name });
        fetch(`${url.fetchURL}/restaurant/${name}`)
            .then(resp => resp.json())
            .then(data => {
                this.setState({ data: data, notFound: false });
            });
    }

    render() {
        const { Name, Address, Area, Opening_hours, Closing_hours, cuisine, price } = this.state.data;
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
                        onError={(e) => { e.target.onerror = null; e.target.src = food }}
                        alt="Error" />
                    <div className="pv3">
                        <h1 className='f2 pageText relative'> {Name} </h1>
                    </div>
                    <div className="pt2 pl7 pr7 relative" id='BookBox'>
                        <SearchFormRestaurants/>
                    </div>
                    <div className='row relative'>
                        <div className='column pt3 pb3'>
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
                                <p className='smallText'> Mon-Sun: {Opening_hours} - {Closing_hours} </p>
                            </div>
                        </div>
                        <div className='column bb pl4 pr6 pt3 pb3'>
                            <div className='containerText'>
                                <h3> Location </h3>
                                <p className='smallText'> {Area} </p>

                            </div>
                            <div className='containerText'>
                                <h3> Address </h3>
                                <p className='smallText'> {Address} </p>

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