import React from 'react';
import { Button, Modal, Icon, Dimmer, Loader } from 'semantic-ui-react'

/**
 * ConfirmBookingModal Component that is used on the BookRestaurantForm
 */
const ConfirmBookingModal = ({ submit, values, submitted, noSeats, noDouble, available, loading }) => {
    return (
        <Modal trigger={<Button>Book</Button>} dimmer={'inverted'}>
            <Modal.Header>Booking Confirmation</Modal.Header>

            {loading &&
                <Dimmer active inverted>
                    <Loader inverted>Loading</Loader>
                </Dimmer>
            }

            <Modal.Content >
                {
                    !submitted &&
                    <div>
                        <Modal.Description className = 'f3 lh-copy mb4 underline'>
                            Please confirm your reservation details: 
                        </Modal.Description>
                        <Modal.Description className='f4'>
                            <b>Reservation Date&Time: </b> {values.date.toString()}
                        </Modal.Description>
                        <Modal.Description className='f4'>
                            <b>Number of Pax: </b>{values.pax}
                        </Modal.Description>

                    </div>
                }

                {available &&
                    <Modal.Description>
                        Congratulations! Your Resevation is Confirmed on <b>{values.date.toString()}</b>
                    </Modal.Description>
                }

                {noSeats &&
                    <Modal.Description className='red'>
                        Unfortunately, there are no seats left at the timeslot that you wanted to book
                    </Modal.Description>
                }

                {noDouble &&
                    <Modal.Description className='red'>
                        Sorry, you already have another reservation at that timing
                    </Modal.Description>
                }

            </Modal.Content>
            <Modal.Actions>
                <Button color='red' inverted>
                    <Icon name='remove' /> No
                </Button>
                <Button onClick={() => submit()} color='green' inverted>
                    <Icon name='checkmark' /> Yes
                </Button>
            </Modal.Actions>
        </Modal>
    );
}

export default ConfirmBookingModal;