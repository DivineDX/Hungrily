import React, { Component } from 'react';
import ReservationCard from '../../Components/Cards/ReservationCard';
import url from '../../Config/url'
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
            loading: true
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
                <div className="w-75 pt5 center bb b--black-10">
                    <h1 className="tc baskerville f1 fw5">My Reservations</h1>
                </div>

                {this.state.reservations.map((data) => {
                    return <ReservationCard data={data} />
                })}
            </div>
        );
    }
}

export default CustomerRes;