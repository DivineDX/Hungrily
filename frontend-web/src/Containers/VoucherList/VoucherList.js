import React, { Component } from 'react';
import url from '../../Config/url';
import VoucherCard from '../../Components/Cards/VoucherCard'
import "./VoucherList.css"

class Voucherlist extends Component {
    constructor(props) {
        super(props)
        this.state = {
            vouchers: [],
        }
    }

    componentDidMount() {
        fetch(`${url.fetchURL}/voucherlist`)
            .then(resp => resp.json())
            .then(data => {
                this.setState({
                    vouchers: data,
                });
            }).catch(error => {
                console.log(error);
            })
    }


    render() {

        return (	 
            <div>
                <div className="w-75 pt5 center bb b--black-10">
                    <h1 className="tc baskerville f1 fw5"> All Vouchers </h1>
                </div>                
                
                <div className = 'voucherCard'>
                    {this.state.vouchers.map((data) => {
                        return <VoucherCard data= {data} />
                    })}
                </div>
                
			</div>
        );
    }
}

export default Voucherlist;