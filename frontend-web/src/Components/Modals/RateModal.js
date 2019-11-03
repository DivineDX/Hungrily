import React from 'react';
import { Button, Modal, Rating } from 'semantic-ui-react'

/**

 */
const RateModal = () => {
    return (
        <Modal trigger={<Button> Rate </Button>}>
            <Modal.Content>
                <div> Leave a Rating </div>
                <Rating maxRating={5} clearable className='pt3' />
            </Modal.Content>
        </Modal> 
    );
}

export default RateModal;

