window.LESSONS = window.LESSONS || {};
window.LESSONS[1] = {
  day: 1,
  title: "발음 규칙 + 인칭대명사 + 기초 단어 20개",
  sections: [
    {
      title: "1교시. 발음 (10분이면 끝나는 이유)",
      blocks: [
        { type: "p", text: "타갈로그어는 한글처럼 **쓰인 대로 읽습니다**. 모음 5개는 a(아), e(에), i(이), o(오), u(우) — 영어처럼 변하지 않고 항상 일정해요. 주의할 것 딱 3가지만:" },
        { type: "list", ordered: true, items: [
          "**ng** — \"응\" 소리 하나입니다. 단어 중간이나 첫머리에도 옵니다. ngayon(응아욘, 지금), ngipin(응이삔, 이빨). 처음엔 어색한데 \"앙→응아\"로 끊어 연습하면 됩니다.",
          "**모든 자음은 약하게** — p, t, k는 한국어 ㅃ, ㄸ, ㄲ에 가깝게 (바람 안 나가게). pera(돈)는 \"페라\"보다 \"뻬라\"에 가깝습니다.",
          "**강세** — 보통 끝에서 두 번째 음절에 옵니다. 강세 위치로 뜻이 바뀌는 단어도 있어요. bába(턱) vs babá(내려가다)."
        ] },
        { type: "examples", items: [
          { tl: "ngayon", ko: "지금 (응아욘)" },
          { tl: "pera", ko: "돈 (뻬라)" }
        ] }
      ]
    },
    {
      title: "2교시. 인칭대명사 (오늘의 핵심 문법)",
      blocks: [
        { type: "p", text: "타갈로그어 대명사는 이것만 알면 기본 문장이 됩니다:" },
        { type: "table", columns: ["타갈로그어", "뜻", "발음"], speakCol: 0, rows: [
          ["ako", "나", "아꼬"],
          ["ikaw / ka", "너", "이까우 / 까"],
          ["siya", "그/그녀 (성별 구분 없음!)", "샤"],
          ["kami", "우리 (듣는 사람 제외)", "까미"],
          ["tayo", "우리 (듣는 사람 포함)", "따요"],
          ["kayo", "당신들 / 당신(존칭)", "까요"],
          ["sila", "그들", "실라"]
        ] },
        { type: "tip", text: "포인트 두 개. 첫째, siya는 he/she 구분이 없습니다(필리핀 사람들이 영어 할 때 he/she 헷갈리는 이유). 둘째, kami vs tayo — 현지인에게 \"Kumain kami\"라고 하면 \"(당신 빼고) 우리끼리 먹었어\"라는 뜻이 돼버립니다. 같이 먹었으면 tayo!" },
        { type: "p", text: "그리고 마법의 문장 패턴 하나: **[형용사/명사] + 대명사** = 완성된 문장입니다. 영어의 be동사(am/is/are)가 아예 없어서, 단어 두 개면 문장이 됩니다." },
        { type: "examples", items: [
          { tl: "Gutom ako.", ko: "나 배고파. (구똠 아꼬 — gutom 배고픈)" },
          { tl: "Pagod ka?", ko: "너 피곤해? (빠곳 까)" },
          { tl: "Koreano ako.", ko: "나 한국인이야. (꼬레아노 아꼬)" },
          { tl: "Maganda siya.", ko: "그녀는 예뻐. (마간다 샤)" }
        ] }
      ]
    },
    {
      title: "3교시. 오늘의 단어 20개",
      blocks: [
        { type: "table", columns: ["단어", "뜻"], speakCol: 0, rows: [
          ["oo (오오)", "응/네"], ["hindi", "아니/안"],
          ["gutom", "배고픈"], ["busog", "배부른"],
          ["pagod", "피곤한"], ["masaya", "행복한/즐거운"],
          ["maganda", "예쁜/좋은"], ["gwapo", "잘생긴"],
          ["mahal", "비싼/사랑"], ["mura", "싼"],
          ["malaki", "큰"], ["maliit", "작은"],
          ["masarap", "맛있는"], ["init", "더위 (mainit 더운)"],
          ["tubig", "물"], ["kanin", "밥"],
          ["bahay", "집"], ["pera", "돈"],
          ["ngayon", "지금/오늘"], ["bukas", "내일"]
        ] },
        { type: "tip", text: "mahal이 \"비싸다\"와 \"사랑\"이라는 뜻을 둘 다 갖는 게 재밌죠. Mahal kita = 사랑해 (오늘 외울 보너스 문장)." }
      ]
    },
    {
      title: "4교시. 현지인 미션 (오늘 저녁)",
      blocks: [
        { type: "p", text: "현지인 앞에서 이 세 문장을 실제로 사용하기:" },
        { type: "list", ordered: true, items: [
          "Gutom ako (배고플 때)",
          "Masarap! (식사하면서)",
          "Mahal kita (자기 전에)"
        ] },
        { type: "p", text: "그리고 현지인에게 발음 하나만 체크 받으세요: \"ngayon\" 발음해보고 통과하는지." }
      ]
    }
  ],
  quiz: [
    { type: "input", q: "\"나 피곤해\"를 타갈로그어로?", answers: ["pagod ako"],
      explain: "pagod(피곤한) + ako(나). 형용사 + 대명사 = 완성된 문장!" },
    { type: "input", q: "\"그녀는 예뻐\"를 타갈로그어로?", answers: ["maganda siya"],
      explain: "maganda(예쁜) + siya(그/그녀)." },
    { type: "choice", q: "Busog ako — 무슨 뜻?",
      options: ["나 배불러", "나 배고파", "나 피곤해", "나 행복해"], answer: 0,
      explain: "busog = 배부른. 반대말 gutom(배고픈)과 세트로 외우세요." },
    { type: "choice", q: "친구와와 같이 저녁을 먹고 \"우리 먹었어\"라고 할 때, 뭘 써야 할까요?",
      options: ["Kumain tayo", "Kumain kami"], answer: 0,
      explain: "tayo = 듣는 사람 포함 \"우리\". kami라고 하면 친구 빼고 먹었다는 뜻이 됩니다!" },
    { type: "input", q: "\"물\"은 타갈로그어로?", answers: ["tubig"],
      explain: "tubig(뚜빅) = 물." },
    { type: "choice", q: "Mahal의 두 가지 뜻은?",
      options: ["비싸다 / 사랑", "싸다 / 미움", "크다 / 사랑", "비싸다 / 행복"], answer: 0,
      explain: "Mahal kita = 사랑해. Ang mahal! = 너무 비싸!" },
    { type: "choice", q: "siya는 \"그\"일까요 \"그녀\"일까요?",
      options: ["둘 다 (성별 구분 없음)", "그(남자)만", "그녀(여자)만"], answer: 0,
      explain: "타갈로그어 대명사는 성별을 구분하지 않습니다." },
    { type: "input", q: "\"너 배고파?\"를 타갈로그어로?", answers: ["gutom ka", "gutom ka ba"],
      explain: "Gutom ka? 의문문은 어순 그대로, 끝만 올리면 됩니다. ba를 넣으면(Gutom ka ba?) 더 자연스러워요." },
    { type: "choice", q: "Masarap ang kanin — 무슨 뜻?",
      options: ["밥이 맛있다", "물이 맛있다", "밥이 비싸다", "집이 크다"], answer: 0,
      explain: "masarap(맛있는) + ang(주어 표시) + kanin(밥)." },
    { type: "input", q: "\"내일\"은 타갈로그어로?", answers: ["bukas"],
      explain: "bukas = 내일. ngayon(지금/오늘)과 세트로." }
  ]
};
