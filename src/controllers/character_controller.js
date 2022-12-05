/* import models from '../models' */
import BaseController from './base'
import { getCharacters, getCharacterByNameFromAPI, getCharacterByNameFromDB } from '../services/character_service'

export default class CharacterController extends BaseController {
  CharacterController () { }

  async index (req, res) {
    const { number } = req.params
    const arrayNumber = Array.from({ length: number }, (_, i) => i + 1)
    const characters = await getCharacters(arrayNumber)
    return super.Success(res, characters)
  }

  async create (req, res) {
    return super.Success(res, '')
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
