import React from 'react';
import { Button, Form } from 'semantic-ui-react';
import './RegisterForm.css';
// import url from '../../Configs/url';

class RegisterForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userID: '',
            password: '',
        }
    }

    onNameChange = (event) => { 
        this.setState({ userID: event.target.value });
    }

    onPasswordChange = (event) => {
        this.setState({ password: event.target.value });
    }

    // onSignIn = () => { //modify this after database is coded
    //     fetch(`http://${url.fetchURL}/signin`, {
    //         method: 'post',
    //         headers: {'Content-type': 'application/json'},
    //         body: JSON.stringify({
    //             id: this.state.nusID,
    //             password: this.state.password,
    //         })
    //     })
    //     .then(resp => resp.json())
    //     .then(data => {
    //         if(data === 'Failed login') {
    //             throw new Error("Incorrect User/PW");
    //         } else {
    //             this.props.loginUser(this.state.nusID);
    //             this.props.history.push("/");
    //         }
    //     }).catch(err => {
    //         alert(err);
    //     })
    // }

    render() {
        return (
            <Form>
                <Form.Field className='registerText'>
                    <input className='registerFormText' placeholder='Name' onChange = {this.onNameChange}/>
                </Form.Field>
                <Form.Field className='registerText'>
                    <input className='registerFormText' placeholder='UserID' onChange = {this.onNameChange}/>
                </Form.Field>
                <Form.Field className='registerText'>
                    <input className='registerFormText' placeholder='Password' type="password" onChange = {this.onPasswordChange}/>
                </Form.Field>
                <Form.Field className='registerText'>
                    <input className='registerFormText' placeholder='Confirm Password' type="password" onChange = {this.onPasswordChange}/>
                </Form.Field>
                <div id='LoginButs'>
                    <Button className='button' type='submit' onClick={() => this.Register()}> Register </Button>
                </div>
                </Form>

        );
    }

}

export default RegisterForm;