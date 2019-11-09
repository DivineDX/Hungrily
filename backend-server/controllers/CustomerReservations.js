/**
 * Check availablity of restaurant in that specific datetime
 * will return 4 results: 
 * 1) available: Literal meaning
 * 2) noSeats: No seats at that specific timing
 * 3) noDouble: Customer already has a reservation at another 
 * 4) notOpen: Restaurant not open in those opening hours
 */ // just use this for book reservations
const checkAvailability = (req, res, db) => {
    const {userID, location,franchisorId, resUrl, dateTime, pax} = req.body;
    const sql =
    `
    INSERT INTO Reservation
    (Customer_UserID,TableNum,Location,Restaurant_UserID,Pax,DateTime,Rating)
    VALUES
    ('${userID}',NULL,'${location}','${franchisorId}',${pax},'${dateTime}',NULL)
    `
    
    db.raw(sql).timeout(5000)
    .then(results => {
        res.status(200).json('available');
    }).catch(err => { 
        switch(err.hint) {
            case "Shop not open Normal":
                res.status(400).json('notOpen');
                break;
            case "Shop not open Special":
                res.status(400).json('notOpen');
                break;
            case "no available tables":
                res.status(400).json('noSeats');
                break;
            case "Doublebooked":
                res.status(400).json('noDouble');
                break;
            default:
                res.status(400).json(err);
                break;
        }

    });
}


/**
 * edit reservations of restaurant in that specific datetime
 * will return 3 results: 
 * 1) available: Literal meaning
 * 2) noSeats: No seats at new timing
 * 3) noDouble: Customer already has a reservation at another 
 */ // just use this for book reservations
 const editReservation = (req, res, db) => {
    const {userID, location,franchisorId, resUrl, dateTime, pax,oldDateTime,oldTableNumber } = req.body;
    const deleteandadd = 
    `
    BEGIN;

    DELETE FROM Reservation
    WHERE
    Reservation.Customer_UserID = '${userID}'
    AND Reservation.location = '${location}'
    AND Reservation.Restaurant_UserID = '${franchisorId}'
    AND Reservation.dateTime = '${oldDateTime}'
    AND Reservation.tablenum = '${oldTableNumber}';

    INSERT INTO Reservation
    (Customer_UserID,TableNum,Location,Restaurant_UserID,Pax,DateTime,Rating)
    VALUES
    ('${userID}',NULL,'${location}','${franchisorId}',${pax},'${dateTime}',NULL);
    COMMIT;
     `
    db.raw(deleteandadd).timeout(5000)
    .then(results => {
        res.status(200).json('available');
    }).catch(err => { 
        console.log(err)
        var errtype = err
        switch(err.hint) {
            case "Shop not open Normal":
                errtype = 'notOpen'
                break;
            case "Shop not open Special":
                errtype = 'notOpen'
                break;
            case "no available tables":
                errtype = 'noSeats'
                break;
            case "Doublebooked":
                errtype = 'noDouble'
                break;
            default:
                errtype = err
                break;
        }
        db.raw(`ROLLBACK;`).timeout(5000)
        .then(rollback => {
            res.status(400).json(errtype);
        }).catch(
            rollbackerr => {
                errtype = rollbackerr
                res.status(400).json(errtype);
            }
        )
    });
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
    const {userID, location, resName, dateTime, table, resUrl} = req.body;
    const parsedDAte =new Date(dateTime)
    const sql =
    `
    DELETE FROM Reservation
    USING Restaurant
    WHERE
    Reservation.Customer_UserID = '${userID}'
    AND Reservation.location = '${location}'
    AND Restaurant.url = '${resUrl}'
    AND Reservation.dateTime = '${dateTime}'
    AND Reservation.TableNum = '${table}'
    `

    db.raw(sql).timeout(5000)
    .then(results => {
        res.status(200).json('Success'); //success if successfully cancelled
    }).catch(err => { console.log(err);res.status(400).json('Unable to Retrieve')});
    
}

/**
 * POST: See all the Reservations that a Customer has booked
 * Returns Restaurant.resName (currently store_name), Restaurant.location, Rstaurant.url, Reservation.dateTime, 
 * Reservation.table, Reservation.pax, Ratings.rating
 * See all reservations that is booked by a Customer
 */
const seeCustomerReservations = (req, res, db) => {
    const {userID} = req.body;     
    const sql =
    `
    SELECT 
    Restaurant.store_Name AS store_Name,
    Restaurant.location AS location,
    Restaurant.url AS url,
    Restaurant.UserID AS UserID,
    Reservation.dateTime AS dateTime,
    Reservation.tableNum AS tableNum,
    Reservation.pax AS pax,
    Reservation.rating AS rating
    FROM
    Restaurant INNER JOIN Reservation
    ON Reservation.location = Restaurant.location
    AND Reservation.Restaurant_UserID = Restaurant.UserID
    WHERE Reservation.Customer_UserID = '${userID}'
    ORDER BY
    Reservation.dateTime
    `
    //(Customer_UserID, Restaurant_UserID, TableNum, Location, DateTime),
    db.raw(sql).timeout(5000)
    .then(restaurants => {
        res.status(200).json(restaurants.rows.map(x=>(
            {
                resName:x.store_name,
                location:x.location,
                resUrl:x.url,
                resid: x.userid,
                dateTime:x.datetime,
                table:x.tablenum,
                pax:x.pax,
                rating:x.rating
            }
        )))
    }).catch(err =>  {console.log(err);res.status(400).json('Unable to Retrieve')});
}


module.exports = {
    checkAvailability: checkAvailability,
    bookReservation: bookReservation,
    cancelReservation: cancelReservation,
    seeCustomerReservations: seeCustomerReservations,
    editReservation:editReservation
}