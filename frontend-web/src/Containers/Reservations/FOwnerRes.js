import React, { Component } from 'react';
import { Accordion } from 'semantic-ui-react'

import url from '../../Config/url';
import RestaurantAccordion from '../../Components/Accordions/RestaurantAccordion';

/**
 * Container of Accordions that display Reservations for each owned Restaurant of the FranchiseOwner
 */
class FOwnerRes extends Component {
    state = {
        activeIndex: '',
        loading: true,
        allRestReserv: []
    }

    handleClick = (e, titleProps) => {
        const { index } = titleProps
        const { activeIndex } = this.state
        const newIndex = activeIndex === index ? -1 : index

        this.setState({ activeIndex: newIndex })
    }

    componentDidMount() {
        fetch(`${url.fetchURL}/viewAllReservations`, {
            method: 'post',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
                franchiseUserID: this.props.userID,
            })
        })
            .then(resp => resp.json())
            .then(data => {
                this.setState({
                    allRestReserv: data,
                    loading: false,
                });
            }).catch(error => {
                console.log(error);
            })
    }

    render() {
        const { activeIndex } = this.state
        return (
            <Accordion fluid styled className='relative'>
                {
                    this.state.allRestReserv.map((restaurant, index) => {
                        return <RestaurantAccordion
                            index={index}
                            activeIndex={activeIndex}
                            handleClick={this.handleClick.bind(this)}
                            reservData={restaurant}
                            key={restaurant.resUrl}
                        />
                    })
                }
            </Accordion>
        );
    }
}

export default FOwnerRes;