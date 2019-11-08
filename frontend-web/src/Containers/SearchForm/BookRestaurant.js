import React from 'react';
import { Form } from 'semantic-ui-react'
import { Formik } from "formik";
import * as yup from "yup";
import Flatpickr from 'react-flatpickr'

import PaxOptions from '../../Data/PaxOptions';
import ConfirmBookingModal from '../../Components/Modals/ConfirmBookingModal';
import InputErrorLabel from '../../Components/Label/InputErrorLabel';
import url from '../../Config/url';
import 'flatpickr/dist/themes/light.css'

/**
 * Form used for the Booking of a Reservation at a Restaurant
 * Required Customer to state Date&Time of Booking and Number of Pax.
 */

const initialState = {
    available: false,
    noSeats: false,
    noDouble: false,
    loading: false,
    submitted: false,
}

class BookRestaurant extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            initialState,
            'vouchers': [],
        }
    }

    componentDidMount() {
        this.createDropdown('voucherlist');
    }

    createDropdown = (route) => {        
        fetch(`${url.fetchURL}/${route}`, {
            method: 'post',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
                userID: this.props.userID,
            })
        })
			.then(resp => resp.json())
			.then(data => {
                data.filter(x => data.owned > 0).map(x => data.voucherName)
                const dropdownOptions = [];
                dropdownOptions.push({key: '0', text: 'None', value: ''});
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


    resetState = () => {
        this.setState(initialState);
    }

    render() {
        const { userID, resName, franchisorName } = this.props;

        return (
            <Formik
                initialValues={{
                    date: '',
                    pax: '',
                    vouchers: '',
                }}

                onSubmit={(values) => { 
                    this.props.triggerDisplay(values);
                    this.setState({ loading: true });
                    fetch(`${url.fetchURL}/resvAvailability`, {
                        method: 'post',
                        headers: { 'Content-type': 'application/json' },
                        body: JSON.stringify({
                            userID: userID,
                            franchiseName: franchisorName,
                            resName: resName,
                            dateTime: values.date,
                            pax: values.pax
                        })
                    })
                        .then(resp => resp.json())
                        .then(data => {
                            console.log(data);
                            this.setState({ submitted: true, loading: false });
                            switch (data) {
                                case 'available': //todo: After check availability, if available, will do another POST to insert into DB
                                    this.setState({ available: true })
                                    break;
                                case 'noSeats':
                                    this.setState({ noSeats: true })
                                    break;
                                case 'noDouble':
                                    this.setState({ noDouble: true })
                                    break;
                                default: //some error s
                                    break;
                            }

                        }).catch(err => {
                            alert(err);
                        })
                }}

                validationSchema={yup.object().shape({
                    date: yup.date("Invalid Date")
                        .min(new Date(), "Your cannot state a past date")
                        .required("You must state a date"),
                    pax: yup.number().min(1).max(10).required("You must state the number of diners"),
                    vouchers: yup.string().required("You must select an option")
                })}

                render={({ values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue }) => {
                    const handleDropdownChange = (e, { name, value }) => {
                        setFieldValue(name, value);
                    };

                    return (
                        <Form size='medium' className='ba b--light-silver pt3 pl3 pr2 appColor'>
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
                                    <InputErrorLabel touched={touched.date} errorText={errors.date} />
                                </Form.Field>

                                <Form.Field>
                                    <Form.Select //Dropdown
                                        placeholder='Pax'
                                        name="pax"
                                        options={PaxOptions}
                                        value={values.pax}
                                        onChange={handleDropdownChange}
                                    />
                                    <InputErrorLabel touched={touched.pax} errorText={errors.pax} />
                                </Form.Field>

                                <Form.Field>
                                    <Form.Select //Dropdown
                                        placeholder='Voucher Code'
                                        name="vouchers"
                                        options={this.state.vouchers}
                                        value={values.vouchers}
                                        onChange={handleDropdownChange}
                                    />
                                    <InputErrorLabel touched={touched.vouchers} errorText={errors.vouchers} />
                                </Form.Field>


                                <ConfirmBookingModal
                                    errors={errors}
                                    submit={handleSubmit}
                                    values={values}
                                    submitted={this.state.submitted}
                                    noSeats={this.state.noSeats}
                                    noDouble={this.state.noDouble}
                                    available={this.state.available}
                                    vouchers={this.state.vouchers}
                                    loading={this.state.loading}
                                    reset = {this.resetState}
                                />
                            </Form.Group>
                        </Form>
                    );
                }}
            />
        );
    }
}

export default BookRestaurant;