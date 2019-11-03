import React from 'react';
import { Button, Header, Icon, Image, Modal } from 'semantic-ui-react'
import FoodCard from '../Cards/FoodCard';

/**
 * MenuModal Component that is used on the RestaurantPage
 * menuData is an array of objects, each representing a food item.
 */
const MenuModal = ({menuData}) => {
    console.log("MenuData:", menuData)
    return (
        <Modal trigger={<Button>Menu</Button>} dimmer = {'inverted'}>
            <Modal.Header>Menu</Modal.Header>
            <Modal.Content scrolling>
                <Modal.Description>
                    {
                        menuData.map(data => {
                            return (
                                <FoodCard foodData = {data}/>
                            );
                        })
                    }

                    
                </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
            </Modal.Actions>
        </Modal>
    );
}

export default MenuModal;