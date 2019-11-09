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
                ) AS price,
                (
                SELECT ROUND(CAST(AVG(Reservation.Rating) as numeric), 2) AS r
                FROM Reservation
                WHERE Reservation.Location = Restaurant.Location
                AND Reservation.Restaurant_UserID = Restaurant.UserID
                AND Reservation.Rating IS NOT NULL
                ) AS rating
            FROM Restaurant INNER JOIN Food
            ON Food.Location = Restaurant.Location
            AND Food.UserID = Restaurant.UserID
            INNER JOIN FranchiseOwner
            ON FranchiseOwner.UserID = Restaurant.UserID
            WHERE FranchiseOwner.UserID = '${franchiseOwnerID}'
            GROUP BY Restaurant.UserID,Restaurant.Store_Name, Restaurant.Location, Restaurant.Capacity, Restaurant.Area, Restaurant.Opening_hours, Restaurant.Closing_hours, FranchiseOwner.FNAME, Restaurant.url
            `
    db.raw(sql)
        .timeout(5000)
        .then(result => {
            res.status(200).json(result.rows.map(x => ({ //should rename some tables for easier reference
                name: x.store_name,
                area: x.area,
                cuisine: x.cuisine,
                openingHours: x.opening_hours,
                closingHours: x.closing_hours,
                price: '~$'+x.price,
                url: x.url,
                ratings:x.rating == null ? 'Unrated' : x.rating 
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

    db.raw(sql)
    .timeout(5000)
    .then(result => {
        dict = {}
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
        res.status(200).json(Object.values(dict));
    }).catch(err => {console.log(err);res.status(400).json('Unable to Retrieve')});
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
    .timeout(5000)
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

const getmostloyal = (req, res, db) => {
    const { franchiseOwnerID, location ,name} = req.body; //PK of Restaurant 
    const getloyal = 
    `
        With X AS(
        SELECT DISTINCT rv.customer_userid, rv.Location,rv.Restaurant_UserID,
        (
            SELECT COUNT(*) FROM reservation as res
            WHERE
            res.customer_userid = rv.customer_userid
        ) as totalreservations,
        (
            SELECT  COUNT(*) FROM 
            reservation as res
            INNER JOIN Restaurant as rt
            ON res.Location = rt.location
            AND res.Restaurant_UserID = rt.userID
            WHERE
            res.customer_userid = rv.customer_userid
            AND rt.url = '${name}'
        ) as thisres,
        CAST((
            SELECT COUNT(*) FROM reservation as res
            INNER JOIN Restaurant as rt
            ON res.Location = rt.location
            AND res.Restaurant_UserID = rt.userID
            WHERE
            res.customer_userid = rv.customer_userid
            AND rt.url ='${name}'
        ) AS decimal(8,2))
        /
        CAST((
            SELECT COUNT(*) FROM reservation as res
            WHERE
            res.customer_userid = rv.customer_userid
        ) AS decimal(8,2)) as percent
        FROM
        Reservation as rv inner join Restaurant as rs
        ON rv.Location = rs.Location
        AND rv.Restaurant_UserID = rs.UserID
        WHERE 
        rs.url ='${name}'
        ORDER BY
        rv.location
    )
    SELECT customer_userid, location, restaurant_userid, thisres, ROUND(percent,2)*100 as percent
    FROM X
    WHERE
    x.percent * x.thisres >= ALL (
        SELECT b.percent * b.thisres FROM X as b
    )
    LIMIT 1
    `
    db.raw(getloyal)
    .timeout(5000)
    .then(result => {
        if (result.rows.length > 0 ){
            const ans = result.rows.map(x => ({ //should rename some tables for easier reference
                userID: x.customer_userid, 
                location: x.location,
                restaurant_userid: x.restaurant_userid,
                numBookings: x.thisres,
                percentBookings:x.percent 
            }))
            res.status(200).json(ans[0])
        }
        else {
            res.status(400).json('Unable to Retrieve')
        }


    }).catch(err => {
        console.log(err)
        res.status(400).json('Unable to Retrieve')});
    //res.status(200).json(ReservationsData.data1);
}



module.exports = {
    ownedRestaurants: ownedRestaurants,
    viewAllReservations: viewAllReservations,
    viewRestaurantReservations: viewRestaurantReservations,
    getmostloyal:getmostloyal
}

