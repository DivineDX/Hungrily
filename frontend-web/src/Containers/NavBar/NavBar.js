import React, { Component } from 'react';
import { Button, Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import "./NavBar.css";
import Logo from '../../Images/Logo.png';

class NavBar extends Component {
    handleItemClick = (e, { name }) => this.setState({ activeItem: name })
    constructor() {
        super()
        this.state = {
            activeItem: '',
        }
    }

    render() {
        const { loginProp, isSignedIn, name, isFranchiseOwner } = this.props

        return (
            <Menu borderless id="Navbar">
                <Link to="/" className="link no-underline flex items-center pl3">
                    <img src={Logo} id='Logo' alt='logo' />
                </Link>

                <div className=" dib flex items-left" id='NormalD'>
                    <Menu id='HeaderWord'>
                        <Menu.Item>
                            <Button className='HeaderBut' name='Restaurants' active={this.state.activeItem === 'Restaurants'} onClick={this.handleItemClick}>
                                <Link to="/restaurants">
                                    <div className="link dib dim mr0 mr1-ns" id='RestaurantFS'>
                                        {isFranchiseOwner
                                            ? "Owned Restaurants"
                                            : "View All Restaurants"
                                        }
                                    </div>
                                </Link>
                            </Button>
                        </Menu.Item>

                        <Menu.Item>
                            <Button className='HeaderBut' name='Reviews' active={this.state.activeItem === 'Reviews'} onClick={this.handleItemClick}>
                                <Link to="/reservations">
                                    <div className="link dib dim mr0 mr1-ns" id='ReviewFS'>
                                        {isFranchiseOwner
                                            ? "View Customer Reservations"
                                            : "My Reservations"
                                        }
                                    </div>
                                </Link>
                            </Button>
                        </Menu.Item>

                        <Menu.Item>
                            <Button className='HeaderBut' name='Voucherlist' active={this.state.activeItem === 'Voucherlist'} onClick={this.handleItemClick}>
                                <Link to="/voucherlist">
                                    <div className="link dib dim mr0 mr1-ns" id='VoucherFS'>
                                        {isFranchiseOwner
                                            ? null
                                            : "List of Vouchers"
                                        }
                                    </div>
                                </Link>
                            </Button>
                        </Menu.Item>
                    </Menu>

                    <Menu.Menu>
                        <Menu.Item id='SignInOut'>
                            <div>
                                {isSignedIn
                                    ? <i className='underline LogInText'>Logged in as {name}</i>
                                    : null
                                }

                                {isSignedIn === false //conditional
                                    ? <Link to="/login">
                                        <Button className="SIObut">Login</Button>
                                    </Link>
                                    : <Link to="/">
                                        <Button className="SIObut" onClick={() => loginProp()}>Sign Out</Button>
                                    </Link>
                                }
                            </div>
                        </Menu.Item>
                    </Menu.Menu>
                </div>
            </Menu>
        )
    }
}

export default NavBar;