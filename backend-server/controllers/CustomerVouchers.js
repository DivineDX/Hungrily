const getPoints = (req, res, db) => {
    const { userID } = req.body;

    const sql =
        `
    SELECT Customer.points
    FROM Customer 
    WHERE Customer.userid = '${userID}'
    LIMIT 1
    `
    db.raw(sql).timeout(1000)
        .then(resp => {
            const customerPoints = resp.rows[0].points;
            if (isNaN(customerPoints)) {
                res.status(400).json('fail');
            } else {
                res.status(200).json(customerPoints);
            }
        }).catch(err => res.status(400).json('Unable to Retrieve'));
}


/**
 * POST: Return a list of all vouchers, together with a boolean that indicates whether the Customer can buy
 * based on the number of points that he possess
 */
const voucherList = (req, res, db) => {
    const { userID } = req.body;
    res.status(200).json([
        {
            voucherName: "HungriLOR",
            cost: 7, //points
            discount: 10, //percentage
            description: "Ready to be back for more!",
            owned: 2,
            canBuy: true
        },
        {
            voucherName: "HungriSIA",
            cost: 10, //points
            discount: 20, //percentage
            description: "Specially for those with a bottomless appetite",
            owned: 3,
            canBuy: false
        },
        {
            voucherName: "HungriLEH",
            cost: 15, //points
            discount: 30, //percentage
            description: "For our most loyal and always perma-hungri users!",
            owned: 0,
            available: false
        }
    ])
}

/**
 * POST: Customer spends points to buy a voucher that he can spend/apply 
 * Inserts tuple into the "CustomerVouchers" table, Updates (Deducts) Points of Customers.
 */
const buyVoucher = (req, res, db) => {
    const { userID, voucherName } = req.body;
    res.status(200).json('success'); //return failed if otherwise
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