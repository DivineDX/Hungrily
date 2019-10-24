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
    res.status(200).json({
        UserID: userID,
        Name: "Fish & Co", //returns either User Name or Name of the Franchise
        FranchiseOwner: true //false if account is just a customer
    }); 
}

module.exports = {
    registerCustomer: registerCustomerStub,
    loginUser: loginUserStub,
}