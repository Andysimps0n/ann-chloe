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
    line1: '서울특별시 강남구 압구정로 12길 34, 2층',
    line2: '압구정로데오역 5번 출구에서 도보 3분',
  },

  openingHours: [
    { days: '화요일 - 금요일', time: '10:00 - 20:00' },
    { days: '토요일 - 일요일', time: '10:00 - 18:00' },
    { days: '월요일', time: '정기 휴무' },
  ],

  phoneNumber: '02-1234-5678',

  // 네이버 예약 같은 실제 예약 페이지가 생기면 이 값만 바꾸면 됩니다.
  bookingUrl: 'tel:02-1234-5678',

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
