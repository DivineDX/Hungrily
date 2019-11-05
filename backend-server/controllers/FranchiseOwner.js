/**
 * Returns the list of all restaurants that the Franchise currently owns
 */

const ReservationsData = require('../TempData/ReservationsData');

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
 * Returns an Array of Objects, whose key 'reservations' value is an array of reservations
 */

const viewAllReservations = (req, res, db) => {
    const { franchiseUserID } = req.body;
    res.status(200).json(
        [{
            resName: "Fish & Co. (AMK Hub)",
            resUrl: "fish-co-amk-hub",
            reservations: ReservationsData.data1
        },
        {
            resName: "Fish & Co. (Changi Airport T2)",
            resUrl: "fish-co-amk-hub",
            reservations: ReservationsData.data2
        },
        {
            resName: "Fish & Co. (Paragon)",
            resUrl: "fish-co-paragon",
            reservations: ReservationsData.data3
        }]);
}

/**
 * View all confirmed reservations for a *specific* restaurant
 * Omits reservations that are in the past
 */

const viewRestaurantReservations = (req, res, db) => {
    const { franchiseOwnerID, location } = req.body; //PK of Restaurant
    res.status(200).json(ReservationsData.data1);
}

//Other Routes for considerations: CRUD for Special Operating Hours, Food and Table

module.exports = {
    ownedRestaurants: ownedRestaurants,
    viewAllReservations: viewAllReservations,
    viewRestaurantReservations: viewRestaurantReservations
}