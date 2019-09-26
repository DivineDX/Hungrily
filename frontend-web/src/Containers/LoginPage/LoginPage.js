import React from 'react';
import LoginForm from '../../Components/LoginForm/LoginForm'; 
import './LoginPage.css';

const LoginPage = (props) => {
    return (
        <div className='' id=''>
            <div className="w-75 pt5 flex flex-column items-center center">
                <h1 className="tc baskerville f1 fw5">Login Page</h1>
            </div>
            <div className='mh4 mv3' id='loginContainer'>
                <LoginForm {...props}/>  
            </div>
        </div>
    );
}


export default LoginPage;