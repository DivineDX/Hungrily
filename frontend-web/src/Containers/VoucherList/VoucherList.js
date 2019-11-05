import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';

import url from '../../Config/url';
import VoucherCard from '../../Components/Cards/VoucherCard';
import BulletinMenuBar from '../../Components/MenuBar/BulletinMenuBar';
import "./VoucherList.css";

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

    handleCategoryClick = (cat) => {
        if (cat === 'All') { //select All

        } else { //select owned

        }
    }

    render() {
        return (
            <div className="w-75 pt5 center bb b--black-10">
                <h1 className="tc baskerville f1 fw5"> All Vouchers </h1>
                <BulletinMenuBar
                    handleCategoryClick={this.handleCategoryClick.bind(this)}
                    options={["All", "Owned"]}
                />

                <div>
                    <Grid columns={3}>
                        {this.state.vouchers.map((data) => {
                            return <Grid.Column>
                                <VoucherCard data={data} />
                            </Grid.Column>
                        })}
                    </Grid>
                </div>
            </div>
        );
    }
}

export default Voucherlist;