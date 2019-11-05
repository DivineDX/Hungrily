import React, { Component } from 'react';
import FranchiseOResCard from '../../Components/Cards/FranchiseOResCard';
import url from '../../Config/url';


class FranchiseORes extends Component {
    constructor(props) {
        super(props)
        this.state = {
            reservations: [],
            loading: true,
            authFailed: false
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
                <div id='CardDisplay'>
                    {this.state.reservations.map((data) => {
                        return <FranchiseOResCard fluid centered data={data} />
                    })}
                </div>
            </div>
        );
    }
}

export default FranchiseORes;