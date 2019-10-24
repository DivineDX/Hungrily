const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

//import controllers
const test = require('./controllers/test');
const customerRetrieve = require('./controllers/CustomerRetrieve');
const account = require('./controllers/account');

const urls = require('./config/urls');
const db = require('./config/database')
const queries = require('./TempData/Queries');
const RestaurantData = require('./TempData/RestaurantData');

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => { test.test(req, res) });
app.get('/cuisines', (req, res) => customerRetrieve.getAllCuisines(req, res, db));
app.get('/areas', (req, res) => customerRetrieve.getAllAreas(req, res, db));
app.get('/franchisors', (req, res) => customerRetrieve.getAllFranchise(req, res, db)); //res names only
app.get('/resData', (req, res) => customerRetrieve.getAllRestaurants(req, res, db)); //data of all restaurants
app.get('/restaurant/:name', (req, res) => customerRetrieve.getRestaurant(req, res, db));
app.post('/search', (req, res) => customerRetrieve.findRestaurant(req, res, db));
app.post('/register', (req, res) => account.registerCustomer(req, res, db));
app.post('/login', (req, res) => account.loginUser(req, res, db));
app.listen(process.env.PORT || 3001);