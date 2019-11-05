import React, { Component } from "react";
import { Menu } from "semantic-ui-react";
import './BulletinMenuBar.css';

export default class BulletinMenuBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeItem: props.options[0], //default
        }
    }

    handleItemClick = (e, { name }) => {
        this.setState({ activeItem: name });
        this.props.handleCategoryClick(name);
    }

    render() {
        const { activeItem } = this.state;

        return (
            <Menu size='massive' pointing secondary inverted className="w-75 pl4 ml3">
                {this.props.options.map((str, index) => {
                    return <Menu.Item
                        name={str}
                        active={activeItem === str }
                        onClick={this.handleItemClick}
                        className='bulletinBar white'
                        key={index}
                    />
                })
                }
            </Menu>
        );
    }
}

