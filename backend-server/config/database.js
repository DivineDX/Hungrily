
const knex = require("knex");
const config = require('./knexfile');
const database = knex(config["production"])
module.exports = database