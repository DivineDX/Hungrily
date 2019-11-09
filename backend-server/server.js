const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

//import controllers
const test = require('./controllers/test');
const retrieve = require('./controllers/Retrieve');
const account = require('./controllers/account');
const franchiseOwner = require('./controllers/FranchiseOwner');
const customerReservations = require('./controllers/CustomerReservations');
const customerVouchers = require('./controllers/CustomerVouchers');
const customerReviews = require('./controllers/CustomerReviews');

const urls = require('./config/urls');
const db = require('./config/database')
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => { test.test(req, res) });

//For use by all users
app.get('/cuisines', (req, res) => retrieve.getAllCuisines(req, res, db));
app.get('/areas', (req, res) => retrieve.getAllAreas(req, res, db));
app.get('/franchisors', (req, res) => retrieve.getAllFranchise(req, res, db)); //res names only
app.get('/resData', (req, res) => retrieve.getAllRestaurants(req, res, db)); //data of all restaurants
app.get('/restaurant/:name', (req, res) => retrieve.getRestaurant(req, res, db));
app.get('/restaurantSpecialHrs/:name', (req, res) => retrieve.getRestaurantSpecialOpHrs(req, res, db));
app.get('/restaurantmenu/:name', (req, res) => retrieve.getRestaurantMenu(req, res, db));
app.post('/search', (req, res) => retrieve.findRestaurant(req, res, db));

//Account Registration and Login
app.post('/register', (req, res) => account.registerCustomer(req, res, db));
app.post('/login', (req, res) => account.loginUser(req, res, db));

//Only used by Franchise Owner
app.post('/ownedRestaurants', (req, res) => franchiseOwner.ownedRestaurants(req, res, db));
app.post('/viewAllReservations', (req, res) => franchiseOwner.viewAllReservations(req, res, db));
app.post('/viewRestaurantReservations', (req, res) => franchiseOwner.viewRestaurantReservations(req, res, db));

//Customer Reservations
app.post('/resvAvailability', (req, res) => customerReservations.checkAvailability(req, res, db));
app.post('/bookResv', (req, res) => customerReservations.checkAvailability(req, res, db));
app.delete('/cancelResv', (req, res) => customerReservations.cancelReservation(req, res, db));
app.post('/seeMyResv', (req, res) => customerReservations.seeCustomerReservations(req, res, db));

//Customer Vouchers
app.post('/userPoints', (req, res) => customerVouchers.getPoints(req, res, db));
app.post('/voucherList', (req, res) => customerVouchers.voucherList(req, res, db));
app.post('/voucherUseList', (req, res) => customerVouchers.voucherUseList(req, res, db));
app.post('/buyVoucher', (req, res) => customerVouchers.buyVoucher(req, res, db));
app.put('/useVoucher', (req, res) => customerVouchers.useVoucher(req, res, db));

//Customer Reviews
app.get('/review/:franchisor/:location', (req, res) => customerReviews.viewResReviews(req, res, db));
app.post('/giveReview', (req, res) => customerReviews.postReview(req, res, db));

app.listen(process.env.PORT || 3001);