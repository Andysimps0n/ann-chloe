// 앤끌로에 매장 기본 정보.
//
// 아래 값은 예시(placeholder)입니다. 실제 매장 정보로 이 파일만 수정하면
// 헤더, 랜딩, 매장 안내, 예약 버튼, 푸터에 한 번에 반영됩니다.
export const salon = {
  name: 'AnnChloe',
  koreanName: '앤끌로에',

  tagline: '나에게 꼭 맞는 스타일을 만나는 곳',
  brandMessage:
    '앤끌로에는 유행을 그대로 따라가는 대신, 얼굴형과 모질, 라이프스타일에 맞춰 오래 유지되는 스타일을 제안합니다. 상담부터 마무리까지 한 사람에게 온전히 집중하는 프리미엄 헤어 살롱입니다.',

  address: {
    line1: '경북 포항시 남구 대이로 41',
    line2: '1층 앤클로이뷰티피플',
  },

  openingHours: [
    { days: '화요일 - 일요일', time: '10:00 - 20:00' },
    { days: '월요일', time: '정기 휴무' },
    { days: '격주 일요일', time: '휴무' },
  ],
  hoursNote: '매주 월요일 정기휴무, 격주 일요일 휴무. 09/13 휴무',

  phoneNumber: '0507-1357-2780',

  // 네이버 예약 (앤클로이뷰티피플 이동점)
  // 스타일별 시술은 /items/{디자이너} + optionIds 로 미리 고릅니다.
  bookingUrl: 'https://booking.naver.com/booking/13/bizes/830277?lang=ko',

  // public/images/salon 폴더에 아래 경로와 같은 이름으로 사진을 넣으면
  // 자리 표시자 대신 실제 사진이 자동으로 표시됩니다.
  photos: {
    hero: { src: '/images/salon/main.jpg', label: '매장 대표 사진' },
    interior: [
      { src: '/images/salon/styling-room.jpg', label: '스타일링 공간' },
      { src: '/images/salon/shampoo-room.jpg', label: '샴푸실' },
      { src: '/images/salon/waiting-lounge.jpg', label: '대기 라운지' },
    ],
  },
}

export function getBookingLinkProps(style) {
  const url = new URL('https://booking.naver.com/booking/13/bizes/830277')
  url.searchParams.set('lang', 'ko')

  if (style?.bookingItemId) {
    url.pathname = `${url.pathname}/items/${style.bookingItemId}`
  }

  if (style?.bookingOptionId) {
    url.searchParams.set('optionIds', String(style.bookingOptionId))
  }

  return {
    href: url.toString(),
    target: '_blank',
    rel: 'noopener noreferrer',
  }
}

export const bookingLinkProps = getBookingLinkProps()
