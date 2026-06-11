window.LESSONS = window.LESSONS || {};
window.LESSONS[4] = {
  day: 4,
  title: "숫자 + 돈 계산 + 있다/없다 (may/wala)",
  sections: [
    {
      title: "1교시. 타갈로그 숫자 1~10",
      blocks: [
        { type: "p", text: "오늘은 시장과 가게에서 살아남는 날입니다. 먼저 순수 타갈로그 숫자 1~10:" },
        { type: "table", columns: ["숫자", "타갈로그어", "발음"], speakCol: 1, rows: [
          ["1", "isa", "이사"],
          ["2", "dalawa", "달라와"],
          ["3", "tatlo", "따뜰로"],
          ["4", "apat", "아빳"],
          ["5", "lima", "리마"],
          ["6", "anim", "아님"],
          ["7", "pito", "삐또"],
          ["8", "walo", "왈로"],
          ["9", "siyam", "샴"],
          ["10", "sampu", "삼뿌"]
        ] },
        { type: "tip", text: "11~19는 labing- + 숫자(labing-isa = 11), 20·30·40…은 숫자 + -mpu(dalawampu = 20)입니다. 패턴만 알아두고, 큰 숫자는 2교시 방식이 실전에서 훨씬 많이 쓰입니다." }
      ]
    },
    {
      title: "2교시. 돈 얘기는 스페인 숫자로 (실전 필수)",
      blocks: [
        { type: "p", text: "여기가 오늘의 핵심 반전입니다. 필리핀 사람들은 **가격과 돈은 스페인어 계열 숫자**로 말합니다. 시장에서 \"Magkano po?\"라고 물으면 돌아오는 대답은 거의 이쪽이에요:" },
        { type: "table", columns: ["금액", "실전 표현", "발음"], speakCol: 1, rows: [
          ["10페소", "dyes", "디예스"],
          ["20페소", "bente", "벤떼"],
          ["30페소", "trenta", "뜨렌따"],
          ["40페소", "kwarenta", "꽈렌따"],
          ["50페소", "singkwenta", "싱꿴따"],
          ["60페소", "sisenta", "시센따"],
          ["70페소", "setenta", "세뗀따"],
          ["80페소", "otsenta", "옷센따"],
          ["90페소", "nobenta", "노벤따"],
          ["100페소", "isang daan / one hundred", "이상 다안"]
        ] },
        { type: "examples", items: [
          { tl: "Magkano po ito?", ko: "이거 얼마예요?" },
          { tl: "Singkwenta pesos po.", ko: "50페소입니다." },
          { tl: "Ang mahal naman! Pwede po bang tumawad?", ko: "너무 비싸요! 깎아주실 수 있나요?" },
          { tl: "Sige, bente na lang.", ko: "알았어요, 그냥 20페소로 해줄게요. (흥정 성공!)" }
        ] },
        { type: "tip", text: "tumawad(깎다/흥정하다)에서 어제 배운 -um- 패턴이 보이죠? 그리고 숫자가 안 들리면 당황하지 말고 영어로 되물어도 됩니다 — 필리핀에서는 스페인·영어·타갈로그 숫자가 자연스럽게 섞여 쓰입니다." }
      ]
    },
    {
      title: "3교시. may / wala — 있다, 없다, 가지고 있다",
      blocks: [
        { type: "p", text: "be동사가 없는 타갈로그어에서 존재와 소유를 담당하는 만능 단어 한 쌍입니다. **may = 있다**, **wala = 없다**. 패턴으로 외우세요:" },
        { type: "examples", items: [
          { tl: "May pera ako.", ko: "나 돈 있어. (may + 명사 + 나)" },
          { tl: "Wala akong pera.", ko: "나 돈 없어. (wala + akong + 명사)" },
          { tl: "May tubig po ba kayo?", ko: "물 있나요? (가게에서 만능 질문)" },
          { tl: "Wala na po.", ko: "이제 없어요/다 떨어졌어요." },
          { tl: "May tanong ako.", ko: "질문 있어요." }
        ] },
        { type: "tip", text: "어순 주의: may는 [may + 명사 + 대명사], wala는 [wala + 대명사+ng + 명사]입니다. wala 뒤의 ako에 -ng가 붙어 akong이 되는 것만 통째로 외우세요(Wala akong ___ = 나 ___ 없어). 이 -ng는 단어를 이어주는 연결고리(링커)인데, 자세한 원리는 나중에 배웁니다." }
      ]
    },
    {
      title: "4교시. 오늘의 단어 15개 (돈·쇼핑)",
      blocks: [
        { type: "table", columns: ["단어", "뜻"], speakCol: 0, rows: [
          ["presyo", "가격"], ["bayad", "지불/요금"],
          ["sukli", "거스름돈"], ["barya", "잔돈/동전"],
          ["libre", "공짜"], ["tawad", "할인/깎기"],
          ["lahat", "전부/모두"], ["marami", "많이"],
          ["konti", "조금"], ["kalahati", "절반"],
          ["piraso", "개/조각"], ["isa pa", "하나 더"],
          ["oras", "시간"], ["minuto", "분"],
          ["tanong", "질문"]
        ] },
        { type: "examples", items: [
          { tl: "Magkano lahat?", ko: "전부 얼마예요?" },
          { tl: "Isa pa po!", ko: "하나 더 주세요! (식당 만능 표현)" },
          { tl: "Wala po akong barya.", ko: "잔돈이 없어요." }
        ] }
      ]
    },
    {
      title: "5교시. 현지인 미션 (오늘 안에 실행)",
      blocks: [
        { type: "p", text: "오늘 미션 무대는 가게입니다. 사리사리 스토어, 편의점, 시장, 어디든 좋아요." },
        { type: "list", ordered: true, items: [
          "뭔가를 사면서 \"Magkano po?\" 묻고, 점원의 대답에서 숫자를 알아듣기. 못 알아들었으면 \"Pakiulit po\"(다시 말씀해주세요)로 한 번 더 듣기.",
          "\"May ___ po ba kayo?\" 패턴으로 물건 하나 찾아보기 (예: May tubig po ba kayo?).",
          "계산하면서 거스름돈 받을 때 \"Salamat po\" — 여유가 되면 시장에서 \"Pwede po bang tumawad?\"로 흥정에 도전. 흥정은 재래시장에서만, 편의점에서는 금지!"
        ] },
        { type: "tip", text: "오늘 들은 가격 표현을 하나라도 기억해뒀다가 복습하세요. 숫자는 눈으로 외우는 것보다 실제 돈을 주고받으며 귀로 익히는 게 10배 빠릅니다." }
      ]
    }
  ],
  quiz: [
    { type: "choice", q: "lima는 숫자 몇일까요?",
      options: ["5", "3", "7", "9"], answer: 0,
      explain: "isa, dalawa, tatlo, apat, lima — 5입니다." },
    { type: "input", q: "숫자 3을 타갈로그어로?",
      answers: ["tatlo"],
      explain: "tatlo(따뜰로) = 3." },
    { type: "choice", q: "가게에서 \"Singkwenta pesos po\"라고 했다면 얼마일까요?",
      options: ["50페소", "15페소", "60페소", "500페소"], answer: 0,
      explain: "singkwenta = 50. 돈 얘기는 스페인 숫자로!" },
    { type: "input", q: "\"나 돈 없어\"를 타갈로그어로?",
      answers: ["wala akong pera"],
      explain: "wala + akong + pera. wala 뒤의 ako에는 -ng가 붙습니다." },
    { type: "input", q: "\"나 돈 있어\"를 타갈로그어로?",
      answers: ["may pera ako"],
      explain: "may + pera + ako. may와 wala는 어순이 다르다는 점에 주의!" },
    { type: "choice", q: "sukli의 뜻은?",
      options: ["거스름돈", "가격", "공짜", "할인"], answer: 0,
      explain: "sukli = 거스름돈. 잔돈/동전은 barya." },
    { type: "input", q: "가게에서 \"물 있나요?\"를 타갈로그어로?",
      answers: ["may tubig kayo", "may tubig ba kayo", "may tubig"],
      explain: "May tubig po ba kayo? 가게에서 뭐든 찾을 때 쓰는 만능 패턴입니다." },
    { type: "choice", q: "\"Ang mahal naman!\"의 뜻은?",
      options: ["너무 비싸요!", "너무 싸요!", "정말 맛있어요!", "정말 사랑해요!"], answer: 0,
      explain: "mahal(비싼) — 흥정의 시작 멘트입니다. naman은 어감을 살리는 양념." },
    { type: "input", q: "숫자 10을 타갈로그어로?",
      answers: ["sampu"],
      explain: "sampu(삼뿌) = 10. 20부터는 dalawampu, tatlumpu… 패턴입니다." },
    { type: "input", q: "(응용) \"잔돈 있으세요?\"를 만들어보세요.",
      answers: ["may barya kayo", "may barya ba kayo", "may barya"],
      explain: "May barya po ba kayo? 택시·지프니에서 큰 돈 낼 때 꼭 필요한 문장입니다." }
  ]
};
