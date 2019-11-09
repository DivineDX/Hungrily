import React, { Component } from 'react';
import { Button, Modal } from 'semantic-ui-react'
import url from '../../Config/url'

/**
 * Modal that is used for Cancellation of Reservation
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
        const { resName, location, dateTime, table, resUrl } = data;
        fetch(`${url.fetchURL}/cancelResv`, {
            method: 'delete',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
                userID: userID,
                location: location,
                resName: resName,
                dateTime: dateTime,
                table: table,
                resUrl: resUrl
            })
        })
            .then(resp => resp.json())
            .then(data => {
                if (data === 'Success') {
                    this.setState({ clicked: true });
                }
            })
    }

    onClose = () => {
        this.setState({clicked: false});
    }

    render() {

        return (
            <Modal
                trigger={<Button> Cancel Reservation </Button>}
                onClose={() => this.onClose()}
                size = {'small'}
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