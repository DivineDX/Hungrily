/**
 * GET: See the list of all possible vouchers.
 * Vouchers are inserted into DB upon initialization 
 */
const listVouchers = (req, res, db) => {
    res.status(200).json([
        {
            Name: "HungriLOR",
            Cost: 7, //points
            Discount: 10, //percentage
            Description: "Ready to be back for more!"
        },
        {
            Name: "HungriSIA",
            Cost: 10, //points
            Discount: 20, //percentage
            Description: "Specially for those with a bottomless appetite"
        },
        {
            Name: "HungriLEH",
            Cost: 15, //points
            Discount: 30, //percentage
            Description: "For our most loyal and always perma-hungri users!"
        }
    ])
}

/**
 * POST: Return list of vouchers that a customer is eligible to purchase using points
 */
const availForPurchase = (req, res, db) => {
    const {userID} = req.body;
    //Stub: DB checks for points that a customer has, then filters and returns the voucher list but with a boolean
    const userPoints = "8"; 
    res.status(200).json([
        {
            Name: "HungriLOR",
            Cost: 7, //points
            Discount: 10, //percentage
            Description: "Ready to be back for more!",
            available: true
        },
        {
            Name: "HungriSIA",
            Cost: 10, //points
            Discount: 20, //percentage
            Description: "Specially for those with a bottomless appetite",
            available: false
        },
        {
            Name: "HungriLEH",
            Cost: 15, //points
            Discount: 30, //percentage
            Description: "For our most loyal and always perma-hungri users!",
            available: false
        }
    ])
}
/**
 * Returns list of specific Customer's owned vouchers
 * Checks through the "CustomerVouchers" Table joined with Vouchers Table
 */
const seeOwnedVouchers = (req, res, db) => {
    const {userID} = req.body;
    res.status(200).json([
        {
            Name: "HungriLOR",
            VoucherSerial: 003,
            Discount: 10, //percentage
        },
        {
            Name: "HungriLEH",
            VoucherSerial: 010,
            Discount: 30, //percentage
        }
    ])
}


/**
 * POST: Customer spends points to buy a voucher that he can spend/apply 
 * Inserts tuple into the "CustomerVouchers" table, Updates (Deducts) Points of Customers.
 */
const buyVoucher = (req, res, db) => {
    const {userID} = req.body;
    res.status(200).json('Success');
}

/**
 * PUT: Customer applies the voucher code on a reservation at checkout
 * Updates boolean isUsed of Voucher in CustomerVouchers table to true
 */
const useVoucher = (req, res, db) => {
    const {userID, voucherID} = req.body
    res.status(200).json('Success');
}

module.exports = {
    listVouchers: listVouchers,
    availForPurchase: availForPurchase,
    seeOwnedVouchers: seeOwnedVouchers,
    buyVoucher: buyVoucher,
    useVoucher: useVoucher
}