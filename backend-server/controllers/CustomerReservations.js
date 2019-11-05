/**
 * Check availablity of restaurant in that specific datetime
 * will return 3 results: 
 * 1) available: Literal meaning
 * 2) noSeats: No seats at that specific timing
 * 3) noDouble: Customer already has a reservation at another 
 */
const checkAvailability = (req, res, db) => {
    const {userID, franchiseName, resName, dateTime, pax} = req.body;
    res.status(200).json('available'); 
}

/**
 * Books a Reservation. Assumed to have checked availability beforehand
 */
const bookReservation = (req, res, db) => {
    const {userID, franchiseName, resName, dateTime, pax} = req.body;
    res.status(200).json('available');
}

/**
 * DELETE: Cancels an existing reservation
 */
const cancelReservation = (req, res, db) => {
    const {userID, location, resName, dateTime, table} = req.body;
    res.status(200).json('Success'); //success if successfully cancelled
}

/**
 * POST: See all the Reservations that a Customer has booked
 * Returns Restaurant.resName (currently store_name), Restaurant.location, Rstaurant.url, Reservation.dateTime, 
 * Reservation.table, Reservation.pax, Ratings.rating
 * See all reservations that is booked by a Customer
 */
const seeCustomerReservations = (req, res, db) => {
    const {userID} = req.body;     
    res.status(200).json(
        [{
            resName: 'Major 99', 
            location: '4190 Ang Mo Kio Ave 6 #02-02 Broadway Plaza Singapore (569841)',
            resUrl: 'major-99',
            dateTime: new Date('2019-12-17T15:25:00'), //SG Time
            table: 3,
            pax: 2,
            rating: null, //rating may be a null value
        }, 
        {
            resName: 'Fish & Co. (AMK Hub)',
            location: '53 Ang Mo Kio Avenue 3 #02-03 AMK Hub Singapore (569933)',
            resUrl: 'fish-co-amk-hub',
            dateTime: new Date('2019-10-11T12:30:00'), //SG Time
            table: 5,
            pax: 4,
            rating: '3', //rating may be a null value
        },
        {
            resName: '4Fingers Crispy Chicken (Changi Airport T3)',
            location: '65 Airport Boulevard #B2-02 Changi Airport Terminal 3 Singapore (819663)',
            resUrl: '4fingers-crispy-chicken-changi-airport-t3',
            dateTime: new Date('2019-11-05T18:00:00'), //SG Time
            table: 3,
            pax: 2,
            rating: '5', //rating may be a null value
        },
    ]);
}


module.exports = {
    checkAvailability: checkAvailability,
    bookReservation: bookReservation,
    cancelReservation: cancelReservation,
    seeCustomerReservations: seeCustomerReservations,
}