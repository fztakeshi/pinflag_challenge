import axios from 'axios'
import models from '../models'
import { Op } from 'sequelize'
import { transformToArray, transformToCharacterModel } from '../utils/util_functions'

export async function getCharacters (number) {
  try {
    const charactersinfo = await axios.get(`https://rickandmortyapi.com/api/character/${number}`)
    const charactersdata = transformToArray(charactersinfo.data)
    const response = charactersdata.map((character) => (
      {
        name: character.name,
        status: character.status,
        species: character.species,
        origin: character.origin.name
      }
    ))
    return response
  } catch (error) {
    return null
  }
}

export async function getCharacterByNameFromAPI (name) {
  try {
    const charactersinfo = await axios.get(`https://rickandmortyapi.com/api/character/?name=${name}`)
    const response = charactersinfo.data.results.map((character) => (
      {
        name: character.name,
        status: character.status,
        species: character.species,
        origin: character.origin.name
      }
    ))
    return response
  } catch (error) {
    return null
  }
}

export async function getCharacterByNameFromDB (name) {
  try {
    const character = await models.Character.findAll({
      where: {
        name:
          { [Op.iLike]: `%${name}%` }
      }
    })
    return transformToCharacterModel(character)
  } catch (error) {
    return null
  }
}
