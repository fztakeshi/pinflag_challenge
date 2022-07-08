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

  /** TEST FOR POST SHOW */
  const postShow = (body) => request(app).post('/character').set('Content-type', 'application/json').send(body)
  describe('POST character/show', () => {
    let response
    let createdChar
    const charData = {
      name: 'Rick Sanchez',
      status: 'Alive',
      species: 'Human',
      origin: 'Earth (C-137)'
    }
    beforeAll(async () => {
      createdChar = await models.Character.create(charData)
    })

    beforeAll(async () => {
      response = await postShow({ name: charData.name })
      console.log(createdChar)
    })

    test('should respond with a 200 status code', async () => {
      expect(response.status).toBe(200)
    })
  })
})
