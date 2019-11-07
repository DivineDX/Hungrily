const account = require("./Datagen/AccountsSQL");
const franchiseowner = require("./Datagen/FranchisorAccountsSQL");
const Customer = require("./Datagen/CustomerAccountsSQL");
const restaurant = require("./Datagen/RestaurantsSQL");
const food = require("./Datagen/FoodsSQL");
const tables = require("./Datagen/TablesSQL");

exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('tables').del()
    .then(() =>knex('food').del())
    .then(() =>knex('restaurant').del())
    .then(() =>knex('franchiseowner').del())
    .then(() =>knex('customer').del())
    .then(() =>knex('account').del())
    .then(() =>knex.raw(account()))
    .then(() => knex.raw(franchiseowner()))
    .then(() => knex.raw(Customer()))
    .then(() => knex.raw(restaurant()))
    .then(() => knex.raw(food()))
    .then(() => knex.raw(tables()));
  };