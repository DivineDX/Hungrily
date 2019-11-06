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
import VoucherOptions from '../../Data/VoucherOptions';

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
    usingLoad: false,
    useSuccess: false,
    error: false,
}

class BookRestaurant extends React.Component {
    constructor(props) {
        super(props);
        this.state = initialState;
    }

    resetState = () => {
        this.setState(initialState);
    }

    useVoucher() {
        this.setState({ buyingLoad: true });
        fetch(`${url.fetchURL}/useVoucher`, {
            method: 'post',
            body: JSON.stringify({
                userID: this.props.userID,
                voucherName: this.props.data.voucherName
            })
        })
        .then(resp => resp.json())
        .then(data => {
            if (data === 'success') { 
                this.setState({ usingLoad: false, useSuccess: true, owned: this.state.owned - 1, })
            } else { //do not have enough voucher
                this.setState({ usingLoad: false, error: true })
            }
        }).catch(error => {
            console.log(error);
        })
    }

    render() {
        const { userID, resName, franchisorName, voucherName, owned } = this.props;

        return (
            <Formik
                initialValues={{
                    date: '',
                    pax: '',
                    voucher: '',
                }}

                onSubmit={(values) => { 
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
                            //console.log(data);
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
                    voucher: yup.string().required("You must select an option")
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
                                        name="voucher"
                                        options={VoucherOptions}
                                        value={values.voucher}
                                        onChange={handleDropdownChange}
                                    />
                                    <InputErrorLabel touched={touched.pax} errorText={errors.pax} />
                                </Form.Field>


                                <ConfirmBookingModal
                                    errors={errors}
                                    submit={handleSubmit}
                                    values={values}
                                    submitted={this.state.submitted}
                                    noSeats={this.state.noSeats}
                                    noDouble={this.state.noDouble}
                                    available={this.state.available}
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