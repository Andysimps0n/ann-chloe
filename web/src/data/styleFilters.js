export const hairLengthOptions = [
  { id: 'short', label: '단발' },
  { id: 'medium', label: '중단발' },
  { id: 'long', label: '긴 머리' },
]

export const styleOptions = [
  { id: 'cut', label: '커트' },
  { id: 'perm', label: '펌' },
  { id: 'color', label: '염색' },
  { id: 'setting', label: '셋팅' },
]

export const emptyStyleFilters = {
  hairLengths: [],
  styles: [],
}

export function filterPortfolioItems(items, filters) {
  return items.filter((item) => {
    const lengthMatches =
      filters.hairLengths.length === 0 ||
      item.hairLengths.some((length) => filters.hairLengths.includes(length))
    const styleMatches =
      filters.styles.length === 0 ||
      item.styles.some((style) => filters.styles.includes(style))

    return lengthMatches && styleMatches
  })
}

export function hasActiveStyleFilters(filters) {
  return filters.hairLengths.length > 0 || filters.styles.length > 0
}

export function getFilterLabels(filters) {
  const lengthLabels = hairLengthOptions
    .filter((option) => filters.hairLengths.includes(option.id))
    .map((option) => option.label)
  const styleLabels = styleOptions
    .filter((option) => filters.styles.includes(option.id))
    .map((option) => option.label)

  return [...lengthLabels, ...styleLabels]
}
