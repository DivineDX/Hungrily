import React, { Component } from 'react';
import CustomerResCard from '../../Components/Cards/CustomerResCard';
import BulletinMenuBar from '../../Components/MenuBar/BulletinMenuBar';
import url from '../../Config/url';

import './CustomerRes.css'
import Loading from '../../Components/Loaders/Loading';
import LoadMoreButton from '../../Components/Button/LoadMoreButton';

/**
 * Page that shows the list of Reservations that a customer has made
 */
class CustomerRes extends Component {
    constructor(props) {
        super(props)
        this.state = {
            reservations: [], //contains all reservations from database
            filteredReservations: [], //Filtered shown list of reservations
            loading: true,
            isCurrent: true, //default true, else false: shows past
            visible: 8,
        }
    }
    componentDidMount() {
        setTimeout(this.fetchReservations(), 3000);
    }

    fetchReservations() {
        fetch(`${url.fetchURL}/seeMyResv`, {
            method: 'post',
            headers: { 'Content-type': 'application/json' },
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
                this.state.isCurrent
                    ? this.handleCategoryClick('current')
                    : this.handleCategoryClick('past');
            }).catch(error => {
                console.log(error);
            })
    }

    loadMore = () => {
        this.setState({
            visible: (this.state.visible) + 8,
        })
    }

    handleCategoryClick = (cat) => {
        if (cat === 'current') { //select current
            const filteredData = this.state.reservations.filter(x => x.dateTime >= new Date()); //future date
            this.setState({
                filteredReservations: filteredData,
                isCurrent: true
            });
        } else { //select past
            const filteredData = this.state.reservations.filter(x => x.dateTime < new Date());
            this.setState({
                filteredReservations: filteredData,
                isCurrent: false
            });
        }
    }

    render() {
        const { userID } = this.props;

        return (
            <div>
                <BulletinMenuBar
                    handleCategoryClick={this.handleCategoryClick.bind(this)}
                    options={["current", "past"]}
                />

                {this.state.loading
                    ? <Loading />
                    : <div>
                        <div id='CardDisplay'>
                            {this.state.filteredReservations.slice(0, this.state.visible).map((data) => {
                                return <CustomerResCard
                                    fluid
                                    centered
                                    data={data}
                                    isCurrent={this.state.isCurrent}
                                    userID={userID}
                                    key={data.resUrl}
                                    fetchReservations={this.fetchReservations.bind(this)}
                                />
                            })
                            }
                        </div>
                        {this.state.visible < this.state.filteredReservations.length 
                            && <LoadMoreButton loadMore={this.loadMore} />
                        }
                    </div>
                }
            </div>
        );
    }
}

export default CustomerRes;