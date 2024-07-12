const { getAllStudents, getStudentById, deleteStudent, upsertStudent, } = require('./students')
const { getAllClasses, upsertClass, deleteClassAndRelatedRecords,} = require('./classes')
const { poolTest } = require('./handlers')
const { getAllStudentsOfClassId, getAllClassesOfStudentId, insertClassForStudentId, deleteClassOfStudent, getClassesAvailableToStudent } = require('./studentsclasses')

module.exports = {
	getAllStudents,
	getStudentById,
	deleteStudent,
	upsertStudent,
	getAllClasses,
	upsertClass,
	deleteClassAndRelatedRecords,
	poolTest,
	getAllClassesOfStudentId,
	insertClassForStudentId,
	deleteClassOfStudent,
	getClassesAvailableToStudent,
	getAllStudentsOfClassId,
}