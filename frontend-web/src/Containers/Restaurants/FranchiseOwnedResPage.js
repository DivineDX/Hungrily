import React, { Component } from 'react';
import RestaurantDisplayBulletin from '../../Components/Bulletins/RestaurantDisplayBulletin';
import url from '../../Config/url'

/**
 * Page for exclusive use by FranchiseOwners to view all their owned Restaurants
 */
class FranchiseOwnedResPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            restaurants: [],
            loading: true,
            visible: 8
        }
    }

    componentDidMount() {
        fetch(`${url.fetchURL}/ownedRestaurants`, {
            method: 'post',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
                franchiseOwnerID: this.props.userID
            })
        })
            .then(resp => resp.json())
            .then(data => {
                this.setState({ restaurants: data, loading: false })
            }).catch(error => {
                console.log(error);
            })
    }

    loadMore = () => {
        this.setState({
            visible: (this.state.visible) + 8,
        })
    }

    render() {
        return (
            <div>
                <div className="w-75 pt5 center bb b--black-10">
                    <h1 className="tc baskerville f1 fw5"> Owned Restaurants</h1>
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

export default FranchiseOwnedResPage;