/* import models from '../models' */
import BaseController from './base'
import { getCharacters } from '../services/character_service'

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
    return super.Success(res, '')
  }
}
