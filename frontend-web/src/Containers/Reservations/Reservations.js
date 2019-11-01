import React, { Component } from 'react';
import CustomerRes from '../Reservations/CustomerRes';
import FranchiseORes from '../Reservations/FranchiseORes';
import url from '../../Config/url';

import './CustomerRes.css'
import CustomerResCard from '../../Components/Cards/CustomerResCard';
// import DashboardDropDown from '../../Components/Dropdowns/DashboardDropDown';
// import Cookies from 'universal-cookie';
// import AuthFailed from '../NonExistentPage/AuthFailed';
// import EmptyDashboard from '../../Components/EmptyFillers/EmptyDashboard';
// import url from '../../Configs/url';

class Reservations extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const {franchiseOwner} = this.props;
        let page; 

        if (franchiseOwner) {
            page = <FranchiseORes />
        } else {
           page = <CustomerResCard />
        }

        return (
            <div className="w-75 pt5 center bb b--black-10">
                <h1 className="tc baskerville f1 fw5">My Reservations</h1>
                <div franchiseOwner = {franchiseOwner} /> 
                {page}
            </div>
        );
    }
}

export default Reservations;