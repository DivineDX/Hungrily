import React, { Component } from 'react';
import url from '../../Config/url';

class Voucherlist extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    componentDidMount() {
        fetch(`${url.fetchURL}/voucherlist`)
            .then(resp => resp.json())
            .then(data => {
                this.setState({
                });
            }).catch(error => {
                console.log(error);
            })
    }


    render() {

        return (	 
            <div>

			</div>
        );
    }
}

export default Voucherlist;