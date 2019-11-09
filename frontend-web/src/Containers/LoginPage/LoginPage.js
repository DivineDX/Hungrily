import React from 'react';
import { Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import LoginForm from '../../Components/LoginForm/LoginForm'; 
import './LoginPage.css';

const LoginPage = (props) => { //isSignedIn, loginUser
    return (
        <div className='relative'>
            
                <div id='RegisterText'>
                    <p className='mb2 text1 tc'> Not registered as a member? </p>
                    <p className='mb2 text2 tc'> Create your account today</p>
                </div>
                <div id='Register'> 
                    <Button className='button w-30'> 
                        <Link to="/register" className='white'>
                            Register
                        </Link> 
                    </Button>
                </div>
            <div id='LoginSegment' className="w-25 mt4 pt3 flex flex-column items-center center">
                <h1 className="tc baskerville f1 fw5 mb0">Welcome Back</h1>
                <p> Have an account already?</p>
            </div>
            <div className='mh4 mv3' id='loginContainer'>
                <LoginForm {...props}/>  
            </div>
        </div>
    );
}


export default LoginPage;