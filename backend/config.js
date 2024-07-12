const dotenv = require('dotenv')
const path = require('path')

dotenv.config()

module.exports = {
	port: process.env.PORT || 3000,
	dbHost: process.env.DB_HOST,
	dbUser: process.env.DB_USER,
	dbName: process.env.DB_NAME,
	dbPass: process.env.DB_PASS,
	dbPort: process.env.DB_PORT,
}