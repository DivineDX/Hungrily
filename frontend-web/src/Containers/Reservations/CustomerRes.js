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
            reservations: [],
            loading: true,
            authFailed: false,
            category: 'current',
        }
    }

    handleItemClick = (e, { name }) => {
        const { activeItem } = this.state
        this.setState({ activeItem: name });
    }

    // selectCategory = (arr, cat) => {
    //     const currentDate = new Date();
	// 	if (cat === 'current') {
	// 		return arr.filter(a => new Date(a.date) - currentDate < 0);
	// 	} else if (cat === 'past') {
	// 		return arr.filter(a => new Date(a.date) - currentDate > 0);
    //     }
    // }

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

    handleCategoryClick = (cat) => { //Only for Popular and Recent (Sorting, not filtering)
		this.setState({ visible: 3, category: cat });
	}

    render() {
        const { activeItem } = this.state
        // const displayedData = this.selectCategory(this.state.reservations, this.state.category);
        // const current = new Date();
        return (	 
            <div>
                <div className="w-75 pt5 center">
					<CustomerResMenuBar
						handleCategoryClick={this.handleCategoryClick}
					/>
				</div>

                <div>
                    <div id='CardDisplay'>
                        {
                            this.state.reservations.map((data) => {
                            return <CustomerResCard fluid centered data={data} />
                        })
                        }
                    </div>
                </div>
			</div>
        );
    }
}

export default CustomerRes;