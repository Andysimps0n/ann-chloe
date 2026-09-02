import { bookingDesigners } from './salon'

const PLACEHOLDER_MENU_COUNT = 5
const placeholderCategories = ['커트', '펌', '염색', '셋팅', '클리닉']

const designerProfiles = {
  7093190: { slug: 'ayoung', role: '디자이너' },
  5954563: { slug: 'mihye', role: '실장' },
  4818591: { slug: 'hun', role: '점장' },
  4818593: { slug: 'yumi', role: '부원장' },
  4818596: { slug: 'hongju', role: '원장' },
}

function createPlaceholderMenus(designerId) {
  return Array.from({ length: PLACEHOLDER_MENU_COUNT }, (_, index) => {
    const menuNumber = index + 1
    return {
      id: `${designerId}-placeholder-${menuNumber}`,
      name: `플레이스홀더 메뉴 ${menuNumber}`,
      category: placeholderCategories[index],
    }
  })
}

export const designerMenuCatalog = Object.entries(bookingDesigners).map(
  ([itemId, designer]) => {
    const bookingItemId = Number(itemId)
    const profile = designerProfiles[bookingItemId]

    return {
      designer,
      bookingItemId,
      role: profile.role,
      photoSrc: `/images/designers/${profile.slug}.jpg`,
      menus: createPlaceholderMenus(bookingItemId),
    }
  },
)
