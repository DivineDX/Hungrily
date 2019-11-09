/**
 * POST: Gets the user current points available for spending
 */
const getPoints = (req, res, db) => {
    const { userID } = req.body;
    const sql =
    `
    SELECT Customer.points
    FROM Customer 
    WHERE Customer.userid = '${userID}'
    LIMIT 1
    `

    db.raw(sql).timeout(3000)
        .then(resp => {
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
        AND Customer_voucher.is_used = false
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

    db.raw(sql).timeout(3000)
        .then(resp => {
            const customerVouchers = resp.rows.map(x=>({
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
}

/**
 * POST: List of Vouchers that the Customer can use during Reservation Booking, based on its 
 * current owned list
 */
const voucherUseList = (req, res, db) => {
    const {userID} = req.body;
    const sql = 
    `
    SELECT DISTINCT Customer_voucher.Voucher_code, Count(*)
    FROM Customer_voucher
    WHERE 
    Customer_voucher.userid = '${userID}'
    AND
    Customer_voucher.is_used = FALSE
    GROUP BY Customer_voucher.Voucher_code
    `
    db.raw(sql).timeout(1000)
    .then(resp => {
        res.status(200).json(resp.rows);
    }).catch(err => {
        console.log(err);
        res.status(400).json('Unable to Retrieve')
    });
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
            res.status(400).json('Failed');
        }).catch(
            rollbackerr => {
                res.status(400).json('Failed');
            }
        )
    });
}

/**
 * PUT: Customer applies the voucher code on a reservation during bookean
 * Updates boolean isUsed of Voucher in CustomerVouchers table to true
 */
const useVoucher = (req, res, db) => {
    const { userID, voucherCode } = req.body
    const sql = 
    `
    WITH cte AS (
        SELECT * 
        FROM Customer_voucher
        WHERE userid = '${userID}' 
        AND voucher_code = '${voucherCode}'
        AND is_used = FALSE
        LIMIT 1
        )
    
    UPDATE Customer_voucher
    SET is_used = TRUE
    FROM cte
    WHERE cte.serialnum = Customer_voucher.serialnum
    RETURNING Customer_voucher.voucher_code, Customer_voucher.userid, Customer_voucher.is_used
    `;

    db.raw(sql).timeout(2000)
    .then(resp => {
        const voucherObj = resp.rows[0];
        if(voucherObj.is_used && voucherObj.voucher_code == voucherCode && voucherObj.userid == userID) {
            res.status(200).json('success');
        } else {
            res.status(400).json('fail');
        }
    }).catch(err => {
        console.log(err);
        res.status(400).json('fail')
    });
}

module.exports = {
    getPoints: getPoints,
    voucherList: voucherList,
    voucherUseList: voucherUseList,
    buyVoucher: buyVoucher,
    useVoucher: useVoucher
}