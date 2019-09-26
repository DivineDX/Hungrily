import React from 'react';
import RegisterForm from '../../Components/RegisterForm/RegisterForm'; 
import './RegisterPage.css';

const RegisterPage = () => {
    return (
        <div className='' id=''>
            <div className="w-75 pt5 flex flex-column items-center center">
                <h1 className="tc baskerville f1 fw5">Register Page</h1>
            </div>
            <div className='mh4 mv3' id='RegisterContainer'>
                <RegisterForm/>  
            </div>
        </div>
    );
}


export default RegisterPage;