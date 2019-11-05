import React from 'react';
import { Icon, Image, Card } from 'semantic-ui-react';
import { Link } from 'react-router-dom'

import foodImage from '../../Images/food.jpg';

import RateModal from '../Modals/RateModal'
import DeleteModal from '../Modals/DeleteModal'
import './CustomerResCard.css';

const CustomerResCard = ({ data, isCurrent }) => {
    const { resName, resUrl, dateTime, table, pax, rating } = data;

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
                        <span className='ml1'>{dateTime}</span>
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
                ? <DeleteModal />
                : <RateModal />
            }
        </Card>
    )
}


export default CustomerResCard;