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

const urls = require('./config/urls');
const db = require('./config/database')
const queries = require('./TempData/Queries');
const RestaurantData = require('./TempData/RestaurantData');

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => { test.test(req, res) });

//For use by all users
app.get('/cuisines', (req, res) => retrieve.getAllCuisines(req, res, db));
app.get('/areas', (req, res) => retrieve.getAllAreas(req, res, db));
app.get('/franchisors', (req, res) => retrieve.getAllFranchise(req, res, db)); //res names only
app.get('/resData', (req, res) => retrieve.getAllRestaurants(req, res, db)); //data of all restaurants
app.get('/restaurant/:name', (req, res) => retrieve.getRestaurant(req, res, db));
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
app.put('/editResv', (req, res) => customerReservations.editReservation(req, res, db));
app.delete('/cancelResv', (req, res) => customerReservations.cancelReservation(req, res, db));
app.post('/seeMyResv', (req, res) => customerReservations.seeCustomerReservations(req, res, db));


app.listen(process.env.PORT || 3001);