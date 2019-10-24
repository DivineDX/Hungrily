import React from 'react';
import { Button, Checkbox, Form } from 'semantic-ui-react';
import './LoginForm.css';
import { Link } from 'react-router-dom';
// import url from '../../Configs/url';

class LoginForm extends React.Component {
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
            <div>
                <Form>
                    <Form.Field className='loginText'>
                        <input className='loginFormText' placeholder='UserID' onChange = {this.onNameChange}/>
                    </Form.Field>
                    <Form.Field className='loginText'>
                        <input className='loginFormText' placeholder='Password' type="password" onChange = {this.onPasswordChange}/>
                    </Form.Field>
                    <Form.Field className='loginText'>
                        <Checkbox label='Keep me signed in' />
                    </Form.Field>
                    <div id='LoginButs'>
                        <Button className='button toSignIn' type='submit' onClick={() => this.onCSignIn()}> Customer </Button>
                        <Button className='button toSignIn' type='submit' onClick={() => this.onFOSignIn()}> Franchise Owner </Button>
                    </div>
                </Form>
            </div>
        );
    }

}

export default LoginForm;