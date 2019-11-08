import React, { Component } from 'react';

import url from '../../Config/url'
import RestaurantDisplayBulletin from '../../Components/Bulletins/RestaurantDisplayBulletin';

/**
 * Rendered Page that shows the entire list of Restaurants for browsing
 */
class CustomerRestaurantListPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            restaurants: [],
            loading: true,
            visible: 12,
        }
    }

    componentDidMount() {
        fetch(`${url.fetchURL}/resData`)
            .then(resp => resp.json())
            .then(data => {
                this.setState({
                    restaurants: data,
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

    render() {
        //console.log(this.state.restaurants);
        return (
            <div>
                <div className="w-75 pt5 center bb b--black-10 relative">
                    <h1 className="tc baskerville f1 fw5"> All Restaurants</h1>
                </div>

                <div className='pa4'>
                    <RestaurantDisplayBulletin
                        loading={this.state.loading}
                        resDisplay={this.state.restaurants}
                        visibleItemsNum={this.state.visible}
                        totalLength={this.state.restaurants.length}
                        loadMore={this.loadMore}
                    />
                </div>

            </div>
        );
    }
}

export default CustomerRestaurantListPage;