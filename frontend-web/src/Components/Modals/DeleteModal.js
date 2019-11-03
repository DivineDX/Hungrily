import React, {Component} from 'react';
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
            authFailed: false,
        }
    }

    clickDelete = () => {
        fetch(`http://${url.fetchURL}/cancelResv`, {
            method: 'delete',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
                id: Number(this.props.id),
            })
        })
            .then(resp => resp.json())
            .then(data => {
                if (data === 'Success') {
                    this.setState({clicked: true});
                    this.props.refresh();
                } else if (data === 'Auth failed') {
                    this.setState({authFailed: true})
                }
            })
    }

    render() {

        return (
            <Modal trigger={<Button> Cancel Reservation </Button>}>
            <Modal.Header className='tc'> Cancel Reservation </Modal.Header>
            <Modal.Content>
                <span> Are you sure you want to cancel your reservation? This action is irreversible.</span>
                <div className='pb3'></div>
                <Button negative onClick={() => this.clickDelete()} content='End' />
                {this.state.clicked 
                    ? <h3>Your reservation has been cancelled. Click out of this modal to exit</h3>
                    : <div></div>
                }
                {this.state.authFailed 
                    ? <h3 className = 'red'>User Authentication failed</h3>
                    : <div></div>
                }
            </Modal.Content>
        </Modal>
        );
    }
}

export default DeleteModal;




