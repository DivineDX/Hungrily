/**
 * Returns the list of all restaurants that the Franchise currently owns
 */

const ReservationsData = require('../TempData/ReservationsData');

const ownedRestaurants = (req, res, db) => {
    const { franchiseOwnerID } = req.body;
    const sql = 
    `
            SELECT distinct Restaurant.Store_Name, Restaurant.Location, Restaurant.Capacity, Restaurant.Area, Restaurant.Opening_hours, Restaurant.Closing_hours,
            FranchiseOwner.FNAME AS FranchisorName,
            Restaurant.url, 
                (
                SELECT string_agg( DISTINCT Food.Cuisine,', ') AS c
                FROM Food
                WHERE Food.Location = Restaurant.Location
                AND Food.UserID = Restaurant.UserID
                ) AS cuisine,
                (
                    SELECT ROUND(CAST(AVG(Food.Price) as numeric), 2) AS c
                    FROM Food
                    WHERE Food.Location = Restaurant.Location
                    AND Food.UserID = Restaurant.UserID
                    ) AS price
            FROM Restaurant INNER JOIN Food
            ON Food.Location = Restaurant.Location
            AND Food.UserID = Restaurant.UserID
            INNER JOIN FranchiseOwner
            ON FranchiseOwner.UserID = Restaurant.UserID
            WHERE FranchiseOwner.UserID = '${franchiseOwnerID}'
            GROUP BY Restaurant.UserID,Restaurant.Store_Name, Restaurant.Location, Restaurant.Capacity, Restaurant.Area, Restaurant.Opening_hours, Restaurant.Closing_hours, FranchiseOwner.FNAME, Restaurant.url
            `
    db.raw(sql)
        .timeout(1000)
        .then(result => {
            res.status(200).json(result.rows.map(x => ({ //should rename some tables for easier reference
                name: x.store_name,
                area: x.area,
                cuisine: x.cuisine,
                openingHours: x.opening_hours,
                closingHours: x.closing_hours,
                price: '~$'+x.price,
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
    console.log(req.body)
    const sql = 
    `
    SELECT
    Restaurant.Store_Name AS store_name,
    Restaurant.url AS url,
    Reservation.Customer_UserID AS customer_userid,
    Reservation.TableNum AS tablenum,
    Reservation.pax AS pax,
    Reservation.dateTime AS dateTime,
    Reservation.Location AS location,
    Reservation.Restaurant_UserID AS restaurant_userid
    FROM
    Restaurant INNER JOIN Reservation
    ON Reservation.location = Restaurant.location
    AND Reservation.Restaurant_UserID = Restaurant.UserID
    WHERE Reservation.Restaurant_UserID = '${franchiseUserID}'
    `

    // { store_name: 'Deandre Subsistence doughtnut shop',
    // url: 'Deandre-Subsistence-doughtnut-shop4143',
    // customer_userid: 'EllaMathieson27',
    // tablenum: 2,
    // pax: 2,
    // datetime: 2019-11-23T09:00:00.000Z },

    // resName: x.store_name,
    // resUrl: x.area,
    // reservations: {
    //     userID: x.customer_userid, 
    //     table: x.tablenum,
    //     pax: x.pax,
    //     dateTime: x.dateTime
    // }

    db.raw(sql)
    .timeout(1000)
    .then(result => {
        dict = {}
        console.log(result.rows)
        const a = result.rows.map(x =>{
            if (x.url in dict){
                dict[x.url].reservations.push({
                    userID: x.customer_userid, 
                    table: x.tablenum,
                    pax: x.pax,
                    dateTime: x.datetime,
                    location:x.location,
                    Restaurant_UserID:x.restaurant_userid
                })
            }
            else{
                dict[x.url] = {
                    resName: x.store_name,
                    resUrl: x.url,
                    reservations: [{
                        userID: x.customer_userid, 
                        table: x.tablenum,
                        pax: x.pax,
                        dateTime: x.datetime,
                        location:x.location,
                        Restaurant_UserID:x.restaurant_userid
                    }]
                }
            }
        })
        console.log(Object.values(dict));
        res.status(200).json(Object.values(dict));
    }).catch(err => {console.log(err);res.status(400).json('Unable to Retrieve')});
    // res.status(200).json(
    //     [{
    //         resName: "Fish & Co. (AMK Hub)",
    //         resUrl: "fish-co-amk-hub",
    //         reservations: ReservationsData.data1
    //     },
    //     {
    //         resName: "Fish & Co. (Changi Airport T2)",
    //         resUrl: "fish-co-amk-hub",
    //         reservations: ReservationsData.data2
    //     },
    //     {
    //         resName: "Fish & Co. (Paragon)",
    //         resUrl: "fish-co-paragon",
    //         reservations: ReservationsData.data3
    //     }]);
}

/**
 * View all confirmed reservations for a *specific* restaurant
 * Omits reservations that are in the past
 */

const viewRestaurantReservations = (req, res, db) => {
    const { franchiseOwnerID, location } = req.body; //PK of Restaurant
    const sql = 
    `
    SELECT
    Reservation.Customer_UserID AS customer_userid,
    Reservation.TableNum AS tablenum,
    Reservation.pax AS pax,
    Reservation.dateTime AS dateTime
    Restaurant INNER JOIN Reservation
    ON Reservation.location = Restaurant.location
    AND Reservation.Restaurant_UserID = Restaurant.UserID
    WHERE Reservation.Restaurant_UserID = '${franchiseOwnerID}'
    AND Reservation.location = '${location}'
    `
    db.raw(sql)
    .timeout(1000)
    .then(result => {
        res.status(200).json(result.rows.map(x => ({ //should rename some tables for easier reference
                userID: x.customer_userid, 
                table: x.tablenum,
                pax: x.pax,
                dateTime: x.dateTime
        })));
    }).catch(err => res.status(400).json('Unable to Retrieve'));
    //res.status(200).json(ReservationsData.data1);
}

//Other Routes for considerations: CRUD for Special Operating Hours, Food and Table

module.exports = {
    ownedRestaurants: ownedRestaurants,
    viewAllReservations: viewAllReservations,
    viewRestaurantReservations: viewRestaurantReservations
}