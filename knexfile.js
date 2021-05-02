const path = require('path');
let dbname = process.env.DATABASE_NAME || 'moviereviewdb'

module.exports = {
  development: {
    client: 'pg',
    connection: `postgres://localhost/${dbname}`
  },
}