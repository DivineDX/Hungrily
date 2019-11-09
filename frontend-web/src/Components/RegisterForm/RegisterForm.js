import React from 'react';
import { Button, Form, Input } from 'semantic-ui-react'
import { Formik } from "formik";
import * as yup from "yup";
import './RegisterForm.css';

import url from '../../Config/url';
import InputErrorLabel from '../Label/InputErrorLabel';

class RegisterForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            result: ''
        }
    }

    render() {
        return (
            <Formik
                initialValues={{
                    name: '',
                    userID: '',
                    password: '',
                    confirmPassword: ''
                }}

                onSubmit={(values) => {
                    fetch(`${url.fetchURL}/register`, {
                        method: 'post',
                        headers: { 'Content-type': 'application/json' },
                        body: JSON.stringify({
                            name: values.name,
                            userID: values.userID,
                            password: values.password
                        })
                    })
                        .then(resp => resp.json())
                        .then(data => {
                            if (data === values.userID) { //successful
                                this.setState({
                                    result: 'Successful Registration'
                                });
                            }
                            else if (data === 'Username Already Taken') { 
                                this.setState({
                                    result: 'Username already taken'
                                })
                            } else { //error
                                this.setState({
                                    result: 'Error, cannot register'
                                })
                                throw new Error();
                            }   
                        }).catch(err => {
                            alert(err);
                        })
                }}

                validationSchema={yup.object().shape({
                    name: yup.string().required("This field is required")
                        .min(3, "Your Name cant be that short")
                        .max(100, "Your Name cant be that long"),
                    userID: yup.string().required("This field is required")
                        .min(5, "Please enter a UserID of at least length 5")
                        .max(50, "Please use a shorter UserID"),
                    password: yup.string().required("This field is required")
                        .min(8, "Please enter a password of at least 8 characters")
                        .max(40, "Please use a shorter password"),
                    confirmPassword: yup.string().required("This field is required")
                        .test('passwords-match', 'Passwords must match', function (value) {
                            return this.parent.password === value;
                        }),
                })}

                render={({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => {
                    return (
                        <Form size='large' >
                            <Form.Field className='flex flex-column items-center'>
                                <Input
                                    type='text'
                                    placeholder='Name'
                                    name='name'
                                    className='registerFormText'
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.name}

                                />
                                <InputErrorLabel touched={touched.name} errorText={errors.name} />
                            </Form.Field>

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

                            <Form.Field className='flex flex-column items-center'>
                                <Input
                                    type='password'
                                    placeholder='Confirm Password'
                                    name='confirmPassword'
                                    className='registerFormText'
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.confirmPassword}
                                />
                                <InputErrorLabel touched={touched.confirmPassword} errorText={errors.confirmPassword} />

                            </Form.Field>

                            <div id='LoginButs'>
                                <Button className='button' type='submit' onClick={handleSubmit}>
                                    Register
                                </Button>
                            </div>

                            <div className = 'mt3 white tc'>
                                {this.state.result}
                            </div>

                        </Form>
                    );
                }}
            />

        );
    }

}

export default RegisterForm;