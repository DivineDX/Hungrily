const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

//import controllers
const test = require('./controllers/test');

const urls = require('./config/urls');
const db = require('./config/database');

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => { test.test(req, res) });

app.listen(process.env.PORT || 3001);