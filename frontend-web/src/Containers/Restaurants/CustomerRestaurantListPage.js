import React, { Component } from 'react';

import url from '../../Config/url'
import RestaurantDisplayBulletin from '../../Components/Bulletins/RestaurantDisplayBulletin';
import BulletinMenuBar from '../../Components/MenuBar/BulletinMenuBar';

/**
 * Rendered Page that shows the entire list of Restaurants for browsing
 */
class CustomerRestaurantListPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            allRestaurants: [],
            compatibleRestaurants: [],
            loading: true,
            visible: 12,
            showAll: true,
        }
    }

    componentDidMount() {
        this.fetchAllRestaurants();
    }

    fetchAllRestaurants() {
        this.setState({loading: true});
        fetch(`${url.fetchURL}/resData`)
            .then(resp => resp.json())
            .then(data => {
                this.setState({
                    allRestaurants: data,
                    loading: false,
                });
            }).catch(error => {
                console.log(error);
            })
    }

    fetchCompatibleRestaurants() {
        this.setState({loading: true});
        fetch(`${url.fetchURL}/compatible`, {
            method: 'post',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
                userid: this.props.userID
            })
        })
            .then(resp => resp.json())
            .then(data => {
                this.setState({
                    compatibleRestaurants: data,
                    loading: false,
                });
            }).catch(error => {
                console.log(error);
            })
    }

    loadMore = () => {
        this.setState({
            visible: (this.state.visible) + 12,
        })
    }

    handleCategoryClick = (cat) => {
        if (cat === 'All Restaurants') { //select all
            this.fetchAllRestaurants();
            this.setState({
                showAll: true
            });
        } else { //select compatible
            this.fetchCompatibleRestaurants()
            this.setState({
                showAll: false
            });
        }
    }

    render() {
        return (
            <div>
                {/* <div className="w-75 pt5 center bb b--black-10 relative">
                    <h1 className="tc baskerville f1 fw5"> All Restaurants</h1>
                </div> */}
                <div className = 'mt4 w-50 center'>
                    <BulletinMenuBar
                        handleCategoryClick={this.handleCategoryClick.bind(this)}
                        options={["All Restaurants", "Compatible Restaurants"]}
                    />
                </div>


                <div className='pa4'>
                    <RestaurantDisplayBulletin
                        loading={this.state.loading}
                        resDisplay={
                            this.state.showAll
                                ? this.state.allRestaurants
                                : this.state.compatibleRestaurants
                            }
                        visibleItemsNum={this.state.visible}
                        totalLength={
                            this.state.showAll
                                ? this.state.allRestaurants.length
                                : this.state.compatibleRestaurants.length
                            }
                        loadMore={this.loadMore}
                    />
                </div>

            </div>
        );
    }
}

export default CustomerRestaurantListPage;