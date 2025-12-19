export default {
  meta: {
    title: '錄影帶數碼化服務｜數碼化讓回憶永存｜Capture HK',
    description:
      '我們提供專業的錄影帶數碼化服務，7-14日內安全地將您的錄影帶保存到USB或雲端。VHS、Hi8 等8種格式錄影帶轉檔，每卷只需 HK$200，無長度限制。免費錄影帶檢測, 發霉清潔 HK$100。',
    image: 'https://www.capture.hk/video/meta-image.png',
    url: 'https://www.capture.hk/zh/video',
  },
  section1: {
    title: '可能係最方便您嘅...',
    sub_title: `相片/相簿<br class="md:block hidden" />
數碼化`,
    des: '數碼化您的錄音帶從未如此簡單！只需將錄音帶帶到 Capture，快速轉換數碼格式，隨時重溫珍貴聲音！',
    button_1: '開始數碼化',
    button_2: `立即查詢`,
    button_3: 'WhatsApp 我們',
    video: '/video-home/video-home.mp4',
  },
  section2: {
    base_on: '基於 {total} 條',
    reviews: 'Google評論',
    customer: ' ',
    review_data: {
      one: {
        text: '沒想到放了幾十年的錄音帶竟然還能播放，實在太感謝Capture 😭',
        author: 'Amy Lam',
        rating: 5,
      },
      two: {
        text: 'Capture 讓我的舊錄音帶數碼化變得如此簡單！過程順利，數碼檔案的音質非常棒。現在，我隨時可以重溫珍貴的錄音回憶！',
        author: 'Sam Chan',
        rating: 5,
      },
      three: {
        text: 'Capture 將我的錄音帶完美轉換為數碼格式，處理速度非常快。對於任何想保存音源回憶的人，這服務絕對值得推薦！',
        author: 'Alex Li',
        rating: 5,
      },
    },
  },
  section3: {
    title: '為什麼選擇 Capture 來將我的錄音帶數碼化？',
    sub_title: `媒體安全、專業服務、安全備份`,
    sub_title2: `媒體安全、專業服務、安全備份`,
    card_1: {
      title: '媒體安全追蹤',
      des: `放心體驗我們的全面追蹤系統，24/7保護您敏感媒體。顧客可專屬訪問您珍貴的回憶。`,
    },
    card_2: {
      title: '高效錄音帶數碼化',
      des: `14-28天內的快速交付時間，我們會專業地將您珍貴的回憶轉換為高質量的數碼副本和USB格式。`,
    },
    card_4: {
      title: '專屬備份',
      des: `每個訂單完成後，Capture會專為您提供30天的安全備份，保存您的輸出檔案。顧客可於30天內以HK$80重新獲取備份。您的回憶同時嚴格保密，僅供您回顧。`,
    },
  },
  tape: {
    title: '我們支援哪些格式？',
    sub_title: `差不多全部`,

    image_1: '/audio-home/tape/tape-1-zh.webp',
    image_2: '/audio-home/tape/tape-2-zh.webp',
    image_3: '/audio-home/tape/tape-3-zh.webp',
    image_4: '/audio-home/tape/tape-4-zh.webp',
    image_5: '/audio-home/tape/tape-5-zh.webp',
    image_6: '/audio-home/tape/tape-6-zh.webp',
  },
  memories: {
    title: '我可以自訂檔案名稱嗎？',
    sub_title: `整理您的回憶`,
    card_1: {
      title: '標記您的錄音帶',
      des: `輕鬆整理珍藏的回憶。在將錄音帶寄送給我們之前，您可預先標記它們（如檔案名稱、年份），我們的專業團隊將於數碼檔輸出時，準確地為您命名和整理檔案。`,
    },
  },
  section4: {
    title: '如何開始我的數碼化？',
    sub_title: `簡單兩步，開始`,
    card_1: {
      title: '在家估算錄音帶數量',
      des: `請您估算一下家中的錄音帶數量。`,
      text_1: '收費',
      des_1: '根據每盒錄音帶的格式而定，收費由HK$200 起。',
    },
    card_2: {
      title: '網上預約',
      des: `只需要預約到我們中環門市放下即可。`,
      text_1: '流程',
      des_1: `輸入數量 ➔  選擇到店日期 ➔輸入個人資料`,
    },

    image_1: '/video-home/app-1.webp',
    image_2: '/video-home/app-2.webp',
  },

  section6: {
    title: '輸出方式',
    des: '兩種方式，任君選擇',
    card_1: 'Capture 會提供USB給客戶，相片會直接輸出至USB',
    card_2: '相片會直接上傳至 Google Photos，您可隨時回看及分享',
    frame: '/photo-home/frame-mobile.png',
    frame_desktop: '/photo-home/frame.png',
  },
  section7: {
    title: '服務收費',
    des: '收費，非常簡單',
    service_fee: '服務收費',
    each_photo: '每盒錄影帶',
    quantity: '影帶數量',
    photos: '錄影帶',
    basic_Output_fee: '基本輸出費用',
    quesiton: `還有其他問題？<br /> 歡迎聯絡我們的專家`,
    button: '預約放下舊媒體',
  },
} as const
