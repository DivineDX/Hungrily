import React from 'react';
import { Modal, Button, Icon } from 'semantic-ui-react'

import './RestaurantDetailBox.css';

const RestaurantDetailBox = (props) => {
    const { location, area, opening_hours, closing_hours, Cuisine, Price } = props.data;

    return (
        <div id='resDetailsBox' className='relative flex flex-row justify-center'>
            <div className='flex flex-column mr6'>
                <div className='containerText'>
                    <h3 className='b f3'> Cuisine </h3>
                    <p className=''> Testing stufffs </p>
                </div>

                <div className='containerText'>
                    <h3 className='b f3'> Menu </h3>
                    <Modal trigger={<Button> Menu </Button>}>
                        <Modal.Content>
                            <p> Menu </p>
                        </Modal.Content>
                        <Modal.Actions>
                            <Button color='green' inverted>
                                <Icon name='checkmark' /> Yes
                                    </Button>
                        </Modal.Actions>
                    </Modal>
                </div>

                <div className='containerText'>
                    <h3 className='b f3'> Opening Hours </h3>
                    <p className=''>
                        Mon-Sun: {opening_hours} - {closing_hours}
                    </p>
                </div>
            </div>

            <div className='flex flex-column ml6'>
                <div className='containerText'>
                    <h3 className='b f3'> Price </h3>
                    <p className=''> {Price} </p>
                </div>
                <div className='containerText'>
                    <h3 className='b f3'> Location </h3>
                    <p className=''> {area} </p>
                </div>
                <div className='containerText'>
                    <h3 className='b f3'> Address </h3>
                    <p className=''> {location} </p>
                </div>
            </div>
        </div>
    );
}

export default RestaurantDetailBox;