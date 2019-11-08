const account = require("./Datagen/AccountsSQL");
const franchiseowner = require("./Datagen/FranchisorAccountsSQL");
const Customer = require("./Datagen/CustomerAccountsSQL");
const restaurant = require("./Datagen/RestaurantsSQL");
const food = require("./Datagen/FoodsSQL");
const tables = require("./Datagen/TablesSQL");
const reservations = require("./Datagen/ReservationsSQL");
const possible_voucher = require("./Datagen/PossiblevoucherSQL");
const customer_voucher = require("./Datagen/CustomervoucherSQL");
const specialops = require("./Datagen/SpecialOperatingHrsSQL");

exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('reservation').del()
    .then(() =>knex('customer_voucher').del())
    .then(() =>knex('possible_voucher').del())
    .then(() =>knex('tables').del())
    .then(() =>knex('food').del())
    .then(() =>knex('special_operating_hrs').del())
    .then(() =>knex('restaurant').del())
    .then(() =>knex('franchiseowner').del())
    .then(() =>knex('customer').del())
    .then(() =>knex('account').del())
    .then(() =>knex.raw(account()))
    .then(() => knex.raw(franchiseowner()))
    .then(() => knex.raw(Customer()))
    .then(() => knex.raw(restaurant()))
    .then(() => knex.raw(food()))
    .then(() => knex.raw(tables()))
    .then(() => knex.raw(specialops()))
    .then(() => knex.raw(possible_voucher()))
    .then(() => knex.raw(customer_voucher()))
    .then(() => knex.raw(reservations()));
  };