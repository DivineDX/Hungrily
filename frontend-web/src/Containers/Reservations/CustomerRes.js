import React, { Component } from 'react';
import CustomerResCard from '../../Components/Cards/CustomerResCard';
import CustomerResMenuBar from '../Reservations/CustomerResMenuBar';
import url from '../../Config/url';

import './CustomerRes.css'

/**
 * Page that shows the list of Reservations that a customer has made
 */
class CustomerRes extends Component {
    constructor(props) {
        super(props)
        this.state = {
            reservations: [], //contains all reservations from database
            filteredReservation: [], //Filtered shown list of reservations
            loading: true,
            isCurrent: true, //default true, else false: shows past
        }
    }
    componentDidMount() {
        this.fetchReservations();
    }

    fetchReservations() {
        fetch(`${url.fetchURL}/seeMyResv`, {
            method: 'post',
            body: JSON.stringify({
                userID: this.props.userID,
            })
        })
            .then(resp => resp.json())
            .then(data => { //data is an Array
                const resvData = data.map(x => {
                    const dateObj = {
                            dateTime: new Date(x.dateTime),
                    };
                    return Object.assign(x, dateObj)
                });
                this.setState({
                    reservations: resvData,
                    loading: false,
                });
            }).catch(error => {
                console.log(error);
            })
    }

    handleCategoryClick = (cat) => {
        if (cat === 'current') { //select current
            this.setState({ isCurrent: true });
        } else { //select past
            this.setState({ isCurrent: false });
        }
    }

    render() {
        const {userID} = this.props; 
        return (
            <div>
                <div className="w-75 pt5 pl4 ml3">
                    <CustomerResMenuBar
                        handleCategoryClick={this.handleCategoryClick.bind(this)}
                    />
                </div>

                <div>
                    <div id='CardDisplay'>
                        {
                            this.state.reservations.map((data) => {
                                return <CustomerResCard
                                    fluid
                                    centered
                                    data={data}
                                    isCurrent={this.state.isCurrent}
                                    userID = {userID}
                                    fetchReservations = {this.fetchReservations.bind(this)}
                                />
                            })
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default CustomerRes;