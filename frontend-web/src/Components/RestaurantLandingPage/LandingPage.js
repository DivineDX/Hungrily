import React, { Component } from 'react';
import { Modal, Button, Icon } from 'semantic-ui-react'
import NonExistentPage from '../../Containers/NonExistentPage';
import url from '../../Config/url';
import './LandingPage.css';
import BookRestaurant from '../../Containers/SearchForm/BookRestaurant';
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
                if (data === 'Unable to Retrieve') {
                } else {
                    this.setState({ data: data, notFound: false });
                }
            });
    }

    render() {
        const { store_name, location, area, opening_hours, closing_hours, Cuisine, Price } = this.state.data;
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
                        <h1 className='f2 pageText relative'> {store_name} </h1>
                    </div>
                    <div className="pt2 pl7 pr7 relative" id='BookBox'>
                        <BookRestaurant/>
                    </div>
                    <div className='row relative'>
                        <div className='column pt3 pb3'>
                            <div className='containerText'>
                                <h3> Cuisine </h3>
                                <p className='smallText'> {Cuisine} </p>
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
                                <p className='smallText tl'> Mon-Sun: {opening_hours} - {closing_hours} </p>
                            </div>
                        </div>
                        <div className='column bb pl4 pr6 pt3 pb3'>
                            <div className='containerText'>
                                <h3> Price </h3>
                                <p className='smallText tl'> {Price} </p>
                            </div>
                            <div className='containerText'>
                                <h3> Location </h3>
                                <p className='smallText tl'> {area} </p>
                            </div>
                            <div className='containerText'>
                                <h3> Address </h3>
                                <p className='smallText tl'> {location} </p>
                            </div>
                        </div>
                    </div>

                </article>
            );
        }
    }
}

export default LandingPage;