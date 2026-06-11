window.LESSONS = window.LESSONS || {};
window.LESSONS[6] = {
  day: 6,
  title: "복습의 날 — 1~5일차 총정리 + 누적 퀴즈 20문제",
  sections: [
    {
      title: "1교시. 문장 패턴 지도 — 지금까지 배운 5가지 무기",
      blocks: [
        { type: "p", text: "5일 동안 배운 걸 패턴 5개로 압축하면 이렇습니다. 이 표가 머릿속에 있으면 웬만한 일상 문장은 다 만들 수 있어요:" },
        { type: "table", columns: ["패턴", "공식", "예문"], speakCol: 2, rows: [
          ["상태/정체 말하기", "형용사·명사 + 대명사", "Gutom ako. (나 배고파)"],
          ["행동 말하기", "동사 + 대명사 (+ ng 목적어)", "Nagluto ako ng adobo."],
          ["있다/없다", "May+명사+대명사 / Wala+대명사ng+명사", "May pera ako. / Wala akong pera."],
          ["원해/싫어", "Gusto·Ayaw + ko + ng명사 / kong동사", "Gusto ko ng kape."],
          ["질문하기", "Ano/Saan/Sino + ... + ba?", "Saan tayo kakain?"]
        ] },
        { type: "tip", text: "be동사 없음, 어순은 서술어가 먼저. 이 두 가지가 타갈로그어의 큰 그림입니다." }
      ]
    },
    {
      title: "2교시. 동사 변화 한 판 정리 — mag- vs -um-",
      blocks: [
        { type: "table", columns: ["상", "mag- (luto 요리)", "-um- (kain 먹다)", "기억 포인트"], speakCol: 1, rows: [
          ["완료", "nagluto", "kumain", "mag-는 n으로 시작, -um-은 기본형 그대로"],
          ["진행", "nagluluto", "kumakain", "둘 다 첫음절 더듬기"],
          ["예정", "magluluto", "kakain", "mag-는 m 유지, -um-은 um이 사라짐!"]
        ] },
        { type: "p", text: "헷갈리면 이 두 줄만 기억하세요: **mag-는 첫 글자(n/m)로 과거·미래를 구분**하고, **-um-은 um의 유무로 과거·미래를 구분**합니다(있으면 과거 쪽, 없으면 미래)." },
        { type: "examples", items: [
          { tl: "Nag-aral ako kahapon.", ko: "나 어제 공부했어." },
          { tl: "Kumakain siya ngayon.", ko: "그는 지금 먹는 중이야." },
          { tl: "Pupunta tayo sa palengke bukas.", ko: "우리 내일 시장 갈 거야." }
        ] }
      ]
    },
    {
      title: "3교시. 대명사 두 세트 + 링커 최종 정리",
      blocks: [
        { type: "table", columns: ["ang형 (주어용)", "ng형 (소유·gusto용)", "뜻"], speakCol: 0, rows: [
          ["ako", "ko", "나"],
          ["ikaw / ka", "mo", "너"],
          ["siya", "niya", "그/그녀"],
          ["kami (청자 제외)", "namin", "우리"],
          ["tayo (청자 포함)", "natin", "우리"],
          ["kayo", "ninyo", "당신(들)"],
          ["sila", "nila", "그들"]
        ] },
        { type: "tip", text: "링커 복습: 단어와 단어를 이을 때 모음·n으로 끝나면 -ng(magandang bahay), 자음이면 na(malamig na tubig). kita = ko+ka(내가 너를)도 잊지 마세요 — Mahal kita!" }
      ]
    },
    {
      title: "4교시. 생존 문장 베스트 15 (입에서 자동으로 나올 때까지)",
      blocks: [
        { type: "p", text: "지금까지 나온 문장 중 사용 빈도 최상위 15개입니다. 눈으로 읽지 말고, 하나당 소리 내어 3번씩:" },
        { type: "examples", items: [
          { tl: "Kumusta po kayo?", ko: "안녕하세요? (어떻게 지내세요?)" },
          { tl: "Salamat po. / Walang anuman.", ko: "감사합니다. / 천만에요." },
          { tl: "Kumain ka na ba?", ko: "밥 먹었어? (국민 인사)" },
          { tl: "Hindi pa. / Kumain na ako.", ko: "아직. / 이미 먹었어." },
          { tl: "Anong ginagawa mo?", ko: "뭐 해?" },
          { tl: "Saan tayo kakain?", ko: "우리 어디서 먹을까?" },
          { tl: "Tara, kain tayo!", ko: "가자, 같이 먹자!" },
          { tl: "Magkano po ito?", ko: "이거 얼마예요?" },
          { tl: "Ang mahal naman! Pwede po bang tumawad?", ko: "너무 비싸요! 깎아주실 수 있나요?" },
          { tl: "May ___ po ba kayo?", ko: "___ 있나요?" },
          { tl: "Wala akong barya.", ko: "잔돈이 없어요." },
          { tl: "Gusto ko po ng ___.", ko: "___ 주세요. (주문 만능)" },
          { tl: "Ayoko!", ko: "싫어!" },
          { tl: "Pwede po bang Tagalog lang? Nag-aaral pa ako.", ko: "타갈로그어로만 해주실 수 있나요? 아직 배우는 중이에요." },
          { tl: "Uuwi na ako.", ko: "나 이제 집에 갈게." }
        ] }
      ]
    },
    {
      title: "5교시. 현지인 미션 — 종합 실전 (오늘 안에 실행)",
      blocks: [
        { type: "p", text: "오늘은 새 내용이 없는 대신 미션이 큽니다. 5일치를 한 번에 실전 투입하세요:" },
        { type: "list", ordered: true, items: [
          "**가게 풀코스**: 인사(Magandang hapon po) → 물건 찾기(May ___ po ba kayo?) → 가격 묻기(Magkano po?) → 계산(Salamat po)까지 영어 없이 완주하기.",
          "**스몰토크**: 주변 필리핀 사람에게 Kumain ka na ba?로 말 걸고, 이어서 Ano ang paborito mong pagkain? 까지 던져보기.",
          "**5문장 자기소개 도전**: \"Kumusta! Koreano ako. Nag-aaral ako ng Tagalog. Gusto ko ng maanghang na pagkain. Salamat!\" — 거울 보고 연습한 뒤 실제 사람 앞에서 말해보기."
        ] },
        { type: "tip", text: "누적 퀴즈에서 틀린 문제가 나온 일차는 오늘 저녁에 해당 교시만 다시 읽어보세요. 복습의 날의 진짜 목적은 점수가 아니라 구멍 찾기입니다." }
      ]
    }
  ],
  quiz: [
    { type: "input", q: "[1일차] \"나 행복해\"를 타갈로그어로?",
      answers: ["masaya ako"],
      explain: "masaya(행복한) + ako(나). 형용사 + 대명사 패턴." },
    { type: "choice", q: "[1일차] 듣는 사람을 포함한 \"우리\"는?",
      options: ["tayo", "kami", "sila", "kayo"], answer: 0,
      explain: "tayo = 너 포함 우리, kami = 너 빼고 우리. 식사 제안은 항상 Kain tayo!" },
    { type: "input", q: "[2일차] magluto(요리하다)의 완료형은?",
      answers: ["nagluto"],
      explain: "mag- 동사의 완료는 nag-." },
    { type: "input", q: "[2일차] \"나 일했어\"를 타갈로그어로?",
      answers: ["nagtrabaho ako"],
      explain: "nagtrabaho(일했다) + ako." },
    { type: "choice", q: "[2일차] naglilinis — 무슨 뜻?",
      options: ["청소하는 중", "청소했다", "청소할 것이다", "청소해라"], answer: 0,
      explain: "nag + li(첫음절 반복) + linis = 진행형." },
    { type: "input", q: "[3일차] \"그녀는 갔어\"를 타갈로그어로?",
      answers: ["pumunta siya"],
      explain: "pumunta(갔다) + siya. -um- 동사는 기본형이 곧 완료형." },
    { type: "input", q: "[3일차] kumain(먹다)의 예정형은?",
      answers: ["kakain"],
      explain: "-um- 동사의 예정형은 um이 사라지고 첫음절 반복만: kakain." },
    { type: "choice", q: "[3일차] \"Kumain ka na ba?\"에 \"아직 안 먹었어\"라고 답하려면?",
      options: ["Hindi pa", "Oo na", "Wala na", "Ayoko"], answer: 0,
      explain: "hindi(아니) + pa(아직) = 아직이야. 이미 먹었으면 Kumain na ako." },
    { type: "input", q: "[4일차] \"나 질문 있어\"를 타갈로그어로?",
      answers: ["may tanong ako"],
      explain: "may + tanong(질문) + ako." },
    { type: "input", q: "[4일차] \"나 시간 없어\"를 타갈로그어로?",
      answers: ["wala akong oras"],
      explain: "wala + akong + oras. wala 뒤의 ako에는 링커 -ng!" },
    { type: "choice", q: "[4일차] 점원이 \"Bente po\"라고 했다면 얼마?",
      options: ["20페소", "12페소", "25페소", "200페소"], answer: 0,
      explain: "bente = 20. 돈은 스페인 숫자로!" },
    { type: "input", q: "[5일차] \"나 맥주 마시고 싶어\"를 타갈로그어로?",
      answers: ["gusto ko ng serbesa"],
      explain: "gusto ko ng + 명사. serbesa = 맥주." },
    { type: "input", q: "[5일차] \"네 친구\"를 타갈로그어로?",
      answers: ["kaibigan mo"],
      explain: "kaibigan(친구) + mo(너의). 소유는 명사 뒤에 ng형 대명사." },
    { type: "choice", q: "[5일차] Ayaw niya ng matamis — 무슨 뜻?",
      options: ["걔는 단 거 싫어해", "걔는 단 거 좋아해", "나는 단 거 싫어해", "걔는 매운 거 싫어해"], answer: 0,
      explain: "ayaw(싫다) + niya(그/그녀) + ng matamis(단 것)." },
    { type: "choice", q: "[종합] 다음 중 \"예정(미래)\"이 **아닌** 것은?",
      options: ["nagluluto", "magluluto", "kakain", "pupunta"], answer: 0,
      explain: "nagluluto는 n으로 시작하니 과거 쪽(진행)입니다. mag-는 m이면 미래, -um-은 um이 없으면 미래." },
    { type: "input", q: "[1일차] \"이거 얼마예요?\"를 타갈로그어로?",
      answers: ["magkano ito", "magkano po ito"],
      explain: "Magkano po ito? 1일차 생존 문장, 이젠 자동으로 나와야 합니다." },
    { type: "input", q: "[5일차] \"맛있는 음식\"을 타갈로그어로? (링커 주의)",
      answers: ["masarap na pagkain"],
      explain: "masarap이 자음(p)으로 끝나니 링커는 na: masarap na pagkain." },
    { type: "choice", q: "[5일차] \"예쁜 집\"으로 올바른 것은?",
      options: ["magandang bahay", "maganda na bahay", "maganda bahay", "bahay maganda"], answer: 0,
      explain: "maganda는 모음(a)으로 끝나니 -ng를 붙여 magandang bahay." },
    { type: "input", q: "[응용] \"우리(같이) 내일 시장에 갈 거야\"를 만들어보세요.",
      answers: ["pupunta tayo sa palengke bukas", "bukas pupunta tayo sa palengke", "pupunta tayo bukas sa palengke"],
      explain: "pupunta(갈 것이다) + tayo + sa palengke(시장에) + bukas(내일)." },
    { type: "input", q: "[최종 보스] \"나 차가운 맥주 마시고 싶어\"를 만들어보세요.",
      answers: ["gusto ko ng malamig na serbesa"],
      explain: "gusto ko ng + malamig na serbesa. gusto 패턴 + 링커 na까지, 5일치 총집합 문장! 이게 됐다면 1주차 합격입니다." }
  ]
};
