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
    notOpen: false,
    loading: false,
    submitted: false,
}

class BookRestaurant extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            initialState,
            'voucherUseList': [],
        }
    }

    componentDidMount() {
        this.createDropdown('voucherUseList');
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
                dropdownOptions.push({ key: '0', text: 'None', value: 'None' });
                data.forEach((data, index) => {
                    const obj = {
                        key: index,
                        text: data.voucher_code + "(" + data.count + ")",
                        value: data.voucher_code
                    }
                    dropdownOptions.push(obj);
                })
                const obj = {};
                obj[route] = dropdownOptions;
                this.setState(obj);
            }).catch(error => {
                console.log(error);
            })
    }

    useVoucher = (userID, voucherCode) => {
        if(voucherCode === 'None') return;
        fetch(`${url.fetchURL}/useVoucher`, {
            method: 'put',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
                userID: userID,
                voucherCode: voucherCode,
            })
        }).then(resp => resp.json())
        .then(data => {
        }).catch(err => alert(err));
    }

    resetState = () => {
        this.setState(initialState);
    }

    render() {
        const { userID, resUrl, franchisorId, location, isEditing } = this.props;

        return (
            <Formik
                initialValues={{
                    date: '',
                    pax: '',
                    voucher: '',
                }}

                onSubmit={(values) => {
                    let urlToUse;
                    isEditing
                        ? urlToUse = 'editResv'
                        : urlToUse = 'resvAvailability'
                    this.setState({ loading: true });
                    fetch(`${url.fetchURL}/${urlToUse}`, {
                        method: 'post',
                        headers: { 'Content-type': 'application/json' },
                        body: JSON.stringify({
                            userID: userID,
                            franchisorId: franchisorId,
                            location: location,
                            resUrl: resUrl,
                            dateTime: values.date,
                            pax: values.pax,
                            oldDateTime: isEditing ? this.props.oldDateTime : null,
                            oldTableNumber: isEditing ? this.props.oldTableNumber : null,
                        })
                    })
                        .then(resp => resp.json())
                        .then(data => {
                            this.setState({ submitted: true, loading: false });
                            switch (data) {
                                case 'available': //todo: After check availability, if available, will do another POST to insert into DB
                                    this.setState({ available: true })
                                    this.useVoucher(userID, values.voucher);
                                    break;
                                case 'noSeats':
                                    this.setState({ noSeats: true })
                                    break;
                                case 'noDouble':
                                    this.setState({ noDouble: true })
                                    break;
                                case 'notOpen':
                                    this.setState({notOpen: true})
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
                })}

                render={({ values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue }) => {
                    const handleDropdownChange = (e, { name, value }) => {
                        setFieldValue(name, value);
                    };

                    return (
                        <Form size='large' className='ba b--light-silver pt3 pl3 pr2 appColor'>
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
                                        options={this.state.voucherUseList}
                                        value={values.voucher}
                                        onChange={handleDropdownChange}
                                    />
                                    <InputErrorLabel touched={touched.voucher} errorText={errors.voucher} />
                                </Form.Field>

                                <ConfirmBookingModal
                                    errors={errors}
                                    submit={handleSubmit}
                                    values={values}
                                    submitted={this.state.submitted}
                                    noSeats={this.state.noSeats}
                                    noDouble={this.state.noDouble}
                                    notOpen={this.state.notOpen}
                                    available={this.state.available}
                                    loading={this.state.loading}
                                    reset={this.resetState}
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