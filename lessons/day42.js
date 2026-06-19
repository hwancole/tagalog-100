window.LESSONS = window.LESSONS || {};
window.LESSONS[42] = {
  day: 42,
  title: "일기 쓰기 — 하루를 타갈로그어로 남기기",
  sections: [
    {
      title: "1교시. 일기의 뼈대 — 시간 순서로 하루 엮기",
      blocks: [
        { type: "p", text: "28일차 말하기 스토리텔링의 쓰기 버전입니다. 일기는 '하루의 사건을 시간 순서로 + 감정으로 마무리'면 됩니다. 시간 표지를 따라 엮으세요:" },
        { type: "table", columns: ["시간 표지", "뜻"], speakCol: 0, rows: [
          ["Kaninang umaga,", "오늘 아침에,"],
          ["Tapos,", "그다음에,"],
          ["Sa tanghali,", "점심때,"],
          ["Kaninang hapon,", "오늘 오후에,"],
          ["Kanina lang,", "방금 전에,"],
          ["Sa wakas,", "마침내,"],
          ["Bukas naman,", "내일은,"]
        ] },
        { type: "tip", text: "일기는 대부분 과거(완료형) + 시간 표지의 반복입니다. \"Kaninang umaga, gumising ako nang alas-sais. Tapos, nag-jogging ako.\" 7일차 일과 표현이 과거형으로 바뀌었을 뿐 — 이미 가진 도구의 재배열입니다." }
      ]
    },
    {
      title: "2교시. 모델 일기 1 — 평범한 하루",
      blocks: [
        { type: "p", text: "전부 배운 단어로 쓴 실제 일기 한 편입니다. 소리 내어 읽고, 자기 하루로 바꿔보세요:" },
        { type: "examples", items: [
          { tl: "Kaninang umaga, gumising ako nang maaga. Nag-almusal ako ng kanin at itlog.", ko: "오늘 아침 일찍 일어났다. 밥과 계란으로 아침을 먹었다." },
          { tl: "Tapos, pumunta ako sa trabaho. Grabe ang traffic!", ko: "그다음 출근했다. 차가 엄청 막혔다!" },
          { tl: "Sa tanghali, kumain kami ng kasama ko sa labas.", ko: "점심엔 동료랑 밖에서 먹었다." },
          { tl: "Pagod ako ngayon, pero masaya. Bukas naman, Sabado na!", ko: "오늘 피곤하지만 행복하다. 내일은 토요일이다!" }
        ] },
        { type: "tip", text: "이 일기에 1~41일치가 녹아 있습니다: gumising/nag-almusal(7·24일차), traffic(22일차), kasama(25일차), 감정 마무리(1일차). 일기 쓰기는 '배운 걸 꺼내 쓰는' 출력 훈련 — 새 입력이 아니라 인출입니다." }
      ]
    },
    {
      title: "3교시. 모델 일기 2 — 감정과 생각 담기",
      blocks: [
        { type: "p", text: "사건만 나열하면 일지, 감정·생각이 들어가면 일기입니다. 마음을 담는 표현들:" },
        { type: "examples", items: [
          { tl: "Naisip ko kanina...", ko: "아까 문득 생각했다... (naisip = 생각이 들었다)" },
          { tl: "Masaya ako kasi natuto na ako ng marami.", ko: "많이 배워서 행복하다." },
          { tl: "Sana, mas gumaling pa ako sa Tagalog.", ko: "타갈로그어가 더 늘면 좋겠다. (33일차 sana!)" },
          { tl: "Minsan nahihirapan ako, pero hindi ako susuko.", ko: "가끔 힘들지만, 포기하지 않을 거다. (nahihirapan = 힘들어하다, susuko 34일차)" }
        ] },
        { type: "tip", text: "일기 마무리 3종: ① 소망(Sana...~면 좋겠다) ② 다짐(Hindi ako susuko 포기 안 해) ③ 감사(Salamat sa araw na ito 오늘 하루 감사). 하나만 붙여도 일기가 따뜻해집니다. 일기는 남에게 안 보이니 틀려도 0% 부담 — 최고의 안전한 연습장입니다." }
      ]
    },
    {
      title: "4교시. 오늘의 단어 12개 (사고·기록)",
      blocks: [
        { type: "table", columns: ["단어", "뜻"], speakCol: 0, rows: [
          ["naisip", "생각이 들었다 (isip 생각)"],
          ["naramdaman", "느꼈다 (damdamin 33일차 감정)"],
          ["natutunan", "배운 것/배웠다"],
          ["nahihirapan", "힘들어하다 (hirap 어려움)"],
          ["talaarawan", "일기 (tala 기록 + araw 날)"],
          ["karanasan", "경험"],
          ["pakiramdam", "기분/느낌 (12일차 재등장)"],
          ["umaasa", "바라다/희망하다 (39일차)"],
          ["nagpapasalamat", "감사하다 (salamat의 동사형)"],
          ["sa palagay ko", "내 생각엔 (의견 열기)"],
          ["sa tingin ko", "내가 보기엔 (의견 열기)"],
          ["dahil dito", "이것 때문에/그래서"]
        ] },
        { type: "tip", text: "**의견 열기 2종: Sa palagay ko / Sa tingin ko = 내 생각엔**. 일기뿐 아니라 대화에서 의견을 부드럽게 꺼낼 때도 핵심입니다 — \"Sa tingin ko, masarap dito\"(내 생각엔 여기 맛있어). 단정 대신 '내 생각엔'으로 여는 습관은 어디서나 환영받습니다." }
      ]
    },
    {
      title: "5교시. 현지인 미션 (오늘 안에 실행)",
      blocks: [
        { type: "list", ordered: true, items: [
          "**첫 타갈로그어 일기**: 오늘 하루를 3~5문장으로 기록 — [시간 표지 + 한 일] 반복 + 감정 마무리 한 줄. 2교시 모델을 자기 하루로 개조하면 5분이면 끝납니다.",
          "**매일 쓰기 시작**: 오늘부터 100일차까지 매일 짧은 타갈로그어 일기 쓰기를 습관으로 — 단 한 문장이라도. 58일 뒤 오늘 일기를 다시 보면 성장이 보일 겁니다.",
          "**감정 한 줄 챌린지**: 오늘 일기에 Sana(소망) 또는 Sa tingin ko(내 생각엔)를 한 번 넣어보기 — 사실 나열을 넘어 생각을 쓰는 연습."
        ] },
        { type: "tip", text: "일기는 100일 완주의 숨은 엔진입니다. 매일 쓰면 ① 그날 배운 단어를 인출하고 ② 자기 삶의 어휘(자주 하는 일)가 자동 강화되고 ③ 성장이 눈에 보여 동기가 유지됩니다. 부담 갖지 말고 한 문장부터. 내일은 SNS 게시물·댓글 쓰기 — 공개적인 쓰기로 한 발 더 나갑니다." }
      ]
    }
  ],
  quiz: [
    { type: "input", q: "\"오늘 아침에\"를 일기 표현으로?",
      answers: ["kaninang umaga", "kaninang umaga,"],
      explain: "Kaninang umaga, ___ . 일기의 시간 표지." },
    { type: "choice", q: "일기의 기본 동사 형태는?",
      options: ["과거(완료형)", "미래(예정형)", "명령형", "진행형만"], answer: 0,
      explain: "하루의 '있었던 일'이라 완료형 중심 + 시간 표지." },
    { type: "input", q: "\"많이 배워서 행복하다\"를 타갈로그어로? (kasi 활용)",
      answers: ["masaya ako kasi natuto na ako ng marami", "masaya ako kasi marami akong natutunan"],
      explain: "Masaya ako + kasi(왜냐하면) + natuto na ako ng marami." },
    { type: "choice", q: "\"Sana, mas gumaling pa ako sa Tagalog\"에서 sana의 역할은?",
      options: ["소망(~면 좋겠다)", "과거", "의문", "강조"], answer: 0,
      explain: "sana = ~면 좋겠다(33일차). 일기 마무리의 단골." },
    { type: "choice", q: "\"Sa tingin ko\"의 뜻은?",
      options: ["내가 보기엔/내 생각엔", "사실은", "예를 들어", "결론적으로"], answer: 0,
      explain: "Sa tingin ko / Sa palagay ko = 내 생각엔. 의견을 부드럽게 여는 표현." },
    { type: "input", q: "\"일기\"를 타갈로그어로?",
      answers: ["talaarawan"],
      explain: "talaarawan = tala(기록) + araw(날). 일기." },
    { type: "choice", q: "naisip의 뜻은?",
      options: ["생각이 들었다", "느꼈다", "배웠다", "잊었다"], answer: 0,
      explain: "isip(생각)에서 — '문득 생각났다'. naramdaman은 '느꼈다'." },
    { type: "choice", q: "사건 나열을 '일기'로 만드는 것은?",
      options: ["감정·생각을 담는 것", "더 긴 문장", "영어 섞기", "날짜 적기"], answer: 0,
      explain: "사건만이면 일지, 감정·생각이 들어가면 일기. Sana/Salamat/Sa tingin ko 한 줄로." },
    { type: "input", q: "\"가끔 힘들지만 포기하지 않을 거다\"의 뒷부분을 타갈로그어로? (susuko)",
      answers: ["hindi ako susuko", "pero hindi ako susuko"],
      explain: "Hindi ako susuko. 34일차 suko의 활용 — 일기 다짐 마무리." },
    { type: "input", q: "(응용) 일기 한 줄 \"오늘 아침 일찍 일어나서 출근했다\"를 만들어보세요.",
      answers: ["kaninang umaga gumising ako nang maaga tapos pumunta ako sa trabaho", "kaninang umaga, gumising ako nang maaga, tapos pumunta ako sa trabaho", "gumising ako nang maaga tapos pumunta ako sa trabaho"],
      explain: "Kaninang umaga, gumising ako nang maaga, tapos pumunta ako sa trabaho. 시간표지 + 과거동사 2개 + tapos 연결 — 일기의 기본 골격 완성입니다." }
  ]
};
