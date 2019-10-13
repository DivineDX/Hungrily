const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

//import controllers
const test = require('./controllers/test');

const urls = require('./config/urls');
const db = require('./config/database');
const queries = require('./TempData/Queries');
const RestaurantData = require('./TempData/RestaurantData');

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => { test.test(req, res) });
app.get('/cuisines', (req, res) => {res.json(queries.cuisines)});
app.get('/areas', (req, res) => {res.json(queries.areas)});
app.get('/restaurants', (req, res) => {res.json(queries.restaurants)});
app.get('/resData', (req, res) => {res.json(RestaurantData)});

app.listen(process.env.PORT || 3001);