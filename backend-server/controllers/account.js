const bcrypt = require('bcrypt-nodejs');

/**
 * Register an account for a CUSTOMER only.
 * Checks if UserID already exists, if it does rejects.
 * If not, insert into Users and Customers table
 * Return res.json(400) if userID (primary key) is already taken
 */
const registerCustomer = (req, res, db) => {
    const {name, userID, password} = req.body; //note: password not hashed, need to hash using Bcrypt

}

//Stub Function
const registerCustomerStub = (req, res, db) => {
    const {name, userID, password} = req.body;
    let hashedPw;
    bcrypt.hash(password, null, null, function(err, hash) {
        // Store hash in your password DB.
        hashedPw = hash;
        console.log(hashedPw);
    });
    res.status(200).json(userID); //returns userID after registration success
}

/**
 * Logins a user into the WebApp. Works for both Customer and FranchiseOwner.
 * Return res.json(400) if invalid credentials
 */
const loginUser = (req, res, db) => {
    const {userID, password} = req.body; //note: password not hashed, need to hash using Bcrypt

}

//Stub Function
const loginUserStub = (req, res, db) => {
    const {userID, password} = req.body;
    let hash;
    //Select and load hash from DB
    bcrypt.compare(password, hash, function(err, res) {
        // res is boolean
        console.log('res');
    });

    res.status(200).json({
        UserID: userID,
        Name: "John Doe", //returns either User Name or Name of the Franchise
        FranchiseOwner: true //false if account is just a customer
    }); 
}

module.exports = {
    registerCustomer: registerCustomerStub,
    loginUser: loginUserStub,
}