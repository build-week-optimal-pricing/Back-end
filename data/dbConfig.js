require('dotenv').config();

const db = () => {
  switch(process.env.DB_ENV) {
    case 'development':
      return require('knex')(require('../knexfile.js').development)

    case 'production':
      return require('knex')(require('../knexfile.js').production)

    case 'testing':
      return require('knex')(require('../knexfile.js').testing)

    default:
      return require('knex')(require('../knexfile.js').development)
  }
}

module.exports = db();