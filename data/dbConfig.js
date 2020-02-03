require('dotenv').config();

const db = require('knex')(require('../knexfile.js')[process.env.DB_ENV]);

module.exports = db;