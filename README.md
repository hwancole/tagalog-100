# 타갈로그어 100일 마스터

타갈로그어를 100일 만에 배우는 1인용 학습 웹사이트입니다. 빌드 도구나 프레임워크 없이
순수 HTML/CSS/JS로 만들어졌고, GitHub Pages 배포 또는 로컬에서 `index.html`을 더블클릭으로
열어도 동작합니다.

## 폴더 구조

```
index.html          앱 전체 (홈 + 수업 + 퀴즈, SPA 방식)
css/style.css       스타일
js/app.js           앱 로직 (라우팅·렌더러·채점·진행 저장·발음)
lessons/manifest.js 등록된 일차 목록  →  window.LESSON_DAYS = [1];
lessons/day1.js     1일차 수업 데이터 →  window.LESSONS[1] = {...};
README.md           이 문서
```

수업 데이터는 `lessons/dayN.js`로 **완전히 분리**되어 있습니다. `index.html`을 건드리지 않고도
새 일차를 추가할 수 있습니다. (스크립트 로딩은 `manifest.js`를 기반으로 `app.js`가 동적으로
처리합니다.)

## 새 일차 추가 방법 (2단계)

### 1단계 — `lessons/dayN.js` 파일 생성

아래 스키마에 맞춰 `lessons/day2.js`, `lessons/day3.js` … 를 만듭니다.
(`day1.js`를 복사해서 내용만 바꾸는 것이 가장 쉽습니다.)

### 2단계 — `lessons/manifest.js`에 일차 번호 추가

```js
window.LESSON_DAYS = [1, 2];   // 2일차를 추가했다면 2를 넣습니다
```

끝입니다. 새로고침하면 홈 그리드에서 해당 일차가 활성화됩니다.

> `index.html`은 수정할 필요가 없습니다. `app.js`가 manifest의 번호를 보고
> `lessons/dayN.js`를 자동으로 불러옵니다.

## 수업 데이터 스키마

```js
window.LESSONS = window.LESSONS || {};
window.LESSONS[N] = {
  day: N,
  title: "수업 제목",
  sections: [            // 교시 목록 (개수 자유)
    {
      title: "1교시. ...",
      blocks: [
        { type: "p", text: "문단. **굵게** 마크다운 지원" },
        { type: "list", ordered: true, items: ["항목1", "항목2"] },
          // ordered: true → 번호 목록, false → 점 목록
        { type: "table", columns: ["컬럼1", "컬럼2"], rows: [["a", "b"]], speakCol: 0 },
          // speakCol: 해당 열 셀 옆에 🔊 발음 듣기 버튼 (생략 시 버튼 없음)
        { type: "examples", items: [{ tl: "Gutom ako.", ko: "나 배고파." }] },
          // 타갈로그어 예문 + 한국어 뜻, tl 옆에 🔊 버튼
        { type: "tip", text: "강조 박스 (팁/주의)" }
      ]
    }
  ],
  quiz: [                 // 객관식 + 주관식 혼합
    { type: "choice", q: "질문", options: ["보기1", "보기2", "보기3", "보기4"],
      answer: 0, explain: "해설" },          // answer = 정답 인덱스(0부터)
    { type: "input", q: "질문", answers: ["정답1", "정답2"], explain: "해설" }
      // answers 배열 중 하나와 일치하면 정답
  ]
};
```

### 블록 타입 정리

| type | 필드 | 설명 |
|------|------|------|
| `p` | `text` | 문단. `**굵게**` 지원 |
| `list` | `ordered`, `items[]` | 순서/비순서 목록. 항목에 `**굵게**` 지원 |
| `table` | `columns[]`, `rows[][]`, `speakCol?` | 표. `speakCol` 열에 🔊 버튼 |
| `examples` | `items[{tl, ko}]` | 예문. `tl`(타갈로그어) 옆 🔊 버튼 |
| `tip` | `text` | 노란 강조 박스 |

### 퀴즈 타입 정리

| type | 필드 | 설명 |
|------|------|------|
| `choice` | `q`, `options[]`, `answer`, `explain?` | 객관식. `answer`는 0부터 시작하는 정답 인덱스 |
| `input` | `q`, `answers[]`, `explain?` | 주관식. `answers` 중 하나와 일치하면 정답 |

## 주관식 채점 규칙 (관대하게)

입력값과 정답을 비교하기 전에 양쪽을 다음 순서로 정규화합니다.

1. 소문자화
2. 앞뒤 공백 제거
3. 연속 공백 → 1개
4. 구두점 제거 (`. , ! ? ' ’ "`)
5. 단어 `po` 제거
6. 단어 `ba` 제거

예: `"Pagod po ako."` 를 입력해도 정답 `"pagod ako"` 와 일치 처리됩니다.

## 진행 저장

`localStorage`의 `tagalog100` 키 하나에 JSON으로 저장됩니다.

```json
{ "completed": [1], "scores": { "1": 90 }, "lastDay": 1 }
```

완료한 일차, 일차별 최고 점수, 마지막으로 본 일차가 저장되어 새로고침/재방문해도 유지됩니다.

## 발음 듣기

🔊 버튼은 **2단계**로 동작합니다 (로직은 `js/app.js`의 `speak()` 하나에 모여 있어,
모든 일차·앞으로 추가할 일차에 자동 적용됩니다).

1. **1순위 — 구글 번역 타갈로그어(tl) TTS 오디오**
   `https://translate.google.com/translate_tts?...&tl=tl&q=<단어>` 를 `Audio`로 재생합니다.
   실제 필리핀어 발음이라 정확하고, **PC·모바일에서 동일한 음성**이 납니다.
   (기기마다 음성이 제각각이던 문제가 사라집니다. 네트워크 연결 필요.)
2. **2순위(폴백) — 기기 내장 음성 합성(`speechSynthesis`)**
   오프라인이거나 위 오디오가 막혔을 때만 사용합니다. `fil`/`tl` voice → 스페인어 voice
   (모음이 타갈로그어와 거의 동일) → 기본 voice 순으로 고릅니다.

오디오·음성 합성이 모두 불가능한 환경에서만 🔊 버튼이 숨겨집니다. 음성과 별개로,
각 단어·예문 옆에는 한글 발음 표기가 항상 적혀 있어 소리 없이도 읽을 수 있습니다.

> 1순위는 구글 번역의 비공식 TTS 엔드포인트라, 구글 정책에 따라 막히면 자동으로
> 2순위(기기 음성)로 폴백합니다.

## 로컬 실행

`index.html`을 더블클릭하면 됩니다. (별도 서버 불필요 — 수업 파일은 `<script>` 태그로
로드되므로 `file://` 에서도 동작합니다.)

## 배포 (GitHub Pages)

저장소에 그대로 올린 뒤 Settings → Pages 에서 브랜치를 `main` / 루트(`/`)로 지정하면 됩니다.
