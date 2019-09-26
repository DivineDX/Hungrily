import React from 'react';
import { Button, Form, Input, Icon } from 'semantic-ui-react'
import { Formik } from "formik";
import * as yup from "yup";
import Flatpickr from 'react-flatpickr'
import 'flatpickr/dist/themes/light.css'

import CuisineOptions from '../../Data/CuisineOptions';
import RestaurantOptions from '../../Data/RestaurantOptions';
import LocationOptions from '../../Data/LocationOptions';

/*
Date, Time, Number of Adults (with Dropdown), 
Cuisine (Dropdown), Location (Dropdown), Restaurant (Dropdown with Search bar)
*/

const SearchForm = () => (
    <Formik
        initialValues={{
            date: '',
            startTime: '',
            pax: '',
            cuisine: '',
            location: '',
            restaurant: '',
        }}

        onSubmit={(values) => {
            console.log(values);
        }}


        validationSchema={yup.object().shape({
            date: yup.date("Invalid Date")
                .min(new Date(), "Your cannot state a past date"),
            startTime: yup.string(),
            pax: yup.number().min(1).max(20),
            cuisine: yup.string(),
            location: yup.string(),
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
                                options={{ minDate: 'today', maxDate: new Date().fp_incr(30) }}
                                placeholder="Reservation Date"
                                onChange={e => setFieldValue('date', e[0])}
                                onBlur={handleBlur}
                                value={values.date}
                                name="date"
                            />
                        </Form.Field>

                        <Form.Field>
                            <Input //Input Time Picker
                                placeholder='Time'
                                name="startTime"
                                value={values.startTime}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                icon='clock'
                            />
                        </Form.Field>

                        <Form.Field>
                            <Input //Number Slider??
                                placeholder='Pax'
                                name="pax"
                                value={values.pax}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                icon='users'
                            />
                        </Form.Field>
                    </Form.Group>

                    <Form.Group widths='equal'>
                        <Form.Select //Dropdown
                            placeholder='Any Cuisine'
                            name="cuisine"
                            options={CuisineOptions}
                            value={values.cuisine}
                            onChange={handleDropdownChange}
                        />

                        <Form.Select //Dropdown
                            placeholder='Any Location'
                            name="location"
                            options={LocationOptions}
                            value={values.location}
                            onChange={handleDropdownChange}
                        />

                        <Form.Select //Dropdown
                            placeholder='Any Restaurant'
                            name="restaurant"
                            options={RestaurantOptions}
                            value={values.restaurant}
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

export default SearchForm;