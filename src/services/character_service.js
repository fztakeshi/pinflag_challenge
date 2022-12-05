import axios from 'axios'
/* import models from '../models' */

export async function getCharacters (number) {
  try {
    const charactersinfo = await axios.get(`https://rickandmortyapi.com/api/character/${number}`)
    const response = charactersinfo.data.map((character) => (
      {
        name: character.name,
        status: character.status,
        species: character.species,
        origin: character.origin.name
      }
    ))
    return response
  } catch (error) {
    console.log(error)
  }
}
