const { clientQueryValuesHandler, clientSingletonHandler } = require('./handlers')

const getAllClassesOfStudentId = async (id) => {
	const query = `
		SELECT
			json_agg(
				json_build_object(
					'id', c.id,
					'classid', c.classid,
					'name', c.name,
					'subject', c.subject,
					'semester', c.semester
				)
			) AS classes
		FROM studentsclasses sc
		JOIN classes c on sc.class_id = c.id
		WHERE sc.student_id = $1;
	`
	const values = [id]
	const result = await clientQueryValuesHandler(query, values)
	if (result.rowCount > 0) {
		return result.rows[0]
	}
	return {}
}

const getAllStudentsOfClassId = async (id) => {
	const query = `
		SELECT
			json_agg(
				json_build_object(
					'id', s.id,
					'name', s.name,
					'major', s.major,
					'studentId', c.studentid
				)
			) AS enrolled_students
		FROM studentsclasses sc
		JOIN students s on sc.student_id = s.id
		WHERE sc.class_id = $1;
	`
	const values = [id]
	const result = await clientQueryValuesHandler(query, values)
	if (result.rowCount > 0) {
		return result.rows[0]
	}
	return []
}

const insertClassForStudentId = async (studentId, classId) => {
	let query = `
		INSERT INTO studentsclasses (student_id, class_id)
		VALUES ($1, $2);
	`
	let values = [studentId, classId]
	const response = await clientQueryValuesHandler(query, values)	
	query = `
		UPDATE classes
		SET studentsenrolled = studentsenrolled + 1
		WHERE id = $1
		AND EXISTS (
			SELECT 1
			FROM studentsclasses
			WHERE student_id = $2 AND class_id = $1
		);
	`
	values = [classId, studentId]
	return clientQueryValuesHandler(query, values)
}

const incrementStudentsEnrolled = async (studentId, classId) => {
	
}

const deleteClassOfStudent = async (studentId, classId) => {
	const query = `
		DELETE FROM studentsclasses
		WHERE student_id = $1 AND class_id = $2
		RETURNING *;
	`
	const values = [studentId, classId]
	return clientQueryValuesHandler(query, values)
}

const getClassesAvailableToStudent = async (studentId) => {
	const query = `
		SELECT
			json_agg (
				json_build_object(
					'id', c.id,
					'classid', c.classid,
					'class_name', c.name,
					'semester', c.semester,
					'subject', c.subject
				)
			) as available_classes
		FROM classes c
		WHERE
			c.id NOT IN (
				SELECT class_id
				FROM studentsclasses
				WHERE student_id = $1
			);
	`
	const values = [studentId]
	const result = await clientQueryValuesHandler(query, values)
	if (result.rowCount > 0) {
		return result.rows[0]
	}
	return []
}

module.exports = {
	getAllClassesOfStudentId,
	insertClassForStudentId,
	deleteClassOfStudent,
	getClassesAvailableToStudent,
	getAllStudentsOfClassId,
}