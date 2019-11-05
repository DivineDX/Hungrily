import React from 'react';
import { Icon, Card } from 'semantic-ui-react';

import dateParser from '../../Common/ParserUtil';

const FResCard = ({ data }) => {
    const dateObj = {
        dateTime: new Date(data.dateTime),
    }
    data = Object.assign(data, dateObj);

    const { userID, table, pax, dateTime } = data;

    return (
        <Card className="ui card" id='ResvCard'>
            <Card.Content>
                <Card.Header className = 'mb2'>
                Customer UserID: {userID}
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
        </Card>
    )
}

export default FResCard;