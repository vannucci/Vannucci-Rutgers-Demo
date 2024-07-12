const express = require('express')
const router = express.Router()

const { 
	getAllClassesOfStudentId,
	insertClassForStudentId,
	deleteClassOfStudent,
	getClassesAvailableToStudent,
	getAllStudentsOfClassId,
} = require('../data/index.js')

router.get('/api/allClassesOfStudentId/:id', async (req, res, next) => {
	const id = req.params.id
	try {
		const result = await getAllClassesOfStudentId(id)
		res.set('Content-Type', 'application/json')
		res.status(200).json(result)
	} catch (err) {
		next(err)
	}
})

router.get('/api/getAllStudentsOfClassId/:id', async (req, res, next) => {
	const id = req.params.id
	try {
		const result = await getAllStudentsOfClassId(id)
		res.set('Content-Type', 'application/json')
		res.status(200).json(result)
	} catch (err) {
		next(err)
	}
})

router.get('/api/classesAvailableToStudent/:id', async (req, res, next) => {
	const id = req.params.id
	try {
		const result = await getClassesAvailableToStudent(id)
		res.set('Content-Type', 'application/json')
		res.status(200).json(result)
	} catch (err) {
		next(err)
	}
})

router.post('/api/studentsclasses/', async (req, res, next) => {
	try {
		const { student_id, class_id } = req.body
		const result = await insertClassForStudentId(student_id, class_id)
		res.set('Content-Type', 'application/json')
		res.status(201).json(result)
		return
	} catch (err) {
		next(err)
	}
})

router.delete('/api/studentsclasses/student/:studentId/class/:classId', async (req, res, next) => {
		const {studentId, classId} = req.params
		
		try {
			const result = await deleteClassOfStudent(studentId, classId)
			res.set('Content-Type', 'application/json')
			res.status(200).json(result)
		} catch (err) {
			next(err)
		}
})

module.exports = router