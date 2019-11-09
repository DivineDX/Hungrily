import React from 'react';
import { Accordion, Icon, Grid } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import FResCard from '../Cards/FResCard';

/**
 * Contains the data of all reservations for a speicfic restaurant
 * Restaurants that are 
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
                <Grid columns={4}>
                    {reservations.map((reserv,index) => {
                        return <Grid.Column>
                            <FResCard data={reserv}
                                key={index}
                            />
                        </Grid.Column>
                    })}
                </Grid>
            </Accordion.Content>
        </div>
    )
}

export default RestaurantAccordion;