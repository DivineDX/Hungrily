const UNIQUE_ERROR_CODE =23505

const bcrypt = require('bcrypt-nodejs');

/**
 * Register an account for a CUSTOMER only.
 * Checks if UserID already exists, if it does rejects.
 * If not, insert into Users and Customers table
 * Return res.json(400) if userID (primary key) is already taken
 */

const registerCustomer = (req, res, db) => {
    const {name, userID, password} = req.body;
    let hashedPw;
    bcrypt.hash(password, null, null, function(err, hash) {
        // Store hash in your password DB.
        if (err){
            res.status(400).json('Hashing Err')
            return
        }
        hashedPw = hash;
        const sql =
        `
        INSERT INTO Account
        VALUES ('${userID}','${hashedPw}');
        INSERT INTO Customer
        VALUES ('${userID}','${name}',0);
        `
        db.raw(sql).timeout(5000)
            .then(c => {
                res.status(200).json(userID);
            }).catch(err =>  {
                if (err.code == UNIQUE_ERROR_CODE){
                    res.status(400).json('Username Already Taken')
                }
                else{
                    res.status(400).json('Unknown error: ' + err.code)
                }
            });
    });
 //returns userID after registration success
}

/**
 * Logins a user into the WebApp. Works for both Customer and FranchiseOwner.
 * Return res.json(400) if invalid credentials
 */
const loginUser = (req, res, db) => {
    const {userID, password} = req.body;
    const sql =
    `
    SELECT Account.UserID, Account.Password , Customer.Name, FranchiseOwner.FNAME
    FROM Account LEFT OUTER JOIN Customer
    ON Account.UserID = Customer.UserID
    LEFT OUTER JOIN FranchiseOwner
    ON Account.UserID = FranchiseOwner.UserID
    WHERE Account.UserID = '${userID}'
    `
    db.raw(sql).timeout(5000)
    .then(x=>{
        if (x.rowCount <= 0){
            res.status(400).json("No such user")
            return
        }
        bcrypt.compare(password, x.rows[0].password, function(err, isCorrect) {
            if (err){
                console.log(err)
                res.status(400).json('Hashing Err')
                return
            }
            if (isCorrect) {
                res.status(200).json({
                    userID: userID,
                    name: x.rows[0].name == null? x.rows[0].fname : x.rows[0].name,
                    franchiseOwner: (x.rows[0].name == null)
                });
            }
            else{
                res.status(400).json("incorrect password");
            }
        });
    }).catch( err =>  res.status(400).json("Unable to Retrieve" ))
}

module.exports = {
    registerCustomer: registerCustomer,
    loginUser: loginUser,
}