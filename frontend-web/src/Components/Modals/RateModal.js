import React, { Component } from 'react';
import { Button, Modal, Rating } from 'semantic-ui-react'
import url from '../../Config/url'

/**
 * Modal that is used to Post/Update Ratings of Past Reservations
 */
class RateModal extends Component {
    constructor() {
        super();
        this.state = {
            clicked: false,
            rating: 0,
        }
    }

    componentDidMount() {
        this.setState({ rating: this.props.data.rating });
    }

    handleRate = (e, { rating }) => {
        this.setState({ rating })
    }

    postRating = () => {
        const { data, userID } = this.props;
        const { resName, location, dateTime, table, resid } = data;
        fetch(`${url.fetchURL}/giveReview`, {
            method: 'post',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
                userID: userID,
                location: location,
                resName: resName,
                dateTime: dateTime,
                table: table,
                rating: this.state.rating,
                resid: resid
            })
        })
            .then(resp => resp.json())
            .then(data => {
                if (data === 'Success') {
                    this.setState({ clicked: true });
                }
            })
    }

    render() {
        return (
            <Modal
                trigger={<Button> Rate </Button>}
                onClose={() => this.props.fetchReservations()}
                size={'small'}
            >
                <Modal.Header className='tc'>Post a Rating</Modal.Header>
                <Modal.Content>
                    <Rating maxRating={5} clearable rating={this.state.rating} onRate={this.handleRate} className='mb2' />
                    <br />
                    <Button negative onClick={() => this.postRating()} content='Confirm/Update Rating' />
                    {
                        this.state.clicked &&
                        <div className='black mb2'>Your rating has been posted. Click out of this modal to exit</div>
                    }
                </Modal.Content>
            </Modal>
        );
    }
}

export default RateModal;

