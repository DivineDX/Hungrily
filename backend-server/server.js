const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

//import controllers
const test = require('./controllers/test');
const retrieve = require('./controllers/retrieve');

const urls = require('./config/urls');
const db = require('./config/database')
const queries = require('./TempData/Queries');
const RestaurantData = require('./TempData/RestaurantData');


app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => { test.test(req, res) });
app.get('/cuisines', (req, res) => retrieve.getAllCuisines(req, res, db));
app.get('/areas', (req, res) => retrieve.getAllAreas(req, res, db));
app.get('/franchisors', (req, res) => retrieve.getAllFranchise(req, res, db)); //res names only
app.get('/resData', (req, res) => retrieve.getAllRestaurants(req, res, db)); //data of all restaurants
app.get('/restaurant/:name', (req, res) => retrieve.getRestaurant(req, res, db));
app.post('/search', (req, res) => retrieve.findRestaurant(req, res, db));

app.listen(process.env.PORT || 3001);