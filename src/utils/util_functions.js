export const transformToArray = (element) => {
  if (Array.isArray(element)) {
    return element
  } else {
    return [element]
  }
}
