window.LESSONS = window.LESSONS || {};
window.LESSONS[9] = {
  day: 9,
  title: "-in 동사 2부 — 명령문, 부탁(paki-), 가족 호칭",
  sections: [
    {
      title: "1교시. 새 -in 동사 5개 (생활 밀착형)",
      blocks: [
        { type: "p", text: "어제 공식 그대로, 일상에서 쉴 새 없이 쓰는 5개를 추가합니다:" },
        { type: "table", columns: ["어근(뜻)", "완료", "진행", "예정"], speakCol: 1, rows: [
          ["kuha (가져오다/집다)", "kinuha", "kinukuha", "kukunin"],
          ["dala (가져가다)", "dinala", "dinadala", "dadalhin"],
          ["hanap (찾다)", "hinanap", "hinahanap", "hahanapin"],
          ["tawag (부르다)", "tinawag", "tinatawag", "tatawagin"],
          ["panood (보다/시청하다)", "pinanood", "pinapanood", "papanoorin"]
        ] },
        { type: "tip", text: "tawag, 어디서 봤죠? 3일차 tumawag(전화하다)의 그 어근입니다. 행위자 초점이면 tumawag(전화했다), 목적어 초점이면 tinawag(그 사람을 불렀다). 어근 하나가 초점에 따라 두 벌의 옷을 입는 것 — 이게 타갈로그어 동사의 전체 그림입니다." },
        { type: "examples", items: [
          { tl: "Hinahanap kita!", ko: "너 찾고 있었잖아! (5일차 kita 재출동)" },
          { tl: "Pinapanood namin ang pelikula.", ko: "우리 그 영화 보는 중이야." },
          { tl: "Dadalhin ko ang regalo bukas.", ko: "그 선물 내일 내가 가져갈게." }
        ] }
      ]
    },
    {
      title: "2교시. 명령문 — 기본형 + mo",
      blocks: [
        { type: "p", text: "-in 동사의 진짜 위력은 명령문입니다. 공식은 허무할 정도로 간단: **기본형 + mo** (특정한 그것을 ~해!):" },
        { type: "examples", items: [
          { tl: "Kainin mo!", ko: "(그거) 먹어!" },
          { tl: "Kunin mo ang susi.", ko: "열쇠 가져와." },
          { tl: "Hanapin mo ang cellphone ko.", ko: "내 폰 좀 찾아봐." },
          { tl: "Gawin mo na!", ko: "어서 해! (na로 재촉)" }
        ] },
        { type: "p", text: "행위자 초점에도 명령이 있습니다: **동사 기본형 + ka**. 둘의 차이는 어제 배운 그 차이 그대로 — 특정 대상이 있으면 -in, 그냥 행동을 시키면 -um-/mag-:" },
        { type: "examples", items: [
          { tl: "Kumain ka na!", ko: "(어서) 밥 먹어! — 일반 명령" },
          { tl: "Kainin mo ito!", ko: "이거 먹어! — 특정 대상 명령" }
        ] },
        { type: "tip", text: "**공손 버전 paki-**: 어근 앞에 paki-를 붙이면 \"~해 주세요\"가 됩니다. Pakikuha ng tubig(물 좀 갖다주세요), Pakiulit po(다시 말씀해주세요 — 1일차 생존 문장의 정체!), 그리고 식탁의 제왕 **Pakiabot ng ___**(___ 좀 건네주세요). abot = 건네다." }
      ]
    },
    {
      title: "3교시. 초점 선택 훈련 — 나란히 놓고 보기",
      blocks: [
        { type: "p", text: "이틀치를 한 줄로 요약하면: **막연하면 ng + 행위자 초점, 특정하면 ang + 목적어 초점.** 짝으로 비교하며 감을 잡으세요:" },
        { type: "table", columns: ["행위자 초점 (막연)", "목적어 초점 (특정)"], rows: [
          ["Bumili ako ng damit. (옷을 좀 샀어)", "Binili ko ang damit. (그 옷, 내가 샀어)"],
          ["Uminom siya ng kape. (커피를 마셨어)", "Ininom niya ang kape ko! (내 커피를 마셨어!)"],
          ["Nagluto kami ng adobo. (아도보를 했어)", "Niluto namin ang isda. (그 생선, 우리가 요리했어)"]
        ] },
        { type: "tip", text: "틀려도 뜻은 통합니다. 필리핀 사람들은 외국인이 초점을 틀려도 다 알아듣고, 오히려 -in 동사를 쓰려고 시도하는 것만으로 감탄합니다. 완벽주의보다 시도가 먼저!" }
      ]
    },
    {
      title: "4교시. 오늘의 단어 10개 — 가족 + si 마커",
      blocks: [
        { type: "p", text: "Tawagin mo **si** Ana(아나 불러줘)처럼, 사람 이름 앞에서는 ang 대신 **si**를 씁니다. 그리고 가족 호칭은 필리핀 생활의 핵심 문화입니다:" },
        { type: "table", columns: ["단어", "뜻"], speakCol: 0, rows: [
          ["pamilya", "가족"],
          ["nanay / mama", "엄마"],
          ["tatay / papa", "아빠"],
          ["anak", "자녀/아들딸"],
          ["kuya", "형/오빠 (연상 남성 전반)"],
          ["ate", "누나/언니 (연상 여성 전반)"],
          ["lolo", "할아버지"],
          ["lola", "할머니"],
          ["kapatid", "형제자매"],
          ["pangalan", "이름"]
        ] },
        { type: "tip", text: "**문화 포인트**: kuya/ate는 가족에게만 쓰는 말이 아닙니다. 가게 점원, 택시·지프니 기사, 식당 직원을 부를 때 \"Kuya!\" \"Ate!\"라고 하는 게 표준 매너예요. 한국의 \"사장님/이모님\" 포지션. 이거 하나만 잘 써도 현지인 호감도가 급상승합니다." }
      ]
    },
    {
      title: "5교시. 현지인 미션 (오늘 안에 실행)",
      blocks: [
        { type: "list", ordered: true, items: [
          "식탁이나 모임에서 \"**Pakiabot ng ___**\"(___ 좀 건네주세요) 실전 사용 — 오늘의 메인 미션입니다. 물(tubig), 밥(kanin), 뭐든 좋아요.",
          "가게·식당에서 점원을 \"**Kuya!**\" 또는 \"**Ate!**\"로 불러보기. 어색해도 한 번만 해보면 그 다음부터 자동이 됩니다.",
          "가까운 사람에게 가벼운 명령문 하나 던져보기: \"Kunin mo ang ___\" 또는 \"Panoorin natin ito!\"(이거 같이 보자!) — 명령문은 친한 사이에서만, 점원에게는 paki-로!"
        ] },
        { type: "tip", text: "이틀간의 최대 관문 통과를 축하합니다. 내일 10일차는 -in 동사 집중 훈련 + 1~9일차 중간 점검으로 굳히기에 들어갑니다. 오늘 변화표 10개(어제 5 + 오늘 5)를 자기 전에 입으로 한 바퀴!" }
      ]
    }
  ],
  quiz: [
    { type: "input", q: "\"열쇠 가져와\"를 타갈로그어로?",
      answers: ["kunin mo ang susi"],
      explain: "명령문 = 기본형 + mo: Kunin mo ang susi. (kuha의 기본형은 불규칙 kunin!)" },
    { type: "choice", q: "kinuha — 무슨 뜻?",
      options: ["(그것을) 가져갔다/집었다", "(그것을) 가져갈 것이다", "(그것을) 찾았다", "(그것을) 불렀다"], answer: 0,
      explain: "kuha의 완료형 kinuha. 예정형은 kukunin." },
    { type: "input", q: "\"물 좀 건네주세요\"를 타갈로그어로?",
      answers: ["pakiabot ng tubig", "paki abot ng tubig", "pakiabot ng tubig salamat"],
      explain: "paki- + abot(건네다) + ng tubig. 식탁 만능 문장입니다." },
    { type: "choice", q: "hinahanap — 무슨 뜻?",
      options: ["(그것을) 찾는 중", "(그것을) 찾았다", "(그것을) 찾을 것이다", "(그것이) 사라졌다"], answer: 0,
      explain: "hanap + in 삽입 + 첫음절 반복 = hinahanap(찾는 중). Hinahanap kita = 너 찾고 있었어." },
    { type: "input", q: "\"그 영화 우리(같이) 볼 거야\"를 타갈로그어로?",
      answers: ["papanoorin natin ang pelikula", "panonoorin natin ang pelikula"],
      explain: "papanoorin(볼 것이다) + natin(우리가, 청자 포함) + ang pelikula(그 영화)." },
    { type: "choice", q: "필리핀에서 가게 점원이나 기사님을 부를 때 쓰는 호칭은?",
      options: ["Kuya / Ate", "Lolo / Lola", "Nanay / Tatay", "Anak"], answer: 0,
      explain: "연상 남성은 Kuya, 연상 여성은 Ate. 가족이 아니어도 점원·기사에게 쓰는 표준 매너입니다." },
    { type: "input", q: "\"아나 불러줘\"를 타갈로그어로? (사람 이름 마커 주의)",
      answers: ["tawagin mo si ana"],
      explain: "tawagin(부르다, 기본형) + mo + si Ana. 사람 이름 앞에는 ang 대신 si!" },
    { type: "choice", q: "si의 역할은?",
      options: ["사람 이름 앞에 붙는 스포트라이트(ang의 사람 버전)", "존댓말 표시", "과거 표시", "질문 표시"], answer: 0,
      explain: "ang의 사람 이름 전용 버전이 si입니다. Si Ana ang nagluto = 요리한 사람은 아나야." },
    { type: "choice", q: "\"Kumain ka na!\"와 \"Kainin mo ito!\"의 차이는?",
      options: ["일반 명령(밥 먹어) vs 특정 대상 명령(이거 먹어)", "존댓말 vs 반말", "과거 vs 미래", "차이 없음"], answer: 0,
      explain: "행위자 초점 명령(+ka)은 행동 자체를, 목적어 초점 명령(+mo)은 특정한 그것을 시킵니다." },
    { type: "input", q: "(응용) \"그 신발 어디서 샀어?\"를 만들어보세요. (2일차 saan + 어제 binili)",
      answers: ["saan mo binili ang sapatos"],
      explain: "Saan(어디서) + mo(네가) + binili(샀다) + ang sapatos(그 신발). 의문사 + 목적어 초점 조합 — 9일 만에 이런 문장을 만들다니, 대단합니다!" }
  ]
};
