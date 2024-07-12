function errorHandler(err, req, res, next) {
	console.error(err)
	
	if (err.statusCode) {
		return res.status(err.statusCode).json({error: err.message})
	}
	
	if (err.sqlState) {
		return res.status(500).json({ error: 'Database error', details: err.message })
	}
	
	return res.status(500).json({ error: 'Internal server error' })
}

module.exports = errorHandler
