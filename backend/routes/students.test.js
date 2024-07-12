const request = require('supertest')
const express = require('express')
const router = require('./students.js')

jest.mock('../data/index.js', () => ({
	getAllStudents: jest.fn(),
	getStudentById: jest.fn(),
	deleteStudent: jest.fn(),
	upsertStudent: jest.fn(),
}))

const { getAllStudents, getStudentById, deleteStudent, upsertStudent } = require('../data/index.js')

describe('GET /api/getAllStudents', () => {
	let app
	
	beforeEach(() => {
		app = express()
		app.use(router)
	})
	
	it('should return data successfully', async () => {
		const mockData = [{
			id: 1, name: 'Student'
		}]
		getAllStudents.mockResolvedValue({ rows: mockData })
		
		const response = await request(app).get('/api/getAllStudents')
		
		expect(response.status).toBe(200)
		expect(response.body).toEqual(mockData)
		expect(getAllStudents).toHaveBeenCalled()
	})
})