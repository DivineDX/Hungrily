import React, { Component } from 'react';
import { Button, Modal } from 'semantic-ui-react'
import url from '../../Config/url'

/**
 * MenuModal Component that is used on the RestaurantPage
 * menuData is an array of objects, each representing a food item.
 */
class DeleteModal extends Component {

    constructor() {
        super();
        this.state = {
            clicked: false,
        }
    }

    clickDelete = () => {
        const {data, userID} = this.props;
        const { resName, location, dateTime, table } = data;
        fetch(`${url.fetchURL}/cancelResv`, {
            method: 'delete',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
                userID: userID,
                location: location,
                resName: resName,
                dateTime: dateTime,
                table: table,
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
                trigger={<Button> Cancel Reservation </Button>}
                onClose={() => this.props.fetchReservations()}
            >
                <Modal.Header className='tc'> Cancel Reservation </Modal.Header>
                <Modal.Content>
                    {this.state.clicked
                        ? <h3 className='black'>Your reservation has been cancelled. Click out of this modal to exit</h3>
                        : <div>
                            <div className='mb3'> Are you sure you want to cancel your reservation? This action is irreversible.</div>
                            <Button negative onClick={() => this.clickDelete()} content='Cancel Reservation' />
                        </div>
                    }
                </Modal.Content>
            </Modal>
        );
    }
}

export default DeleteModal;




