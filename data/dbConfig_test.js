const db = require('knex')(require('../knexfile.js').testing)

module.exports = db;