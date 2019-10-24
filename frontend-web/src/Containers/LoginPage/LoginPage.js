import React from 'react';
import { Button, Divider } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import LoginForm from '../../Components/LoginForm/LoginForm'; 
import './LoginPage.css';

const LoginPage = (props) => {
    return (
        <div className='relative'>
            <Link to="/register">
                <div id='RegisterText'>
                    <p className='mb2 text1'> Not registered as a member? </p>
                    <p className='mb2 text2'> Create your account today</p>
                </div>
                <div id='Register' className='pa0 pt3'> 
                    <Button id='RegisterBut' className='button' type='submit' onClick={() => this.onRegister()}> 
                        Register
                    </Button>
                </div>
            </Link> 
            <div id='LoginSegment' className="w-25 mt4 pt3 flex flex-column items-center center">
                <h1 className="tc baskerville f1 fw5 mb0">Welcome Back</h1>
                <p> Have an account already? </p>
            </div>
            <div className='mh4 mv3' id='loginContainer'>
                <LoginForm {...props}/>  
            </div>
        </div>
    );
}


export default LoginPage;