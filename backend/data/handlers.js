const { Pool } = require('pg')
const config = require('../config')

const pool = new Pool({
  user: config.dbUser,
  host: config.dbHost,
  database: config.dbName,
  password: config.dbPass,
  port: config.dbPort,
});

const poolTest = () => {
	pool.connect((err, client, release) => {
		if(err) {
			return console.log('Pool connection test failed', err)
		}
		console.log('Pool connection test passed')
		release()
	})	
}

const clientSingletonHandler = async (queryText) => {
	let client
	try {
		client = await pool.connect()
		return await client.query(queryText)
	} catch(err) {
		console.error('clientSingletonHandler failed', err)
		throw err
	} finally {
		if (client) client.release()
	}
}

const clientQueryValuesHandler = async (queryText, values) => {
	let client
	try {
		client = await pool.connect()
		const res = await client.query(queryText, values)
		return res
	} catch(err) {
		console.error('clientQueryValuesHandler failed', err)
		throw err
	} finally {
		if (client) client.release()
	}
}

const clientTransactionHandler = async (queries, valueSets) => {
	let client
	console.log('handler', queries, valueSets)
	if (queries.length !== valueSets.length) {
		console.error('Queries must have an equal number of value sets')
		throw err
	}
	try {
		client = await pool.connect()
		await client.query('BEGIN')
		const results = []
		for (let i = 0; i < queries.length; i++) {
			const queryText = queries[i]
			const values = valuesSets[i]
			console.log('executing query', queryText)
			console.log('with values', values)
			const result = await client.query(queryText, values)
			results.push(result)
		}
		await client.query('COMMIT')
		return results
	} catch (error) {
		await client.query('ROLLBACK')
		throw error
	} finally {
		if (client) client.release()
	}
}


module.exports = {
	clientSingletonHandler,
	clientQueryValuesHandler,
	clientTransactionHandler,
	poolTest,
}