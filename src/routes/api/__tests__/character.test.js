import app from '../../../index.js'
import request from 'supertest'
import models from '../../../models'

describe('API character endpoints', () => {
  beforeAll(async () => {
    await models.Character.sequelize.sync({ force: true })
  })

  afterAll(async () => {
    await models.Character.sequelize.close()
  })
  /** Test for GET characters from api */

  const getCharacters = (id) => request(app).get(`/character/${id}`)

  describe('GET character/:id', () => {
    let response
    beforeAll(async () => {
      response = await getCharacters(5)
    })

    test('should respond with a 200 status code', async () => {
      expect(response.status).toBe(200)
    })

    test('should respond with an array', async () => {
      expect(response.body).toBeInstanceOf(Array)
    })
  })

  /** Test for POST create character in db */
  const postCreate = (body) => request(app).post('/character/create').set('Content-type', 'application/json').send(body)
  describe('POST character/create', () => {
    let response
    const charData = {
      name: 'Shlaami',
      status: 'Alive',
      species: 'Alien',
      origin: 'unknown'
    }
    beforeAll(async () => {
      response = await postCreate(charData)
    })
    test('should respond with a 200 status code', async () => {
      expect(response.status).toBe(201)
    })
    test('character should be on database after created', async () => {
      const createdCharacter = await models.Character.findOne({
        where: {
          name: charData.name,
          status: charData.status,
          species: charData.species,
          origin: charData.origin
        }
      })
      expect(createdCharacter.name).toEqual(charData.name)
    })
  })

  /** Test for POST show character from db or api */
  const postShow = (body) => request(app).post('/character').set('Content-type', 'application/json').send(body)
  describe('POST character/show', () => {
    let response
    const charData = {
      name: 'Rick Sanchez',
      status: 'Alive',
      species: 'Human',
      origin: 'Earth (C-137)'
    }
    beforeAll(async () => {
      await models.Character.create(charData)
    })

    describe('Character belongs to database', () => {
      beforeAll(async () => {
        response = await postShow({ name: charData.name })
      })

      test('should respond with a 200 status code', async () => {
        expect(response.status).toBe(200)
      })

      test('should respond with an array', async () => {
        expect(response.body).toBeInstanceOf(Array)
      })
    })

    describe('Character does not belongs to database', () => {
      beforeAll(async () => {
        response = await postShow({ name: 'Real Fake Doors Salesman' })
      })

      test('should respond with a 200 status code', async () => {
        expect(response.status).toBe(200)
      })

      test('should respond with an array', async () => {
        expect(response.body).toBeInstanceOf(Array)
      })
    })
  })
})
