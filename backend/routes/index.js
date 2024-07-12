const express = require('express')
const classesRoutes = require('./classes')
const studentRoutes = require('./students')
const studentsclasses = require('./studentsclasses')

const router = express.Router()

router.use('/', classesRoutes)
router.use('/', studentRoutes)
router.use('/', studentsclasses)

module.exports = router