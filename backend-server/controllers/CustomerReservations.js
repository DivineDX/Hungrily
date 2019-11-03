/**
 * Check availablity of restaurant in that specific datetime
 * will return 3 results: 
 * 1) available: Literal meaning
 * 2) noSeats: No seats at that specific timing
 * 3) noDouble: Customer already has a reservation at another 
 */
const checkAvailability = (req, res, db) => {
    const {userID, franchiseName, resName, dateTime, pax} = req.body;
    console.log("checking availability", req.body);
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
 * Attempts to edit the datetime of an existing restaurant
 * Availability already beforehand
 */
const editReservation = (req, res, db) => {
    const {UserID, FranchiseName, RestaurantLocation, oldDateTime, newDateTime, Table} = req.body;
    res.status(200).json('Success'); //success if reservation is successfully edited and updated
}

/**
 * Cancels an existing reservation
 */
const cancelReservation = (req, res, db) => {
    const {UserID, FranchiseName, RestaurantLocation, DateTime, Table} = req.body;
    res.status(200).json('Success'); //success if successfully cancelled
}

/**
 * See all reservations that is booked by a Customer
 */
const seeCustomerReservations = (req, res, db) => {
    const {UserID} = req.body; 
    res.status(200).json(
        [{
            FranchisorName: "Fish & Co.", 
            Location: "AMK Hub",
            DateTime: "20th October 2018, 0900", //warning: Currently of string type
            Table: 3,
            Pax: 2,
        }, 
        {
            FranchisorName: "Fish & Co.", 
            Location: "AMK Hub",
            DateTime: "25th October 2018, 0900", //warning: Currently of string type
            Table: 5,
            Pax: 4,
        },
        {
            FranchisorName: "4Fingers Crispy Chicken", 
            Location: "Changi Airport T3",
            DateTime: "22th October 2018, 0900", //warning: Currently of string type
            Table: 3,
            Pax: 2,
        }]);
}


module.exports = {
    checkAvailability: checkAvailability,
    bookReservation: bookReservation,
    editReservation: editReservation,
    cancelReservation: cancelReservation,
    seeCustomerReservations: seeCustomerReservations,
}