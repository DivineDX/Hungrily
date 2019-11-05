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
        fetch(`${url.fetchURL}/seeMyResv`, {
            method: 'post',
            body: JSON.stringify({
                userID: this.props.userID,
            })
        })
            .then(resp => resp.json())
            .then(data => {
                console.log(data);
                this.setState({
                    reservations: data,
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

    // selectCategory = (arr, cat) => {
    //     const currentDate = new Date();
    // 	if (cat === 'current') {
    // 		return arr.filter(a => new Date(a.date) - currentDate < 0);
    // 	} else if (cat === 'past') {
    // 		return arr.filter(a => new Date(a.date) - currentDate > 0);
    //     }
    // }

    render() {
        // const displayedData = this.selectCategory(this.state.reservations, this.state.category);
        // const current = new Date();
        return (
            <div>
                <div className="w-75 pt5 pl4 ml3">
                    <CustomerResMenuBar
                        handleCategoryClick={this.handleCategoryClick}
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
                                    category={this.state.category}
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