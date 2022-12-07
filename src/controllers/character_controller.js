import BaseController from './base'
import { getCharacters, getCharacterByNameFromAPI, getCharacterByNameFromDB } from '../services/character_service'
import models from '../models'

export default class CharacterController extends BaseController {
  CharacterController () { }

  async index (req, res) {
    try {
      const { number } = req.params
      if (number > 826 || number < 1) {
        return super.ErrorBadRequest(res, 'Number must be between 1 and 826')
      } else {
        const arrayNumber = Array.from({ length: number }, (_, i) => i + 1)
        const characters = await getCharacters(arrayNumber)
        return super.Success(res, characters)
      }
    } catch (error) {
      return super.InternalError(res, error)
    }
  }

  async create (req, res) {
    try {
      const { name, status, species, origin } = req.body
      await models.Character.findOrCreate({
        where: {
          name: name,
          status: status,
          species: species,
          origin: origin
        }
      })
      return super.Success(res, 'Character created successfully')
    } catch (error) {
      return super.ErrorBadRequest(res, 'name, status, species and origin are required')
    }
  }

  async show (req, res) {
    try {
      const { name } = req.query
      if (name.length === 0) {
        return super.ErrorBadRequest(res, 'Name is required')
      }
      const characterFromDB = await getCharacterByNameFromDB(name)
      if (characterFromDB.length > 0) {
        return super.Success(res, characterFromDB)
      }
      const characterFromAPI = await getCharacterByNameFromAPI(name)
      return characterFromAPI && characterFromAPI !== null ? super.Success(res, characterFromAPI) : super.NotFound(res, 'Character not found')
    } catch (error) {
      return super.InternalError(res, error)
    }
  }
}
