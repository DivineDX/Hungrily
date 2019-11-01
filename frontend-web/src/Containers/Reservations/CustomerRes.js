import React, { Component } from 'react';
import CustomerResCard from '../../Components/Cards/CustomerResCard';
import url from '../../Config/url';

import './CustomerRes.css'
// import DashboardDropDown from '../../Components/Dropdowns/DashboardDropDown';
// import Cookies from 'universal-cookie';
// import AuthFailed from '../NonExistentPage/AuthFailed';
// import EmptyDashboard from '../../Components/EmptyFillers/EmptyDashboard';
// import url from '../../Configs/url';

class CustomerRes extends Component {
    constructor(props) {
        super(props)
        this.state = {
            reservations: [],
            loading: true,
            authFailed: false
        }
    }

    componentDidMount() {
        fetch(`${url.fetchURL}/seeMyResv` , {
            method: 'post',
            body: JSON.stringify({
                userID: this.props.userID,
            })
        })
            .then(resp => resp.json())
            .then(data => {
                this.setState({
                    reservations: data,
                    loading: false,
                });
            }).catch(error => {
                console.log(error);
            })
    }

    render() {
        return (	 //acts as a card list here
            <div>
                <div id='CardDisplay'>
                    {this.state.reservations.map((data) => {
                        return <CustomerResCard fluid centered data={data} />
                    })}
                </div>
            </div>
        );
    }
}

export default CustomerRes;