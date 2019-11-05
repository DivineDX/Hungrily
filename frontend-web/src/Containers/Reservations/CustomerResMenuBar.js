import React, { Component } from "react";
import { Menu } from "semantic-ui-react";
import './CustomerResMenuBar.css';

export default class BulletinMenuBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeItem: "current",
        }
    }

    handleItemClick = (e, { name }) => {
        this.setState({ activeItem: name });
        this.props.handleCategoryClick(name);
    }

    render() {
        const { activeItem } = this.state;

        return (
            <div>
                <Menu size='massive' pointing secondary inverted>
                    <Menu.Item
                        name="current"
                        active={activeItem === "current"}
                        onClick={this.handleItemClick}
                        className = 'bulletinBar white'
                    />
                    <Menu.Item
                        name="past"
                        active={activeItem === "past"}
                        onClick={this.handleItemClick}
                        className = 'bulletinBar white'
                    />
                </Menu>
            </div>
        );
    }
}

