const request = require('supertest')
const { app } = require('./index.js')
const router = require('./routes')

jest.mock('./data/index.js', () => ({
	getAllStudents: jest.fn(),
}))

const { getAllStudents } = require('./data/index.js')


describe('Error for unknown route', () => {
	beforeEach(() => {
		app.use(router)
	})

	it('should return 404 for unknown routes', async () => {
		const response = await request(app).get('/unknown-route')
		expect(response.status).toBe(404)
		expect(response.body).toEqual({ message: 'Not found' })
	})
	it('should handle 500 errors', async () => {
		getAllStudents.mockRejectedValue(new Error('Database error'))
		
		const response = await request(app).get('/api/getAllStudents')
		
		expect(response.status).toBe(500)
		expect(response.body).toEqual({ error: 'Internal server error' })
	})
})