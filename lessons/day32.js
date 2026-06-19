window.LESSONS = window.LESSONS || {};
window.LESSONS[32] = {
  day: 32,
  title: "듣기 집중 — 쏟아지는 숫자 실시간으로 잡기",
  sections: [
    {
      title: "1교시. 두 숫자 체계 복습 + 큰 수 완성",
      blocks: [
        { type: "p", text: "숫자가 안 들리는 이유: 필리핀은 상황마다 다른 숫자 체계를 씁니다. 한 화면에 정리합니다:" },
        { type: "table", columns: ["용도", "체계", "예시"], speakCol: 2, rows: [
          ["개수 세기", "타갈로그", "isa, dalawa, tatlo... (4일차)"],
          ["가격·돈", "스페인", "bente, singkwenta... (4일차)"],
          ["시간", "스페인(alas-)", "alas-otso, alas-dose (7일차)"],
          ["전화번호·나이·연도", "영어 섞어 자유롭게", "twenty, ninety-five..."]
        ] },
        { type: "p", text: "큰 수 타갈로그 완성: **daan**(백), **libo**(천), **milyon**(백만). 가격에서는 스페인·영어와 섞입니다:" },
        { type: "examples", items: [
          { tl: "isang daan / dalawang daan", ko: "100 / 200" },
          { tl: "isang libo / limang libo", ko: "1,000 / 5,000" },
          { tl: "beinte mil", ko: "20,000 (스페인 mil = 천)" }
        ] },
        { type: "tip", text: "실전 현실: 점원이 \"singkwenta\"라 하든 \"fifty\"라 하든 \"limampu\"라 하든 전부 50입니다. 세 체계를 다 알아둬야 하는 이유 — 어느 게 튀어나올지 모르거든요. 가격은 스페인, 큰 단위는 영어(thousand)가 제일 흔합니다." }
      ]
    },
    {
      title: "2교시. 가격 듣기 드릴 — 시장·가게 실전",
      blocks: [
        { type: "p", text: "점원이 말하는 가격을 듣고 숫자로 변환하는 훈련입니다. 소리 내어 읽고 → 금액 맞히기:" },
        { type: "examples", items: [
          { tl: "Otsenta-singko pesos.", ko: "= 85페소" },
          { tl: "Sandaan at limampu.", ko: "= 150페소 (sandaan = isang daan 100, at 그리고)" },
          { tl: "Tatlong daan, bente.", ko: "= 320페소" },
          { tl: "Isang libo't limang daan.", ko: "= 1,500 ('t = at의 축약, 31일차 연음!)" },
          { tl: "Dalawampu't lima.", ko: "= 25 (dalawampu 20 + 't + lima 5)" }
        ] },
        { type: "tip", text: "**핵심 연결고리 't (= at)**: 큰 수와 작은 수를 이을 때 at이 't로 줄어 붙습니다. dalawampu't lima(25), sandaan at limampu(150). 't 소리가 들리면 '앞 숫자 + 뒤 숫자'를 더하면 됩니다." }
      ]
    },
    {
      title: "3교시. 시간·전화번호·약속 듣기",
      blocks: [
        { type: "examples", items: [
          { tl: "Alas-singko y medya ng hapon.", ko: "오후 5시 반 (y medya = 30분, 7일차)" },
          { tl: "Mga alas-otso siguro.", ko: "8시쯤 아마. (mga = ~쯤, siguro = 아마)" },
          { tl: "Sa Sabado, mga tanghali.", ko: "토요일, 점심때쯤." },
          { tl: "Zero nine one seven... (전화번호)", ko: "필리핀 번호는 보통 영어로 또박또박 불러줍니다" }
        ] },
        { type: "tip", text: "**mga의 새 용법 = ~쯤(대략)**: 17일차 복수 표시 mga가 숫자·시간 앞에서는 '대략'이 됩니다. mga alas-otso(8시쯤), mga sampu(열 개쯤), mga isang oras(한 시간쯤). 약속 시간에 mga가 붙으면 'Filipino Time 여유분 포함'이라는 신호이기도 합니다." }
      ]
    },
    {
      title: "4교시. 오늘의 단어 12개 (수량·단위)",
      blocks: [
        { type: "table", columns: ["단어", "뜻"], speakCol: 0, rows: [
          ["daan", "백 (sandaan = 100)"],
          ["libo", "천"],
          ["milyon", "백만"],
          ["kalahati", "절반 (4일차 재등장)"],
          ["dosena", "다스/12개"],
          ["piraso", "개/조각 (3 piraso = 3개)"],
          ["kilo", "킬로그램"],
          ["litro", "리터"],
          ["porsyento", "퍼센트 (50 porsyento off!)"],
          ["mga", "~쯤/대략 (숫자 앞)"],
          ["humigit-kumulang", "대략/약 (격식)"],
          ["eksakto", "정확히 (Eksakto! 딱 맞아!)"]
        ] },
        { type: "examples", items: [
          { tl: "Tatlong piraso, singkwenta pesos lahat.", ko: "세 개에 전부 50페소." },
          { tl: "Kalahating kilo lang po.", ko: "반 킬로만요." }
        ] }
      ]
    },
    {
      title: "5교시. 현지인 미션 (오늘 안에 실행)",
      blocks: [
        { type: "list", ordered: true, items: [
          "**가격 받아쓰기**: 오늘 가게·시장에서 \"Magkano?\" 묻고, 점원의 대답 숫자를 (영어로 되묻지 말고) 한 번에 알아듣기 도전. 성공하면 자기 자신에게 박수.",
          "**시간 약속 듣기**: 누군가와 시간을 정할 때 상대가 말한 시각(alas-___)을 복창해서 확인 — \"Alas-tres? Sige!\" 복창은 듣기 확인의 최고 기술입니다.",
          "**mga 듣기 감지**: 오늘 mga가 '복수'로 쓰였는지 '~쯤'으로 쓰였는지 문맥으로 구분해보기 — mga tao(사람들) vs mga alas-otso(8시쯤)."
        ] },
        { type: "tip", text: "숫자 듣기는 반복이 답입니다. 매일 사는 물건의 가격을 타갈로그어 숫자로 미리 예상하고 → 점원 말로 확인하는 습관을 들이면, 한 주 안에 가격은 자동으로 들립니다. 내일은 노래로 듣기 훈련 — 좀 더 즐거운 방식입니다." }
      ]
    }
  ],
  quiz: [
    { type: "choice", q: "가격 \"singkwenta\", 시간 \"alas-singko\", 개수 \"lima\" — 공통적으로 가리키는 숫자는?",
      options: ["5 (체계만 다름)", "전부 다른 숫자", "50", "15"], answer: 0,
      explain: "lima(타갈로그 5), singko(스페인 5), alas-singko(5시). 한 숫자, 세 얼굴." },
    { type: "choice", q: "\"Otsenta-singko\"는 얼마?",
      options: ["85", "58", "95", "805"], answer: 0,
      explain: "otsenta(80) + singko(5) = 85." },
    { type: "input", q: "sandaan은 숫자로?",
      answers: ["100", "isang daan"],
      explain: "sandaan = isang daan = 100. daan = 백." },
    { type: "choice", q: "\"Dalawampu't lima\"는?",
      options: ["25", "20", "205", "52"], answer: 0,
      explain: "dalawampu(20) + 't(at) + lima(5) = 25. 't가 들리면 더하기!" },
    { type: "choice", q: "축약 't의 정체는?",
      options: ["at(그리고) — 숫자를 잇는 연결어", "ito(이것)", "ate(누나)", "복수 표시"], answer: 0,
      explain: "isang libo't limang daan = 1,000 and 500 = 1,500." },
    { type: "input", q: "\"천\"을 타갈로그어로?",
      answers: ["libo"],
      explain: "libo(천), daan(백), milyon(백만)." },
    { type: "choice", q: "\"Mga alas-otso siguro\"의 mga 뜻은?",
      options: ["~쯤 (대략)", "복수 표시", "~만", "정확히"], answer: 0,
      explain: "숫자·시간 앞 mga = 대략. '8시쯤 아마'." },
    { type: "input", q: "\"반 킬로만요\"를 타갈로그어로?",
      answers: ["kalahating kilo lang", "kalahating kilo lang po"],
      explain: "kalahati(절반) + ng + kilo + lang. 시장 단골 주문." },
    { type: "choice", q: "약속 시간에 mga가 붙으면(mga alas-otso) 숨은 신호는?",
      options: ["Filipino Time 여유분 포함", "정확히 그 시각", "취소될 수 있음", "아침이라는 뜻"], answer: 0,
      explain: "mga = 대략 → 딱 그 시각은 아닐 수 있다는 부드러운 신호." },
    { type: "input", q: "(응용) \"세 개에 전부 100페소\"를 만들어보세요.",
      answers: ["tatlong piraso isang daan lahat", "tatlong piraso sandaan lahat", "tatlong piraso, isang daan lahat"],
      explain: "tatlong piraso(세 개) + isang daan/sandaan(100) + lahat(전부). 수량+가격+lahat의 시장 완성문." }
  ]
};
