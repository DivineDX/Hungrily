import React from 'react';
import { Button, Header, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom';

const AuthFailed = () => {
    return (	 //acts as a card list here
        <div className='mt7 flex flex-column items-center'>
            <Header icon>
                <Icon size = 'massive' name='ban' />
                Authentication Credentials failed
            </Header>
            <Link to='/'>
                <Button size = 'large'>Back to Homepage</Button>
            </Link>
        </div>
    );
}

export default AuthFailed;