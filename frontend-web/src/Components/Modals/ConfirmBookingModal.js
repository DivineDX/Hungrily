import React from 'react';
import { Button, Modal, Icon, Dimmer, Loader } from 'semantic-ui-react'

/**
 * ConfirmBookingModal Component that is used on the BookRestaurantForm
 */
const ConfirmBookingModal = ({ submit, values, submitted, noSeats, noDouble, notOpen, available, loading, reset }) => {
    return (
        <Modal
            trigger={<Button>Book</Button>}
            dimmer={'inverted'}
            onClose={() => reset()}>
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
                        <Modal.Description className='f3 lh-copy mb4 underline'>
                            Please confirm your reservation details:
                        </Modal.Description>
                        <Modal.Description className='f4'>
                            <b>Reservation Date&Time: </b> {values.date.toString()}
                        </Modal.Description>
                        <Modal.Description className='f4'>
                            <b>Number of Pax: </b>{values.pax}
                        </Modal.Description>
                        <Modal.Description className='f4'>
                            <b>Voucher: </b>{values.voucher}
                        </Modal.Description>
                    </div>
                }

                {available &&
                    <Modal.Description>
                        Congratulations! Your Reservation is Confirmed on <b>{values.date.toString()}</b>
                    </Modal.Description>
                }

                {noSeats &&
                    <Modal.Description className='red'>
                        Unfortunately, there are no seats left at the timeslot that you wanted to book<br />
                        Please try another timing
                    </Modal.Description>
                }

                {noDouble &&
                    <Modal.Description className='red'>
                        Sorry, you already have booked another reservation at that timing.<br/>
                    </Modal.Description>
                }

                {notOpen &&
                    <Modal.Description className='red'>
                        Sorry, the restaurant is not open at this timing.<br/>
                    </Modal.Description>
                }

            </Modal.Content>
            {!submitted &&
                <Modal.Actions>
                    <Button onClick={() => submit()} color='green' inverted>
                        <Icon name='checkmark' /> Confirm
                </Button>
                </Modal.Actions>
            }
        </Modal>
    );
}

export default ConfirmBookingModal;