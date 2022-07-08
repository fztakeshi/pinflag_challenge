import models from '../models'
import BaseController from './base'
import { hasNull } from '../helpers/helper_functions'

const axios = require('axios').default

export default class CharacterController extends BaseController {
  CharacterController () { }

  async index (req, res) {
    try {
      const id = parseInt(req.params.id)
      const arr = await [...Array(id).keys()].map(idx => idx + 1)
      const { data } = await axios({
        method: 'get',
        url: `https://rickandmortyapi.com/api/character/${arr.toString()}`
      })
      if (id > 1) {
        data.forEach((character) => {
          arr[character.id - 1] = {
            name: character.name,
            status: character.status,
            species: character.species,
            origin: character.origin.name
          }
        })
      } else {
        arr[data.id - 1] = {
          name: data.name,
          status: data.status,
          species: data.species,
          origin: data.origin.name
        }
      }
      return super.Success(res, arr)
    } catch (err) {
      return super.InternalError(res, err)
    }
  }

  async create (req, res) {
    try {
      const { name, status, species, origin } = req.body
      console.log(Object.keys(req.body).length)
      if (hasNull(req.body) === true || Object.keys(req.body).length !== 4) {
        return super.ErrorBadRequest(res, 'Bad Request: empty or null values')
      } else {
        models.Character.create({
          name,
          status,
          species,
          origin
        })
        return super.Created(res, 'Character created sucessfully')
      }
    } catch (ValidationError) {
      console.log(ValidationError)
    }
  }

  async show (req, res) {
    try {
      const { name } = req.body
      const characters = await models.Character.findAll({ where: { name: name } })
      if (characters.length < 1) {
        const { data } = await axios({
          method: 'get',
          url: `https://rickandmortyapi.com/api/character/?name=${name}`
        }).catch(() => {
          return super.NotFound(res, 'Character not found in db and API')
        })
        const arr = []
        data.results.forEach((character) => {
          arr.push({
            name: character.name,
            status: character.status,
            species: character.species,
            origin: character.origin.name
          })
        })
        return super.Success(res, arr)
      } else {
        const arr = []
        characters.forEach((character) =>
          arr.push({
            name: character.name,
            status: character.status,
            species: character.species,
            origin: character.origin
          })
        )
        return super.Success(res, arr)
      }
    } catch (err) {
    }
  }
}
