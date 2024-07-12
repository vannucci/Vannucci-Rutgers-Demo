const config = require('./config')
const express = require('express')
const cors = require('cors')
const { poolTest } = require('./data/index.js')
const routes = require('./routes')
const errorHandler = require('./routes/errorHandler')

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/', routes)

app.use('*', (req, res) => {
	res.status(404).json({ message: 'Not found' })
})

app.use(errorHandler)

function startServer() {
	const port = config.port || 3000
	return new Promise((resolve) => {
		poolTest()
		const server = app.listen(config.port, () => {
			console.log(`Server is running on ${config.port}`)
			resolve(server)
		})
	})
}

if (require.main === module) {
	startServer()
}

module.exports = {app, startServer}

