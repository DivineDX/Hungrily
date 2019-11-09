/**
 * Check availablity of restaurant in that specific datetime
 * will return 3 results: 
 * 1) available: Literal meaning
 * 2) noSeats: No seats at that specific timing
 * 3) noDouble: Customer already has a reservation at another 
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
    
    db.raw(sql).timeout(1000)
    .then(results => {
        res.status(200).json('available');
    }).catch(err => { 
        console.log(err.hint)
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
        if(err.hint === "Shop not open Normal" || err.hint === "Shop not open Special") {
            res.status(400).json('notOpen');
        } else if(err.hint === 'no available tables') {
            res.status(400).json()
        }
        res.status(400).json('err')

    });
}

/**
 * Books a Reservation. Assumed to have checked availability beforehand
 */
const bookReservation = (req, res, db) => {
    const {userID, franchiseName, resName, dateTime, pax} = req.body;
    // console.log("hello")
    res.status(200).json('available');
}

/**
 * DELETE: Cancels an existing reservation
 */
const cancelReservation = (req, res, db) => {
    const {userID, location, resName, dateTime, table, resUrl} = req.body;
    const parsedDAte =new Date(dateTime)
    // console.log(parsedDAte)
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

    // `
    // SELECT * FROM Reservation ,Restaurant
    // WHERE Reservation.location = Restaurant.location
    // AND Reservation.Restaurant_UserID = Restaurant.UserID
    // AND Reservation.Customer_UserID = '${userID}'
    // AND Reservation.location = '${location}'
    // AND Restaurant.url = '${resUrl}'
    // AND Reservation.dateTime = '${dateTime}'
    // AND Reservation.TableNum = '${table}'
    // `
    // console.log([userID, location, resName, dateTime, table, resUrl])
    db.raw(sql).timeout(1000)
    .then(results => {
        // console.log(results)
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
    db.raw(sql).timeout(1000)
    .then(restaurants => {
        //console.log(restaurants.rows)
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

    // res.status(200).json(
    //     [{
    //         resName: 'Major 99', 
    //         location: '4190 Ang Mo Kio Ave 6 #02-02 Broadway Plaza Singapore (569841)',
    //         resUrl: 'major-99',
    //         dateTime: new Date('2019-12-17T15:25:00'), //SG Time
    //         table: 3,
    //         pax: 2,
    //         rating: null, //rating may be a null value
    //     }, 
    //     {
    //         resName: 'Fish & Co. (AMK Hub)',
    //         location: '53 Ang Mo Kio Avenue 3 #02-03 AMK Hub Singapore (569933)',
    //         resUrl: 'fish-co-amk-hub',
    //         dateTime: new Date('2019-10-11T12:30:00'), //SG Time
    //         table: 5,
    //         pax: 4,
    //         rating: '3', //rating may be a null value
    //     },
    //     {
    //         resName: '4Fingers Crispy Chicken (Changi Airport T3)',
    //         location: '65 Airport Boulevard #B2-02 Changi Airport Terminal 3 Singapore (819663)',
    //         resUrl: '4fingers-crispy-chicken-changi-airport-t3',
    //         dateTime: new Date('2019-11-05T18:00:00'), //SG Time
    //         table: 3,
    //         pax: 2,
    //         rating: '5', //rating may be a null value
    //     },
    // ]);
}


module.exports = {
    checkAvailability: checkAvailability,
    bookReservation: bookReservation,
    cancelReservation: cancelReservation,
    seeCustomerReservations: seeCustomerReservations,
}