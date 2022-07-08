export const hasNull = (object) => {
  for (const item in object) {
    if (object[item] == null) {
      return true
    }
  }
  return false
}
