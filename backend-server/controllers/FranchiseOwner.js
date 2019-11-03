/**
 * Returns the list of all restaurants that the Franchise currently owns
 */
const ownedRestaurants = (req, res, db) => {
    const { franchiseOwnerID } = req.body;
    db.raw(`
        SELECT *
        FROM restaurant
        WHERE restaurant.userid = '${franchiseOwnerID}'
    `)
        .timeout(1000)
        .then(result => {
            res.status(200).json(result.rows.map(x => ({ //should rename some tables for easier reference
                name: x.store_name,
                area: x.area,
                cuisine: x.cuisine,
                openingHours: x.opening_hours,
                closingHours: x.closing_hours,
                price: 0,
                url: x.url,
                ratings: 0
            })));
        }).catch(err => res.status(400).json('Unable to Retrieve'));

}

/**
 * Check through all Restaurants that the FranchiseOwner owns, returns all reservations booked under all restaurants owned
 * Omits reservations that are in the past
 */
const viewAllReservations = (req, res, db) => {
    const { FranchiseName } = req.body;
}

const viewAllReservationsStub = (req, res, db) => {
    const { FranchiseName } = req.body;
    res.status(200).json(
        [{
            UserID: "Person1",
            Location: "AMK Hub",
            DateTime: "20th October 2018, 0900", //warning: Its a String now
            Table: 20,
            Pax: 2,
        },
        {
            UserID: "Person2",
            Location: "AMK Hub",
            DateTime: "25th October 2018, 0900", //warning: Its a String now
            Table: 2,
            Pax: 4,
        },
        {
            UserID: "Person3",
            Location: "Changi Airport T3",
            DateTime: "1st October 2018, 0900", //warning: Its a String now
            Table: 5,
            Pax: 2,
        }]);
}

/**
 * View all confirmed reservations for a specific restaurant
 * Omits reservations that are in the past
 */

const viewRestaurantReservations = (req, res, db) => {
    const { RestaurantName } = req.body;
}


const viewRestaurantReservationStub = (req, res, db) => {
    const { RestaurantName } = req.body;
    res.status(200).json(
        [{
            UserID: "PersonX",
            DateTime: "20th October 2018, 0900", //warning: Its a String now
            Table: 3,
            Pax: 2,
        },
        {
            UserID: "PersonY",
            DateTime: "25th October 2018, 0900", //warning: Its a String now
            Table: 7,
            Pax: 4,
        },
        {
            UserID: "PersonZ",
            DateTime: "1st October 2018, 0900", //warning: Its a String now
            Table: 10,
            Pax: 2,
        }]);
}

//Other Routes for considerations: CRUD for Special Operating Hours, Food and Table

module.exports = {
    ownedRestaurants: ownedRestaurants,
    viewAllReservations: viewAllReservationsStub,
    viewRestaurantReservations: viewRestaurantReservationStub
}