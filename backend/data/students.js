const { clientQueryValuesHandler, clientSingletonHandler } = require('./handlers')

const getAllStudents = async () => {
	const query = 'SELECT * FROM students'
	return clientSingletonHandler(query)
}

const getStudentById = async (id) => {
	const query = 'SELECT * FROM students WHERE id = $1'
	return clientQueryValuesHandler(query, [id])
}

const deleteStudent = async (id) => {
	const query = 'DELETE FROM students WHERE id = $1'
	return clientQueryValuesHandler(query, [id])
}

const upsertStudent = async(values, id) => {
	let query
	if (id) {
		values = [id, ...values]
		query = `
		INSERT INTO students (id, studentid, fullname, major, expectedgraddate, final_grades) 
		VALUES($1, $2, $3, $4, $5, $6) 
		ON CONFLICT (id)
		DO UPDATE SET
			studentid = EXCLUDED.studentid,
			fullname = EXCLUDED.fullname,
			major = EXCLUDED.major,
			expectedgraddate = EXCLUDED.expectedgraddate,
			final_grades = EXCLUDED.final_grades
		RETURNING *`
	} else {
		query = `
		INSERT INTO students (studentid, fullname, major, expectedgraddate, final_grades) 
		VALUES($1, $2, $3, $4, $5) 
		RETURNING *`
	}
	
	return clientQueryValuesHandler(query, values)
}



module.exports = {
	getAllStudents,
	getStudentById,
	deleteStudent,
	upsertStudent,
}