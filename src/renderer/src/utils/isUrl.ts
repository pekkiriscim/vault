const isUrl = (text: string): boolean => {
  try {
    new URL(text)

    return true
  } catch {
    return false
  }
}

export default isUrl
