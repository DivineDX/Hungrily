import React, { Component } from 'react';
import { Dropdown, Modal} from 'semantic-ui-react';
import UpdateForm from '../Forms/UpdateForm';
import Cookies from 'universal-cookie';
import url from '../../Configs/url';

class MenuModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clicked: false,
            authFailed: false,
        }
    }

    submitUpdate = (values) => { //modify this after database is coded
        fetch(`http://${url.fetchURL}/postupdate`, {
            method: 'post',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
                id: this.props.id,
                updateTitle: values.title,
                updateContent: values.description,
                organizerID: this.props.userID,
                jwtToken: new Cookies().get('token'),
            })
        })
            .then(resp => resp.json())
            .then(data => {
                if (data === 'Success') {
                    this.setState({updated: true});
                } else if (data === 'Auth failed') {
                    this.setState({authFailed: true});
                }
            })
    }

    render() {
        const { buttonWord } = this.props;
        return (
            <Modal trigger={<Dropdown.Item className='hoverLink'>{buttonWord}</Dropdown.Item>}>
                <Modal.Header className='tc'>Post Update</Modal.Header>
                <Modal.Content>
                    <UpdateForm submitUpdate = {this.submitUpdate} updatePosted = {this.state.updated} authFailed = {this.state.authFailed}/>
                </Modal.Content>
            </Modal>
        );
    }
}

export default MenuModal;