const getPoints = (req, res, db) => {
    const { userID } = req.body;
    // console.log(userID)
    const sql =
        `
    SELECT Customer.points
    FROM Customer 
    WHERE Customer.userid = '${userID}'
    LIMIT 1
    `
    db.raw(sql).timeout(1000)
        .then(resp => {
            // console.log(resp)
            const customerPoints = resp.rows[0].points;
            
            if (isNaN(customerPoints)) {
                res.status(400).json('fail');
            } else {
                res.status(200).json(customerPoints);
            }
        }).catch(err => {console.log(err);res.status(400).json('Unable to Retrieve')});
}


/**
 * POST: Return a list of all vouchers, together with a boolean that indicates whether the Customer can buy
 * based on the number of points that he possess
 */
const voucherList = (req, res, db) => {
    const { userID } = req.body;
    const sql =
    `
    SELECT Possible_voucher.Voucher_code,
    Possible_voucher.Cost,
    Possible_voucher.Discount,
    Possible_voucher.Description,
    (
        SELECT COUNT(*) 
        FROM
        Customer_voucher
        WHERE
        Customer_voucher.Voucher_code = Possible_voucher.Voucher_code
        AND Customer_voucher.userid = '${userID}'
    ) AS owned,
    EXISTS (
        SELECT * 
        FROM
        Customer
        WHERE
        Customer.Points >= Possible_voucher.cost
        AND Customer.userid = '${userID}'
    ) AS canBuy
    FROM Possible_voucher 
    `
    db.raw(sql).timeout(1000)
        .then(resp => {
            const customerVouchers = resp.rows.map(x=>(
                {
                    //name, cuisine, type and price
                    voucherName:x.voucher_code,
                    cost:x.cost,
                    discount:x.discount,
                    description:x.description,
                    owned:x.owned,
                    canBuy:x.canbuy
                }));
            res.status(200).json(customerVouchers);
        }).catch(err => {console.log(err);res.status(400).json('Unable to Retrieve')});
    // res.status(200).json([
    //     {
    //         voucherName: "HungriLOR",
    //         cost: 7, //points
    //         discount: 10, //percentage
    //         description: "Ready to be back for more!",
    //         owned: 2,
    //         canBuy: true
    //     },
    //     {
    //         voucherName: "HungriSIA",
    //         cost: 10, //points
    //         discount: 20, //percentage
    //         description: "Specially for those with a bottomless appetite",
    //         owned: 3,
    //         canBuy: false
    //     },
    //     {
    //         voucherName: "HungriLEH",
    //         cost: 15, //points
    //         discount: 30, //percentage
    //         description: "For our most loyal and always perma-hungri users!",
    //         owned: 0,
    //         available: false
    //     }
    // ])
}

/**
 * POST: Customer spends points to buy a voucher that he can spend/apply 
 * Inserts tuple into the "CustomerVouchers" table, Updates (Deducts) Points of Customers.
 */
const buyVoucher = (req, res, db) => {
    const { userID, voucherName } = req.body;
    // console.log( [userID, voucherName])
    const sql =
    `
    BEGIN;
    INSERT INTO Customer_voucher
    VALUES (
        '${voucherName}',
        '${userID}',
        false
    );

    UPDATE Customer
    SET Points = Points-(
        SELECT Possible_voucher.cost
        FROM Possible_voucher
        WHERE Possible_voucher.Voucher_code = '${voucherName}'
        LIMIT 1
    )
    WHERE Customer.UserID = '${userID}';
    COMMIT;
     `
    db.raw(sql).timeout(1000)
    .then(resp => {
        res.status(200).json('success');
    }).catch(err => {
        console.log(err);
        db.raw(`ROLLBACK;`).timeout(1000)
        .then(rollback => {
            // console.log("rollback sucess");
            res.status(400).json('Failed');
        }).catch(
            rollbackerr => {
                // console.log(rollbackerr);
                res.status(400).json('Failed');
            }
        )
    });
}

/**
 * PUT: Customer applies the voucher code on a reservation at checkout
 * Updates boolean isUsed of Voucher in CustomerVouchers table to true
 */
const useVoucher = (req, res, db) => {
    const { userID, voucherID } = req.body
    res.status(200).json('Success');
}

module.exports = {
    getPoints: getPoints,
    voucherList: voucherList,
    buyVoucher: buyVoucher,
    useVoucher: useVoucher
}