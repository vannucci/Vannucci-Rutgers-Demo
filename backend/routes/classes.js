const express = require('express')
const router = express.Router()

const { getAllClasses, upsertClass, deleteClassAndRelatedRecords, } = require('../data/index.js')

router.get('/api/getAllClasses', async (req, res, next) => {
	try {
		const result = await getAllClasses()
		res.set('Content-Type', 'application/json')
		res.status(200).json(result.rows)
		return
	} catch(err) {
		next(err)
	}
})

router.post('/api/upsertClass', async (req, res, next) => {
	try {
		const { id, classid, name, semester, maxstudents, studentsenrolled, subject } = req.body
		const values = [classid, name, semester, maxstudents, studentsenrolled, subject]
		const result = await upsertClass(values, id)
		res.set('Content-Type', 'application/json')
		res.status(201).json(result)
		return
	} catch (err) {
		next(err)
	}
})

router.delete('/api/deleteClass/:id', async (req, res, next) => {
	const id = req.params.id
	try {
		const result = await deleteClassAndRelatedRecords(id)
		res.set('Content-Type', 'application/json')
		res.status(200).json(result)
	} catch (err) {
		next(err)
	}
})

module.exports = router