import React from 'react';
import { Button, Form, Input } from 'semantic-ui-react'
import { Formik } from "formik";
import * as yup from "yup";

import InputErrorLabel from '../Label/InputErrorLabel';
import url from '../../Config/url';
import './LoginForm.css';

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() { //isSignedIn, loginUser
        return (
            <Formik
                initialValues={{
                    userID: '',
                    password: '',
                }}

                onSubmit={(values) => {
                    fetch(`${url.fetchURL}/login`, {
                        method: 'post',
                        headers: { 'Content-type': 'application/json' },
                        body: JSON.stringify({
                            userID: values.userID,
                            password: values.password
                        })
                    })
                        .then(resp => resp.json())
                        .then(data => {
                            if (data.userID && data.name) { //successful
                                this.props.loginUser(data.userID, data.name, data.franchiseOwner);
                                this.props.history.push("/"); //go to main page
                            }
                            else if (data === 'No such user') {
                                this.setState({
                                    result: 'Error: No Such User'
                                })
                            } else if (data === 'incorrect password') {
                                this.setState({
                                    result: 'Error: Incorrect Password'
                                })
                            } else { //error
                                this.setState({
                                    result: 'Error, Unable to Retrieve Login Credentials'
                                })
                                throw new Error();
                            }
                        }).catch(err => {
                            alert(err);
                        })
                }}

                validationSchema={yup.object().shape({
                    userID: yup.string().required("This field is required"),
                    password: yup.string().required("This field is required")
                })}

                render={({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => {
                    return (
                        <Form size='large' >
                            <Form.Field className='flex flex-column items-center'>
                                <Input
                                    type='text'
                                    placeholder='UserID'
                                    name='userID'
                                    className='registerFormText'
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.userID}
                                />
                                <InputErrorLabel touched={touched.userID} errorText={errors.userID} />
                            </Form.Field>

                            <Form.Field className='flex flex-column items-center'>
                                <Input
                                    type='password'
                                    placeholder='Password'
                                    name='password'
                                    className='registerFormText'
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.password}
                                />
                                <InputErrorLabel touched={touched.password} errorText={errors.password} />

                            </Form.Field>
                            <div id='LoginButs'>
                                <Button className='w-30' type='submit' onClick={handleSubmit}>
                                    Login
                                </Button>
                            </div>

                            <div className='mt3 white tc'>
                                {this.state.result}
                            </div>

                        </Form>
                    );
                }}
            />
        );
    }

}

export default LoginForm;