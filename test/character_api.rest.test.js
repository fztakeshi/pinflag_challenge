import '../src/config/environment'
import '../src/models'
import app from '../src/app'
import sequelize from '../src/config/sequelize'
import request from 'supertest'
import models from '../src/models'
import { gokuCharacter, noNameCharacter, noOriginCharacter, noSpeciesCharacter, noStatusCharacter, testCharacter } from '../src/utils/test_data'

const API = request(app)

describe('GET /character/:number', () => {
    test('should return 200', async () => {
        const response = await API.get('/character/1')
        expect(response.status).toBe(200)
    })

    describe('when number is lower than 1 or greater than 826 ', () => {

        test('should return 400', async () => {
            const response = await API.get('/character/0')
            expect(response.status).toBe(400)
        })
    
        test('should return 400', async () => {
            const response = await API.get('/character/827')
            expect(response.status).toBe(400)
        })
    })

    describe('when number is between 1 and 826', () => {

        test('response should be an array', async () => {
            const response = await API.get('/character/1')
            expect(Array.isArray(response.body)).toBe(true)
        })

        test('response should be an array', async () => {
            const response = await API.get('/character/50')
            expect(Array.isArray(response.body)).toBe(true)
        })

        test('response should have n elements', async () => {
            const response = await API.get('/character/50')
            expect(response.body.length).toBe(50)
        })
        
        test('response should have name, status, species and origin', async () => {
            const response = await API.get('/character/1')
            expect(response.body[0]).toHaveProperty('name')
            expect(response.body[0]).toHaveProperty('status')
            expect(response.body[0]).toHaveProperty('species')
            expect(response.body[0]).toHaveProperty('origin')
        })
    })
})


describe('POST /character/create', () => {

    describe('when name, status, species and origin are provided', () => {
        test('should return 200', async () => {
            const response = await API.post('/character/create').send(testCharacter)
            expect(response.status).toBe(200)
        })
    })
    
    describe('when name, status, species or origin are not provided', () => {
        test('should return 400 when no origin provided', async () => {
            const response = await API.post('/character/create').send(noOriginCharacter)
            expect(response.status).toBe(400)
        })

        test('should return 400 when no species provided', async () => {
            const response = await API.post('/character/create').send(noSpeciesCharacter)
            expect(response.status).toBe(400)
        })
        
        test('should return 400 when no status provided', async () => {
            const response = await API.post('/character/create').send(noStatusCharacter)
            expect(response.status).toBe(400)
        })

        test('should return 400 when no name provided', async () => {
            const response = await API.post('/character/create').send(noNameCharacter)
            expect(response.status).toBe(400)
        })
    })
})


describe ('GET /character ', () => {
    beforeEach(async () => {
        await models.Character.findOrCreate({ where: gokuCharacter})
    })

    describe ('when name is provided and found in DB', () => {

        test('should return 200', async () => {
            const response = await API.get('/character?name=Goku')
            expect(response.status).toBe(200)
        })

        test('response should be an array', async () => {
            const response = await API.get('/character?name=Goku')
            expect(Array.isArray(response.body)).toBe(true)
        })

        test('response should have name, status, species and origin', async () => {
            const response = await API.get('/character?name=Goku')
            expect(response.body[0]).toHaveProperty('name')
            expect(response.body[0]).toHaveProperty('status')
            expect(response.body[0]).toHaveProperty('species')
            expect(response.body[0]).toHaveProperty('origin')
        })
    })

    describe ('when name is provided and found in API', () => {

        test('should return 200', async () => {
            const response = await API.get('/character?name=Bootleg Portal Chemist Rick')
            expect(response.status).toBe(200)
        })

        test('response should be an array', async () => {
            const response = await API.get('/character?name=Bootleg Portal Chemist Rick')
            expect(Array.isArray(response.body)).toBe(true)
        })

        test('response should have name, status, species and origin', async () => {
            const response = await API.get('/character?name=Bootleg Portal Chemist Rick')
            expect(response.body[0]).toHaveProperty('name')
            expect(response.body[0]).toHaveProperty('status')
            expect(response.body[0]).toHaveProperty('species')
            expect(response.body[0]).toHaveProperty('origin')
        })
    })

    describe ('when name is provided and not found', () => {
            
            test('should return 404', async () => {
                const response = await API.get('/character?name=Seizaburo')
                expect(response.status).toBe(404)
            })
        })

    describe('when name is not provided', () => {
        test('should return 400', async () => {
            const response = await API.get('/character?name=')
            expect(response.status).toBe(400)
        })
    })

    describe('when query is not provided', () => {
        test('should return 500', async () => {
            const response = await API.get('/character')
            expect(response.status).toBe(500)
        })
    })

    afterAll(async () => {
        // Erase all test data from DB
        await models.Character.destroy({ where: gokuCharacter })
        await models.Character.destroy({ where: testCharacter })
        await sequelize.close()
    })
})
