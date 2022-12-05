import BaseController from './base'
import { getCharacters, getCharacterByNameFromAPI, getCharacterByNameFromDB } from '../services/character_service'
import models from '../models'

export default class CharacterController extends BaseController {
  CharacterController () { }

  async index (req, res) {
    const { number } = req.params
    const arrayNumber = Array.from({ length: number }, (_, i) => i + 1)
    const characters = await getCharacters(arrayNumber)
    return super.Success(res, characters)
  }

  async create (req, res) {
    try {
      const { name, status, species, origin } = req.body
      console.log(req.body)
      const character = await models.Character.create({
        name: name,
        status: status,
        species: species,
        origin: origin
      })
      return super.Success(res, character)
    } catch (error) {
      return super.InternalError(res, error)
    }
  }

  async show (req, res) {
    try {
      const { name } = req.query
      console.log(req.query)
      const characterFromDB = await getCharacterByNameFromDB(name)
      if (characterFromDB.length > 0) {
        return super.Success(res, characterFromDB)
      } else {
        const characterFromAPI = await getCharacterByNameFromAPI(name)
        return super.Success(res, characterFromAPI)
      }
    } catch (error) {
      return super.InternalError(res, error)
    }
  }
}
