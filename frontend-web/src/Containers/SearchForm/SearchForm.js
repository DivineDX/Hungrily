import React, { Component } from 'react';
import { Button, Form } from 'semantic-ui-react'
import { Formik } from "formik";
import * as yup from "yup";

import url from '../../Config/url';

/**
 * SearchForm placed at the front page to be used for the searching of Restaurants
 */
class SearchForm extends Component {
    constructor() {
        super();
        this.state = {
            cuisines: [],
            areas: [],
            franchisors: []
        }
    }

    componentDidMount() {
        this.createDropdown('cuisines');
        this.createDropdown('areas');
        this.createDropdown('franchisors');
    }

    createDropdown = (route) => {
        fetch(`${url.fetchURL}/${route}`)
            .then(resp => resp.json())
            .then(data => {
                const dropdownOptions = [];
                dropdownOptions.push({ key: '0', text: 'None', value: '' });
                data.forEach(data => {
                    const obj = { key: data, text: data, value: data }
                    dropdownOptions.push(obj);
                })
                const obj = {};
                obj[route] = dropdownOptions;
                this.setState(obj);
            }).catch(error => {
                console.log(error);
            })
    }

    render() {
        return (
            <Formik
                initialValues={{
                    cuisine: '',
                    area: '',
                    franchise: '',
                }}

                onSubmit={(values) => {
                    this.props.triggerDisplay(values);
                }}


                validationSchema={yup.object().shape({
                    cuisine: yup.string(),
                    area: yup.string(),
                    franchise: yup.string(),
                })}

                render={({ values, handleSubmit, setFieldValue }) => {
                    const handleDropdownChange = (e, { name, value }) => {
                        setFieldValue(name, value);
                    };

                    return (
                        <Form size='big' className='ba br4 b--light-silver pa3 appColor'>
                            <h3 className='f2 white '>Find your Restaurant</h3>
                            <Form.Group widths='equal'>

                                <Form.Field>
                                    <Form.Select //Dropdown
                                        placeholder='Any Franchise'
                                        name="franchise"
                                        options={this.state.franchisors}
                                        value={values.franchise}
                                        onChange={handleDropdownChange}
                                    />
                                </Form.Field>

                                <Form.Select //Dropdown
                                    placeholder='Any Cuisine'
                                    name="cuisine"
                                    options={this.state.cuisines}
                                    value={values.cuisine}
                                    onChange={handleDropdownChange}
                                />

                                <Form.Select //Dropdown
                                    placeholder='Any Area'
                                    name="area"
                                    options={this.state.areas}
                                    value={values.area}
                                    onChange={handleDropdownChange}
                                />
                                <Button
                                    icon='search'
                                    color='yellow'
                                    onClick={handleSubmit}
                                    type='submit'
                                />
                            </Form.Group>
                        </Form>
                    );
                }}
            />
        );
    }
}

export default SearchForm;