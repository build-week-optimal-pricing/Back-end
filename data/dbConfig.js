require('dotenv').config();

const db = () => {
  if(process.env.DATABASE_URL) {
    return require('knex')(require('../knexfile.js')[process.env.DATABASE_URL])
  } else {
    return require('knex')(require('../knexfile.js')[process.env.DB_ENV])
  }
}

module.exports = db();