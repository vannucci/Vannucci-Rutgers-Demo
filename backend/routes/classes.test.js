const request = require('supertest')
const express = require('express')
const router = require('./classes.js')

jest.mock('../data/index.js', () => ({
	getAllClasses: jest.fn(),
	upsertClass: jest.fn(),
	deleteClass: jest.fn(),
}))

const { getAllClasses, upsertClass, deleteClass, } = require('../data/index.js')

describe('GET /api/getAllClasses', () => {
	let app
	
	beforeEach(() => {
		app = express()
		app.use(router)
	})
	
	it('should return data successfully', async () => {
		const mockData = [{
			id: 1, name: 'Test'
		}]
		getAllClasses.mockResolvedValue({ rows: mockData })
		
		const response = await request(app).get('/api/getAllClasses')
		
		expect(response.status).toBe(200)
		expect(response.body).toEqual(mockData)
		expect(getAllClasses).toHaveBeenCalled()
	})
})