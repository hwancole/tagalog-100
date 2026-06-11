window.LESSONS = window.LESSONS || {};
window.LESSONS[7] = {
  day: 7,
  title: "요일 + 시간 말하기 + 하루 일과",
  sections: [
    {
      title: "1교시. 요일 — 스페인어의 선물",
      blocks: [
        { type: "p", text: "복습의 날을 잘 통과했다면 오늘은 한 템포 가볍게, 대신 실용성 만점인 시간 표현입니다. 요일은 전부 스페인어에서 왔습니다:" },
        { type: "table", columns: ["요일", "타갈로그어", "발음"], speakCol: 1, rows: [
          ["월요일", "Lunes", "루네스"],
          ["화요일", "Martes", "마르떼스"],
          ["수요일", "Miyerkules", "미예르꿀레스"],
          ["목요일", "Huwebes", "후웨베스"],
          ["금요일", "Biyernes", "비예르네스"],
          ["토요일", "Sabado", "사바도"],
          ["일요일", "Linggo", "링고"]
        ] },
        { type: "examples", items: [
          { tl: "Anong araw ngayon?", ko: "오늘 무슨 요일이야?" },
          { tl: "Biyernes na!", ko: "벌써 금요일이야! (na의 어감 활용)" }
        ] },
        { type: "tip", text: "Linggo는 두 얼굴입니다: 대문자 Linggo = 일요일, 소문자 linggo = 주(week). \"isang linggo\" = 일주일, \"sa Linggo\" = 일요일에." }
      ]
    },
    {
      title: "2교시. 시간 말하기 — alas + 스페인 숫자",
      blocks: [
        { type: "p", text: "4일차에서 돈은 스페인 숫자라고 했죠? **시간도 스페인 숫자**입니다. 공식: **alas + 숫자** (1시만 ala-una)." },
        { type: "table", columns: ["시각", "표현", "발음"], speakCol: 1, rows: [
          ["1시", "ala-una", "알라 우나"],
          ["2시", "alas-dos", "알라스 도스"],
          ["3시", "alas-tres", "알라스 뜨레스"],
          ["4시", "alas-kwatro", "알라스 꽈뜨로"],
          ["5시", "alas-singko", "알라스 싱꼬"],
          ["6시", "alas-sais", "알라스 사이스"],
          ["7시", "alas-siyete", "알라스 시예떼"],
          ["8시", "alas-otso", "알라스 옷소"],
          ["9시", "alas-nuwebe", "알라스 누웨베"],
          ["10시", "alas-diyes", "알라스 디예스"],
          ["11시", "alas-onse", "알라스 온세"],
          ["12시", "alas-dose", "알라스 도세"]
        ] },
        { type: "examples", items: [
          { tl: "Anong oras na?", ko: "지금 몇 시야?" },
          { tl: "Alas-otso na.", ko: "8시야. (벌써 8시)" },
          { tl: "alas-tres y medya", ko: "3시 반 (y medya = 30분)" },
          { tl: "alas-sais ng umaga / ng gabi", ko: "아침 6시 / 저녁 6시" }
        ] }
      ]
    },
    {
      title: "3교시. 하루 일과 말하기",
      blocks: [
        { type: "p", text: "일과를 말할 때는 진행형을 씁니다(습관 = 진행형, 2일차에서 배운 그 용법!). 시간 앞에는 **nang**을 붙입니다(회화에선 ng와 발음이 같아 들리는 대로 따라 하면 됩니다)." },
        { type: "examples", items: [
          { tl: "Gumigising ako nang alas-sais.", ko: "나 6시에 일어나. (gumising 일어나다, -um-)" },
          { tl: "Pumapasok ako sa trabaho nang alas-otso.", ko: "나 8시에 출근해. (pumasok 출근/등교하다)" },
          { tl: "Umuuwi ako nang alas-singko.", ko: "나 5시에 집에 가. (3일차 umuwi!)" },
          { tl: "Natutulog ako nang alas-onse.", ko: "나 11시에 자." }
        ] },
        { type: "tip", text: "matulog(자다)는 세 번째 동사 가족인 **ma- 동사**입니다. 변화는 mag-와 같은 원리: natulog(잤다) → natutulog(자는 중/잔다) → matutulog(잘 거다). 가족이 하나 늘었지만 규칙은 이미 아는 것 — n이면 과거 쪽, m이면 미래." }
      ]
    },
    {
      title: "4교시. 오늘의 단어 15개 (시간·빈도)",
      blocks: [
        { type: "table", columns: ["단어", "뜻"], speakCol: 0, rows: [
          ["linggo", "주(week) / Linggo 일요일"],
          ["buwan", "달/월 (달님도 buwan)"],
          ["taon", "년/해"],
          ["tanghali", "정오/한낮"],
          ["madaling-araw", "새벽"],
          ["maaga", "이른/일찍"],
          ["huli", "늦은/늦게"],
          ["araw-araw", "매일"],
          ["gabi-gabi", "매일 밤"],
          ["tuwing", "매~ (tuwing Lunes 매주 월요일)"],
          ["palagi", "항상"],
          ["minsan", "가끔"],
          ["kanina", "아까 (오늘 안의 과거)"],
          ["pahinga", "휴식"],
          ["gising", "깨어있는 (Gising na! 일어나!)"]
        ] },
        { type: "examples", items: [
          { tl: "Nag-aaral ako ng Tagalog araw-araw.", ko: "나 매일 타갈로그어 공부해." },
          { tl: "Minsan, kumakain kami sa labas tuwing Sabado.", ko: "가끔 우리는 토요일마다 밖에서 먹어." }
        ] }
      ]
    },
    {
      title: "5교시. 현지인 미션 (오늘 안에 실행)",
      blocks: [
        { type: "list", ordered: true, items: [
          "주변 필리핀 사람에게 \"Anong oras na?\" 물어보고, 대답(alas-___)을 알아듣기. 시계를 봐도 되니 답을 예상하고 물으면 리스닝이 쉬워집니다.",
          "자기 일과 한 문장 말해보기: \"Gumigising ako nang alas-___.\" — 상대가 알아들으면 성공.",
          "오늘 요일 확인 대화: \"Anong araw ngayon?\" → 상대 대답 듣고 \"Ah, ___ na pala!\"(아 벌써 ___구나!) 하고 받아치기."
        ] },
        { type: "tip", text: "필리핀 사람들은 시간을 영어로 말할 때도 많습니다(eight thirty 등). 상대가 영어 숫자로 답해도 당황하지 말고, 속으로 alas- 버전으로 바꿔보는 것까지가 오늘 훈련입니다." }
      ]
    }
  ],
  quiz: [
    { type: "choice", q: "\"월요일\"은 타갈로그어로?",
      options: ["Lunes", "Martes", "Biyernes", "Sabado"], answer: 0,
      explain: "Lunes(월) → Martes(화) → Miyerkules(수) → Huwebes(목) → Biyernes(금) → Sabado(토) → Linggo(일)." },
    { type: "input", q: "\"오늘 무슨 요일이야?\"를 타갈로그어로?",
      answers: ["anong araw ngayon", "ano ang araw ngayon"],
      explain: "Anong araw ngayon? araw는 해/날/요일을 모두 커버합니다." },
    { type: "choice", q: "alas-otso는 몇 시?",
      options: ["8시", "7시", "11시", "4시"], answer: 0,
      explain: "otso = 8 (스페인 숫자). 돈도 시간도 스페인 숫자!" },
    { type: "input", q: "\"지금 몇 시야?\"를 타갈로그어로?",
      answers: ["anong oras na", "ano ang oras", "anong oras"],
      explain: "Anong oras na? — na가 붙어 '(벌써) 몇 시 됐어?'의 어감." },
    { type: "choice", q: "Linggo / linggo의 두 가지 뜻은?",
      options: ["일요일 / 주(week)", "월요일 / 달(month)", "일요일 / 년(year)", "토요일 / 주말"], answer: 0,
      explain: "대문자 Linggo = 일요일, 소문자 linggo = 주. isang linggo = 일주일." },
    { type: "input", q: "\"나 매일 타갈로그어 공부해\"를 타갈로그어로?",
      answers: ["nag-aaral ako ng tagalog araw-araw", "araw-araw nag-aaral ako ng tagalog", "nag-aaral ako araw-araw ng tagalog", "nagaaral ako ng tagalog araw-araw"],
      explain: "습관은 진행형으로: nag-aaral. araw-araw = 매일." },
    { type: "choice", q: "gabi-gabi의 뜻은?",
      options: ["매일 밤", "어젯밤", "오늘 밤", "심야"], answer: 0,
      explain: "단어 반복 = 매~: araw-araw(매일), gabi-gabi(매일 밤), linggo-linggo(매주)." },
    { type: "input", q: "gumising(일어나다)의 진행형(습관형)은?",
      answers: ["gumigising"],
      explain: "-um- 진행: um 유지 + 첫음절 반복 → gumigising." },
    { type: "choice", q: "Natutulog siya — 무슨 뜻?",
      options: ["그는 자는 중이야", "그는 잤어", "그는 잘 거야", "그는 일어났어"], answer: 0,
      explain: "ma- 동사 matulog: natulog(잤다) / natutulog(자는 중) / matutulog(잘 거다)." },
    { type: "input", q: "(응용) \"나 6시에 일어나\"를 만들어보세요.",
      answers: ["gumigising ako nang alas-sais", "gumigising ako ng alas-sais", "gumigising ako nang alas sais", "gumigising ako ng alas sais"],
      explain: "Gumigising ako nang alas-sais. 습관 = 진행형, 시간 앞엔 nang. 오늘 배운 게 전부 들어간 문장!" }
  ]
};
