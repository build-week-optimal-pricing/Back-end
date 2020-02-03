require('dotenv').config();

const db = () => {
  if(process.env.DATABASE_URL) {
    return require('knex')(require('../knexfile.js').production)
  } else {
    return require('knex')(require('../knexfile.js').development)
  }
}

module.exports = db();