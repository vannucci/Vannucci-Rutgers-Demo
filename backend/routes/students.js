const express = require('express')
const router = express.Router()

const { getAllStudents, getStudentById, deleteStudent, upsertStudent } = require('../data/index.js')

router.delete('/api/deleteStudent/:id', async (req, res, next) => {
	const id = req.params.id
	try {
		const result = await deleteStudent(id)
		res.set('Content-Type', 'application/json')
		res.status(200).json(result)
	} catch (err) {
		next(err)
	}
})

router.post('/api/upsertStudent', async (req, res, next) => {
	try {
		const { id, studentid, fullname, major, expectedgraddate, final_grades } = req.body
		const values = [studentid, fullname, major, expectedgraddate, final_grades]
		const result = await upsertStudent(values, id)
		res.set('Content-Type', 'application/json')
		res.status(201).json(result)
		return
	} catch (err) {
		next(err)
	}
})


router.get('/api/getAllStudents', async (req, res, next) => {
	try {
		const result = await getAllStudents()
		res.set('Content-Type', 'application/json')
		res.status(200).json(result.rows)
		return
	} catch(err) {
		next(err)
	}
})

module.exports = router