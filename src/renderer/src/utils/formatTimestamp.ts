const formatTimestamp = (createdAt: number): string => {
  const now = new Date()
  const givenTime = new Date(createdAt)

  const elapsedMilliseconds = now.getTime() - givenTime.getTime()
  const elapsedSeconds = Math.floor(elapsedMilliseconds / 1000)
  const elapsedMinutes = Math.floor(elapsedSeconds / 60)
  const elapsedHours = Math.floor(elapsedMinutes / 60)

  if (elapsedMinutes < 1) {
    return 'just now'
  } else if (elapsedHours < 1) {
    return `${elapsedMinutes} minutes ago`
  } else if (elapsedHours < 24) {
    return `${elapsedHours} hours ago`
  } else {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }

    return givenTime.toLocaleDateString('en-US', options)
  }
}

export default formatTimestamp
