import React, { Component } from 'react';
import { Button, Menu, Dropdown } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import "./NavBar.css";
import Logo from '../../Images/Logo.png'; 

class NavBar extends Component {
    handleItemClick = (e, { name }) => this.setState({ activeItem: name })
    constructor() {
        super()
        this.state = {
            activeItem: 'DiagNus',
        }
    }

    onSearchChange(event) {
        console.log(event);
    }

    render() {
        const { activeItem } = this.state
        const { loginProp, isSignedIn, name } = this.props
        return (
            <Menu borderless id="Navbar">
                <Link to="/" className="link no-underline flex items-center pl3">
                <img src={Logo} id='Logo' alt = 'logo'/>
                </Link>

                <div className=" dib flex items-left" id='NormalD'>
                    <Menu id='HeaderWord'>
                        <Menu.Item>
                            <Button className='HeaderBut' name='Restaurants' active={activeItem === 'Restaurants'} onClick={this.handleItemClick}>
                                <Link to="/restaurants">
                                    <div className="link dib dim mr0 mr1-ns" id='RestaurantFS'>Restaurants</div>
                                </Link>
                            </Button>
                        </Menu.Item>

                        <Menu.Item>
                            <Button className='HeaderBut' name='Reviews' active={activeItem === 'Reviews'} onClick={this.handleItemClick}>
                                <Link to="/customer_reservations">
                                    <div className="link dib dim mr0 mr1-ns" id='ReviewFS'> My Reservations</div>
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

                <Dropdown  id='SmallerD' icon='align justify' floating labeled button direction='left'>
                    <Dropdown.Menu>
                        <Dropdown.Item> 
                            <Button className='DropdownBut' name='Restaurants' active={activeItem === 'Restaurants'} onClick={this.handleItemClick}>
                                <Link to="/restaurants">
                                    <div className="link dib dim mr0 mr1-ns" id='Restaurants'>Restaurants</div>
                                </Link>
                            </Button>
                        </Dropdown.Item>
                        <Dropdown.Item> 
                            <Button className='DropdownBut' name='Reviews' active={activeItem === 'Reviews'} onClick={this.handleItemClick}>
                                <Link to="/reviews">
                                    <div className="link dib dim mr0 mr1-ns" id='ReviewFS'>Reviews</div>
                                </Link>
                            </Button>
                        </Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item className='tl'>
                            {isSignedIn
                                ? <i className='LogInText'> {name}</i>
                                : null
                            }
                        </Dropdown.Item>
                        <Dropdown.Item className='tl'>
                            {isSignedIn === false //conditional
                                ? <Link to="/login">
                                    <Button className="SIObut DropdownBut">Login</Button>
                                </Link>
                                : <Link to="/">
                                    <Button className="SIObut DropdownBut" onClick={() => loginProp()}>Sign Out</Button>
                                </Link>
                            }
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </Menu>
        )
    }
}

export default NavBar;