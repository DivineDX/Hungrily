/**
 * GET: View all reviews given for a particular restaurant
 * Join Reservation with Reservations, filter reservations whose rating is null
 */
const viewResReviews = (req, res, db) => {
    const franchisor = req.params.franchisor;
    const location = req.params.location;
    const sql = 
    `
    SELECT
    Customer.Name AS reviewer,
    Reservation.Rating AS rating
    Reservation INNER JOIN Customer
    ON Reservation.Customer_UserID = Customer.UserID
    WHERE Reservation.Restaurant_UserID = '${franchisor}'
    AND Reservation.location ='${location}'
    `
    db.raw(sql)
    .timeout(5000)
    .then(result => {
        res.status(200).json(result.rows.map(x => ({ //should rename some tables for easier reference
            Reviewer: x.reviewer, 
            Rating: x.rating
        })));
    }).catch(err => res.status(400).json('Unable to Retrieve'));
}

/**
 * POST: Customer posts for a rating for a past Reservation
 */
const postRating = (req, res, db) => {
    //PRIMARY KEY (Customer_UserID, Restaurant_UserID, TableNum, Location, DateTime),
    const {userID, location, resid, dateTime, table, rating} = req.body;
    const sql = 
    `
    UPDATE
    Reservation
    SET
    rating = '${rating}'
    WHERE 
    Reservation.Customer_UserID = '${userID}'
    AND Reservation.location ='${location}'
    AND Reservation.restaurant_userid ='${resid}'
    AND Reservation.tablenum ='${table}'
    AND Reservation.datetime ='${dateTime}'
    `
    db.raw(sql)
    .timeout(5000)
    .then(result => {
        res.status(200).json('Success')
    }).catch(err => {
        console.log(err)
        res.status(400).json('Unable to Retrieve')});
    //res.status(200).json('Success');
}

module.exports = {
    viewResReviews: viewResReviews,
    postReview: postRating
    // customerReviews: customerReviews
}