import React from 'react';
import { Button } from 'semantic-ui-react'
// import LoginForm from '../../Components/LoginForm/LoginForm'; 
import './LoginPage.css';
// import url from '../../Configs/url';

const LoginPage = (props) => {
    // const hrefURL = `http://${url.fetchURL}/auth/nus`;
    return (
        <div className='' id=''>
            <div className="w-75 pt5 flex flex-column items-center center">
                <h1 className="tc baskerville f1 fw5">Login Page</h1>
                {/* <Button><a href = {hrefURL}>Login</a></Button> */}
                <Button> Login </Button>
            </div>
            <div className='mh4 mv3' id='loginContainer'>
                {/* <LoginForm {...props}/>   */}
            </div>
        </div>
    );
}


export default LoginPage;