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
 * Cancels an existing reservation
 */
const cancelReservation = (req, res, db) => {
    const {UserID, FranchiseName, RestaurantLocation, DateTime, Table} = req.body;
    res.status(200).json('Success'); //success if successfully cancelled
}

/**
 * POST: See all the Reservations that a Customer has booked
 * Returns Restaurant.resName (currently store_name) in DB, Rstaurant.url, Reservation.dateTime, 
 * See all reservations that is booked by a Customer
 */
const seeCustomerReservations = (req, res, db) => {
    const {UserID} = req.body; 
    res.status(200).json(
        [{
            resName: 'Major 99', 
            resUrl: 'major-99',
            dateTime: "20th October 2018, 0900", //warning: Currently of string type
            table: 3,
            pax: 2,
            rating: null, //rating may be a null value
        }, 
        {
            resName: 'Fish & Co. (AMK Hub)',
            resUrl: 'fish-co-amk-hub',
            dateTime: "25th October 2018, 0900", //warning: Currently of string type
            table: 5,
            pax: 4,
            rating: '3', //rating may be a null value
        },
        {
            resName: '4Fingers Crispy Chicken (Changi Airport T3)',
            resUrl: '4fingers-crispy-chicken-changi-airport-t3',
            dateTime: "22th October 2018, 0900", //warning: Currently of string type
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