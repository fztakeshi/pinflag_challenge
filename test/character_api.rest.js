import app from '../src/index'
import request from 'supertest'

const API = request(app)

describe('GET /characters', () => {
    test('should return 200', async () => {
        const response = await API.get('/character/1')
        expect(response.status).toBe(200)
    })
})