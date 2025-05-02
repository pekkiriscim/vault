const isUrl = (text: string): { isValid: boolean; url: string } => {
  const urlWithProtocol = text.startsWith('http') ? text : `https://${text}`

  try {
    new URL(urlWithProtocol)

    return { isValid: true, url: urlWithProtocol }
  } catch {
    return { isValid: false, url: text }
  }
}

export default isUrl
