import React from 'react';
import { Accordion, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

/**
 * Contains tbhe data of all reservations in this restaurant
 */
const RestaurantAccordion = ({ index, activeIndex, handleClick, reservData }) => {
    const { resName, resUrl, reservations } = reservData; //reservations is an array of objects
    return (
        <div>
            <Accordion.Title
                active={activeIndex === index}
                index={index}
                onClick={handleClick}
            >
                <Icon name='dropdown' />
                <Link to={`/restaurants/${resUrl}`}>
                    {resName}
                </Link>
            </Accordion.Title>
            <Accordion.Content active={activeIndex === index}>
                <p>
                    A dog is a type of domesticated animal. Known for its loyalty and
                    faithfulness, it can be found as a welcome guest in many households
                    across the world.
                </p>
            </Accordion.Content>
        </div>
    )
}

export default RestaurantAccordion;