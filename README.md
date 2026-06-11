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

## 발음 듣기 (사전 생성 MP3 방식)

🔊 버튼은 **3단계**로 동작합니다 (로직은 `js/app.js`의 `speak()` 하나에 모여 있음).

1. **1순위 — 저장소에 미리 만들어 둔 로컬 MP3 (`audio/<key>.mp3`)** ★기본
   각 타갈로그어 단어·문장의 음성을 미리 생성해 저장소에 넣어 둡니다. 실제 필리핀어
   발음이고, 브라우저 음성이나 실시간 인터넷 TTS에 의존하지 않으므로 **PC·모바일에서
   완전히 동일하게**, 끊김 없이 재생됩니다. (기기별로 음성이 다르거나 영어로 나오던
   문제가 근본적으로 사라집니다.)
2. **2순위(폴백) — 실시간 구글 번역 타갈로그어(tl) TTS** — 로컬 MP3가 없을 때만.
3. **3순위(폴백) — 기기 내장 음성 합성(`speechSynthesis`)** — 위가 모두 실패할 때만.

파일명 `key`는 `ttsKey()`(djb2 해시) 결과로, `js/app.js`와 `tools/gen-audio.js`가
**같은 함수**를 써서 일치합니다. 음성과 별개로, 각 단어·예문 옆에는 한글 발음 표기도
적혀 있어 소리 없이도 읽을 수 있습니다.

### 새 일차 추가 후 음성 생성하기

`lessons/dayN.js` 추가 + manifest 등록을 마친 뒤, 한 번만 실행하면 됩니다:

```bash
node tools/gen-audio.js        # 새로 생긴 문자열의 MP3만 생성 (기존 건 건너뜀)
node tools/gen-audio.js --list # 생성 없이 대상 목록/개수만 확인
node tools/gen-audio.js --force # 전부 다시 생성
```

생성된 `audio/*.mp3`를 저장소에 함께 커밋하면 끝입니다. (스크립트를 안 돌려도 앱은
2·3순위로 폴백하므로 동작은 하지만, 1순위 로컬 MP3가 가장 안정적입니다. 인터넷 필요 —
구글 번역 TTS에서 받아옵니다.)

## 복습 기능

홈의 **복습** 영역에서 세 가지 복습을 제공합니다. 모두 등록된 수업 데이터에서
**자동으로 퀴즈를 생성**하므로, 새 일차를 추가하면 복습 문제도 자동으로 늘어납니다.

| 복습 | 출제 방식 | 데이터 출처 |
|------|-----------|-------------|
| 타갈로그 단어 복습 | 단어 → 뜻 객관식 | 모든 `table`의 `speakCol`(타갈로그어) + `뜻` 열 |
| 문법 복습 | 수업 퀴즈 재출제 | 각 일차의 `quiz` 배열 |
| 문장 복습 | 한국어 → 타갈로그어 객관식 | 모든 `examples` 블록의 `tl`/`ko` |

각 복습은 범위를 고를 수 있습니다.
- **지금까지 배운 것 전체** — 등록된 모든 수업에서 출제
- **수업 지정** — 시작~끝 회차 범위를 골라 출제 (예: 1~3회차)

> 복습 점수는 진행 기록(완료/최고점수)에 저장되지 않습니다. 순수 연습용입니다.

## 테마 (라이트/다크 모드)

우측 상단 🌙/☀️ 버튼으로 전환합니다. 선택은 `localStorage`(`tagalog100_theme`)에
저장되어 모든 화면(홈·수업·퀴즈·복습)과 재방문 시에도 유지됩니다. `<html data-theme="dark">`
+ CSS 변수 방식이라 한 곳에서 전체 화면에 일괄 적용됩니다.

## 로컬 실행

`index.html`을 더블클릭하면 됩니다. (별도 서버 불필요 — 수업 파일은 `<script>` 태그로
로드되므로 `file://` 에서도 동작합니다.)

## 배포 (GitHub Pages)

저장소에 그대로 올린 뒤 Settings → Pages 에서 브랜치를 `main` / 루트(`/`)로 지정하면 됩니다.
