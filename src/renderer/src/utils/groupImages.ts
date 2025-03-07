const groupImages = (images: Image[], groupSize: number): Image[][] => {
  const groupedImages: Image[][] = []

  for (let i = 0; i < images.length; i += groupSize) {
    groupedImages.push(images.slice(i, i + groupSize))
  }

  return groupedImages
}

export default groupImages
