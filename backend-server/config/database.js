
const knex = require("knex");
const config = require('./knexfile');
const database = knex(config["development"])
module.exports = database