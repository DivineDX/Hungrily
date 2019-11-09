import React from 'react';
import { Icon, Image, Card, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom'

import foodImage from '../../Images/food.jpg';

import RateModal from '../Modals/RateModal'
import EditCResvPage from '../../Containers/Reservations/EditCResvPage'
import dateParser from '../../Common/ParserUtil';
import './CustomerResCard.css';

const CustomerResCard = ({ data, isCurrent, userID, fetchReservations }) => {
    const { resName, resUrl, dateTime, table, pax } = data;

    return (
        <Card className="ui card" id='ResvCard'>
            <Image
                fluid
                src={foodImage}
                alt="Error" className="w-100" id="cardImage"
            />

            <Card.Content>
                <Card.Header className='NameHeader'>
                    <Link to={`/restaurants/${resUrl}`}>
                        {resName}
                    </Link>
                </Card.Header>

                <div>
                    <Card.Meta>
                        <Icon name='clock' />
                        <span className='ml1'>{dateParser(dateTime)}</span>
                    </Card.Meta>
                    <Card.Meta>
                        <Icon name='table' />
                        <span className='ml1'>{table}</span>
                    </Card.Meta>
                    <Card.Meta>
                        <Icon name='user' />
                        <span className='ml1'>{pax}</span>
                    </Card.Meta>

                </div>
            </Card.Content>
            {isCurrent
                ? <Button name='EditCResvPage' 
                        data = {data} 
                        userID = {userID} 
                        fetchReservations = {fetchReservations}>
                    <Link to="/editresv" className= 'white'>
                        Edit Reservations
                    </Link>
                </Button> 
                : <RateModal data = {data} userID = {userID} fetchReservations = {fetchReservations}/>
            }
        </Card>
    )
}


export default CustomerResCard;