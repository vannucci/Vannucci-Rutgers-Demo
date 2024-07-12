const { clientQueryValuesHandler, clientSingletonHandler, clientTransactionHandler } = require('./handlers')

const getAllClasses = async () => {
	const query = 'SELECT * FROM classes'
	return clientSingletonHandler(query)
}

const upsertClass = async(values, id) => {
	let query
	if (id) {
		values = [id, ...values]
		query = `
		INSERT INTO classes (id, classid, name, semester, maxstudents, studentsenrolled, subject) 
		VALUES($1, $2, $3, $4, $5, $6, $7) 
		ON CONFLICT (id)
		DO UPDATE SET
			name = EXCLUDED.name,
			classid = EXCLUDED.classid,
			semester = EXCLUDED.semester,
			maxstudents = EXCLUDED.maxstudents,
			studentsenrolled = EXCLUDED.studentsenrolled,
			subject = EXCLUDED.subject
		RETURNING *`
	} else {
		query = `
		INSERT INTO classes (classid, name, semester, maxstudents, studentsenrolled, subject) 
		VALUES($1, $2, $3, $4, $5, $6) 
		RETURNING *`
	}
	
	return clientQueryValuesHandler(query, values)
}

const deleteClassAndRelatedRecords = async (id) => {
	let results

	try {
		const queries = [
			`DELETE FROM studentsclasses WHERE class_id = $1`
			`DELETE FROM classes WHERE id = $1`,
		]
		const valueSets = [
			[id],
			[id],
		]
		results = await clientTransactionHandler(queries, valueSets)
		console.log('Transaction completed successfully')
		console.log('Affected rows: ', results.map(result => result.rowCount()))
		return results
	} catch (err) {
		console.error('Error executing transaction: ', err)
		return results
	}
}

module.exports = {
	getAllClasses,
	upsertClass,
	deleteClassAndRelatedRecords,
}