require('dotenv').config()

module.exports = {
  development: {
    username: process.env.DATABASE_USERNAME || '',
    password: process.env.DATABASE_PASSWORD || '',
    database: process.env.DATABASE_NAME || '',
    host: process.env.DATABASE_HOST || '',
    port: process.env.DATABASE_PORT || '',
    dialect: 'postgres'
  },
  test: {
    extend: 'default',
    database: process.env.DATABASE_TEST_NAME,
    dialect: 'postgres'
  },
  production: {
    username: 'root',
    password: null,
    database: 'database_production',
    host: '127.0.0.1',
    dialect: 'postgres'
  }
}
