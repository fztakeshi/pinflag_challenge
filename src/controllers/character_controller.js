import models from '../models'
import BaseController from './base'

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
      models.Character.create({
        name,
        status,
        species,
        origin
      })
      return super.Success(res, 'Character created sucessfully')
    } catch (err) {
      /** TODO: error management */
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
      /** TODO: error management */
    }
  }
}
