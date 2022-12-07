export const transformToArray = (element) => {
  if (Array.isArray(element)) {
    return element
  } else {
    return [element]
  }
}

export const transformToCharacterModel = (listOfCharacters) => {
  const response = listOfCharacters.map((character) => (
    {
      name: character?.name,
      status: character?.status,
      species: character?.species,
      origin: character?.origin.name
    }
  ))
  return response
}
