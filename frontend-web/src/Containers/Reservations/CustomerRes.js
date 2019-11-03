import React, { Component } from 'react';
import CustomerResCard from '../../Components/Cards/CustomerResCard';
import CustomerResMenuBar from '../Reservations/CustomerResMenuBar';
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
            reservations: [], //contains all reservations from database
            filteredReservation: [], //contains only 'current' or 'past' reservations
            loading: true,
            authFailed: false,
            isCurrent: true, //will be true to show past resv
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

    handleCategoryClick = (cat) => {
        if (cat === 'current') {
            // this.setState({isCurrent: true, filteredReservation: this.state.reservations.filter( show only current reservations )});
            this.setState({isCurrent: false});
        } else {
            // this.setState({isCurrent: false, filteredReservationfilteredReservation: this.state.reservations.filter( show only past reservations )});
            this.setState({isCurrent: true});
        }
        // filteredReservation = this.state.reservations.map
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
                                category = {this.state.category}
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