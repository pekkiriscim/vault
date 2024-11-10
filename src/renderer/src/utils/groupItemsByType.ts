const groupItemsByType = (allItems: AllItems[]): AllItems[][] => {
  const groupedItems: AllItems[][] = []

  let currentGroup: AllItems[] = []
  let currentType: 'link' | 'note' | 'image' | null = null

  for (const item of allItems) {
    let itemType: 'link' | 'note' | 'image'

    if ('url' in item) itemType = 'link'
    else if ('content' in item) itemType = 'note'
    else if ('fileName' in item) itemType = 'image'
    else continue

    if (itemType !== currentType) {
      if (currentGroup.length > 0) {
        groupedItems.push(currentGroup)
      }

      currentGroup = [item]
      currentType = itemType
    } else {
      currentGroup.push(item)
    }
  }

  if (currentGroup.length > 0) {
    groupedItems.push(currentGroup)
  }

  return groupedItems
}

export default groupItemsByType
