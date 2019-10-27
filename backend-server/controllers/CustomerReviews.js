/**
 * GET: View all reviews given for a particular restaurant
 * Join Reservation with Reservations, filtert reservations whose rating is null
 */
const viewResReviews = (req, res, db) => {
    const franchisor = req.params.franchisor;
    const location = req.params.location;

    res.status(200).json([
        {
            Reviewer: "John Doe", //Customer.name
            Rating: 5, //max 5
        },
        {
            Reviewer: "Jane Doe", //Customer.name
            Rating: 3, //max 5
        },
        {
            Reviewer: "James Bond", //Customer.name
            Rating: 2, //max 5
        },
    ])
}

/**
 * POST: Reviews and give a rating for a given Reservation
 */
const postReview = (req, res, db) => {
    const {userID, franchisor, location, datetime, rating} = req.body; //datetime is from Reservation, used to identify resv it is associating the rating with
    res.status(200).json('Success');
}

module.exports = {
    viewResReviews: viewResReviews,
    postReview: postReview
    // customerReviews: customerReviews
}