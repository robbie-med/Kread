/**
 * Korean Read-Aloud Trainer Data
 * Bible passages sourced from sermons.bo-bob.org/bible
 * Format: [Korean text, romanization, English meaning/translation]
 */

const DATA = {
  "1. Syllables": [
    ["가", "ga", ""], ["나", "na", ""], ["다", "da", ""], ["바", "ba", ""],
    ["서", "seo", ""], ["고", "go", ""], ["무", "mu", ""], ["지", "ji", ""],
    ["하", "ha", ""], ["래", "rae", ""], ["워", "wo", ""], ["의", "ui", ""],
    ["값", "gap", ""], ["밝", "bak", ""], ["읽", "ik", ""], ["꽃", "kkot", ""],
    ["닭", "dak", ""], ["없", "eop", ""], ["앉", "an", ""], ["흙", "heuk", ""]
  ],

  "2. Words": [
    ["사람", "sa-ram", "person"], ["학교", "hak-gyo", "school"],
    ["음식", "eum-sik", "food"], ["친구", "chin-gu", "friend"],
    ["시간", "si-gan", "time"], ["여행", "yeo-haeng", "travel"],
    ["병원", "byeong-won", "hospital"], ["도서관", "do-seo-gwan", "library"],
    ["냉장고", "naeng-jang-go", "refrigerator"], ["지하철", "ji-ha-cheol", "subway"],
    ["대한민국", "dae-han-min-guk", "South Korea"], ["텔레비전", "tel-le-bi-jeon", "television"],
    ["선생님", "seon-saeng-nim", "teacher"], ["아름답다", "a-reum-dap-da", "to be beautiful"],
    ["맛있어요", "ma-si-sseo-yo", "it's delicious"], ["괜찮아요", "gwaen-cha-na-yo", "it's okay"],
    // Bible words
    ["사랑", "sa-rang", "[Bible] love"],
    ["믿음", "mi-deum", "[Bible] faith"],
    ["주님", "ju-nim", "[Bible] the Lord"],
    ["은혜", "eun-hye", "[Bible] grace"],
    ["구원", "gu-won", "[Bible] salvation"],
    ["회개", "hoe-gae", "[Bible] repentance"],
    ["축복", "chuk-bok", "[Bible] blessing"],
    ["영원", "yeong-won", "[Bible] eternity"]
  ],

  "3. Phrases": [
    ["안녕하세요", "an-nyeong-ha-se-yo", "Hello"],
    ["감사합니다", "gam-sa-ham-ni-da", "Thank you"],
    ["잘 먹겠습니다", "jal meok-get-seum-ni-da", "I will eat well (before a meal)"],
    ["조금만 기다려 주세요", "jo-geum-man gi-da-ryeo ju-se-yo", "Please wait a moment"],
    ["얼마예요?", "eol-ma-ye-yo", "How much is it?"],
    ["화장실이 어디예요?", "hwa-jang-si-ri eo-di-ye-yo", "Where is the bathroom?"],
    ["천천히 말해 주세요", "cheon-cheon-hi mal-hae ju-se-yo", "Please speak slowly"],
    ["한국어를 공부하고 있어요", "han-gu-geo-reul gong-bu-ha-go i-sseo-yo", "I am studying Korean"],
    // Bible phrases (Korean Bible)
    ["하나님을 사랑하라", "ha-na-nim-eul sa-rang-ha-ra", "[Bible] Love God"],
    ["주를 믿으라", "ju-reul mi-deu-ra", "[Bible] Believe in the Lord"],
    ["마음을 다하여", "ma-eum-eul da-ha-yeo", "[Bible] with all your heart"],
    ["구원의 기쁨", "gu-won-ui gi-ppeum", "[Bible] joy of salvation"]
  ],

  "4. Sentences": [
    ["저는 매일 아침에 커피를 마셔요.", "jeo-neun mae-il a-chi-me keo-pi-reul ma-syeo-yo", "I drink coffee every morning."],
    ["주말에 친구랑 영화를 봤어요.", "ju-ma-re chin-gu-rang yeong-hwa-reul bwa-sseo-yo", "I watched a movie with a friend on the weekend."],
    ["내일 날씨가 좋으면 공원에 갈 거예요.", "nae-il nal-ssi-ga jo-eu-myeon gong-wo-ne gal geo-ye-yo", "If the weather is nice tomorrow, I will go to the park."],
    ["한국 음식 중에서 김치찌개를 제일 좋아해요.", "han-guk eum-sik jung-e-seo gim-chi-jji-gae-reul je-il jo-a-hae-yo", "Among Korean foods, I like kimchi stew the most."],
    ["어제 너무 피곤해서 일찍 잤어요.", "eo-je neo-mu pi-gon-hae-seo il-jjik ja-sseo-yo", "I was so tired yesterday that I slept early."],
    ["지하철역에서 오른쪽으로 가면 은행이 있어요.", "ji-ha-cheol-lyeo-ge-seo o-reun-jjo-geu-ro ga-myeon eun-haeng-i i-sseo-yo", "If you go right from the subway station, there is a bank."],
    // Bible sentences
    ["주님은 나의 목자시니 내가 부족함이 없으리로다.", "ju-nim-eun na-ui mok-ja-si-ni nae-ga bu-jok-ham-i eop-seu-ri-ro-da", "[Bible Psalm 23:1] The Lord is my shepherd; I shall not want."],
    ["하나님이 세상을 이처럼 사랑하사 독생자를 주셨으니", "ha-na-nim-i se-sang-eul i-cheo-reom sa-rang-ha-sa dok-saeng-ja-reul ju-syeoss-seu-ni", "[Bible John 3:16] God so loved the world that he gave his one and only Son."],
    ["나는 포도나무요 너희는 가지니", "na-neun po-do-na-mu-yo neo-hui-neun ga-ji-ni", "[Bible John 15:5] I am the vine; you are the branches."],
    ["하나님의 말씀은 살아 있고 능력이 있어", "ha-na-nim-ui mal-sseum-eun sal-a iss-go neung-ryeok-i iss-eo", "[Bible Hebrews 4:12] The word of God is alive and active."]
  ],

  "5. Wall of Text": [
    ["오늘은 날씨가 정말 좋았어요. 그래서 친구와 함께 한강 공원에 갔어요. 우리는 자전거를 타고 강을 따라 달렸어요. 점심에는 치킨을 시켜서 잔디밭에서 먹었어요.",
     "(Read it chunk by chunk — click each word as you go!)",
     "The weather was really nice today, so I went to Han River Park with a friend. We rode bikes along the river. For lunch we ordered chicken and ate it on the grass."],
    
    ["저는 작년부터 한국어를 공부하기 시작했어요. 처음에는 한글을 읽는 것도 어려웠지만, 매일 조금씩 연습했더니 점점 쉬워졌어요. 이제는 간단한 대화도 할 수 있어요.",
     "(One word at a time. Slow is fine. Smooth comes later.)",
     "I started studying Korean last year. At first even reading Hangul was hard, but I practiced a little every day and it gradually got easier. Now I can even have simple conversations."],

    ["주님은 나의 목자시니 내가 부족함이 없으리로다. 그가 나를 푸른 풀밭에 누이시며 쉴 만한 물 가에로 인도하시는도다. 내 영혼을 소생시키시고 자기 이름을 위하여 의의 길로 인도하시는도다.",
     "(Bible - Psalm 23:1-3. Click each word as you read.)",
     "[Bible Psalm 23:1-3] The Lord is my shepherd; I shall not want. He makes me lie down in green pastures."],

    ["하나님이 세상을 이처럼 사랑하사 독생자를 주셨으니 이는 그를 믿는 자마다 멸망하지 않고 영생을 얻게 함이니라.",
     "(Bible - John 3:16. Most famous verse.)",
     "[Bible John 3:16] For God so loved the world that he gave his one and only Son."]
  ],

  "6. Bible Sentences": [
    // These will be populated dynamically from sermons.bo-bob.org
    ["주님은 나의 목자시니", "(Psalm 23:1)", "[Bible] The Lord is my shepherd"],
    ["하나님이 세상을 이처럼 사랑하사", "(John 3:16)", "[Bible] God so loved the world"]
  ],

  "7. Bible Passages": [
    // These will be populated dynamically from sermons.bo-bob.org
    ["주님은 나의 목자시니 내가 부족함이 없으리로다.",
     "(Psalm 23:1)",
     "[Bible Psalm 23:1] The Lord is my shepherd; I shall not want."]
  ]
};

// Attribution metadata for Bible content
const ATTRIBUTION_DATA = {
  "5. Wall of Text": {
    bibleLevel: true,
    source: "sermons.bo-bob.org/bible",
    translation: "Korean Bible (개역한글/개역개정)"
  },
  "6. Bible Sentences": {
    bibleLevel: true,
    source: "sermons.bo-bob.org/bible",
    translation: "Korean Bible (개역한글/개역개정)"
  },
  "7. Bible Passages": {
    bibleLevel: true,
    source: "sermons.bo-bob.org/bible",
    translation: "Korean Bible (개역한글/개역개정)"
  }
};
