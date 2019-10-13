import React, { Component } from 'react';
import { Button, Form } from 'semantic-ui-react'
import { Formik } from "formik";
import * as yup from "yup";
import Flatpickr from 'react-flatpickr'
import 'flatpickr/dist/themes/light.css'

//arrays
import PaxOptions from '../../Data/PaxOptions';

import url from '../../Config/url';

class SearchForm extends Component {
    constructor() {
        super();
        this.state = {
            'cuisines': [],
            'areas': [],
            'restaurants': []
        }
    }

    componentDidMount() {
        this.createDropdown('cuisines');
        this.createDropdown('areas');
        this.createDropdown('restaurants');
    }

    createDropdown = (route) => {        
        fetch(`${url.fetchURL}/${route}`)
			.then(resp => resp.json())
			.then(data => {
                const dropdownOptions = [];
                data.forEach(data => {
                    const obj = {key: data, text: data, value: data}
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
                    date: '',
                    startTime: '',
                    pax: '',
                    cuisine: '',
                    area: '',
                    restaurant: '',
                }}

                onSubmit={(values) => {
                    console.log(values);
                    this.props.triggerDisplay();
                }}


                validationSchema={yup.object().shape({
                    date: yup.date("Invalid Date")
                        .min(new Date(), "Your cannot state a past date"),
                    startTime: yup.string(),
                    pax: yup.number().min(1).max(20),
                    cuisine: yup.string(),
                    area: yup.string(),
                    restaurant: yup.string(),
                })}

                render={({ values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue }) => {
                    const handleDropdownChange = (e, { name, value }) => {
                        setFieldValue(name, value);
                    };

                    return (
                        <Form size='big' className='ba br4 b--light-silver pa3 appColor'>
                            <h3 className='f2 white '>Reserve your Restaurant</h3>
                            <Form.Group widths='equal'>
                                <Form.Field>
                                    <Flatpickr
                                        data-enable-time
                                        options={{ minDate: 'today', maxDate: new Date().fp_incr(30) }}
                                        placeholder="Reservation Date & Time"
                                        onChange={e => setFieldValue('date', e[0])}
                                        onBlur={handleBlur}
                                        value={values.date}
                                        name="date"
                                    />
                                </Form.Field>

                                <Form.Field>
                                    <Form.Select //Dropdown
                                        placeholder='Any Restaurant'
                                        name="restaurant"
                                        options={this.state.restaurants}
                                        value={values.restaurant}
                                        onChange={handleDropdownChange}
                                    />


                                </Form.Field>
                            </Form.Group>

                            <Form.Group widths='equal'>
                                <Form.Select //Dropdown
                                    placeholder='Pax'
                                    name="pax"
                                    options={PaxOptions}
                                    value={values.pax}
                                    onChange={handleDropdownChange}
                                />

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