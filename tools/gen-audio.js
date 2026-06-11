/* ============================================================
   타갈로그어 음성(MP3) 사전 생성 스크립트
   - 모든 lessons/dayN.js에서 🔊로 읽는 타갈로그어 문자열을 추출
   - 구글 번역 타갈로그어(tl) TTS로 MP3를 받아 audio/<key>.mp3 로 저장
   - 파일명 key는 app.js의 ttsKey()와 동일한 해시 → 앱이 바로 찾아 재생
   사용법:  node tools/gen-audio.js          (없는 파일만 생성)
            node tools/gen-audio.js --list   (생성 안 하고 목록/개수만)
            node tools/gen-audio.js --force  (이미 있어도 다시 생성)
   ============================================================ */
const fs = require("fs");
const path = require("path");
const https = require("https");

const ROOT = path.join(__dirname, "..");
const AUDIO_DIR = path.join(ROOT, "audio");
const LIST_ONLY = process.argv.includes("--list");
const FORCE = process.argv.includes("--force");

// ---- app.js의 ttsKey()와 반드시 동일해야 함 (djb2 xor, unsigned 32bit, 8 hex) ----
function ttsKey(s) {
  const str = String(s);
  let h = 5381;
  for (let i = 0; i < str.length; i++) h = ((h * 33) ^ str.charCodeAt(i)) >>> 0;
  return ("0000000" + h.toString(16)).slice(-8);
}

// ---- 앱과 동일한 표 셀 추출 규칙 ----
function cleanTableTerm(cellText) {
  return String(cellText == null ? "" : cellText).replace(/\s*\(.*?\)\s*/g, "").split("/")[0].trim();
}
function collectFromLesson(L) {
  const out = [];
  (L.sections || []).forEach((s) => {
    (s.blocks || []).forEach((b) => {
      if (b.type === "examples") {
        (b.items || []).forEach((it) => { const t = String(it.tl == null ? "" : it.tl).trim(); if (t) out.push(t); });
      } else if (b.type === "table" && typeof b.speakCol === "number") {
        (b.rows || []).forEach((row) => {
          const cleaned = cleanTableTerm(row[b.speakCol]);
          const t = cleaned || String(row[b.speakCol] == null ? "" : row[b.speakCol]).trim();
          if (t) out.push(t);
        });
      }
    });
  });
  return out;
}

// ---- 수업 데이터 로드 ----
global.window = { LESSONS: {} };
require(path.join(ROOT, "lessons", "manifest.js"));
const days = (global.window.LESSON_DAYS || []).slice();
days.forEach((d) => { try { require(path.join(ROOT, "lessons", "day" + d + ".js")); } catch (e) { console.warn("skip day" + d, e.message); } });

// ---- 전체 문자열 수집 + 중복 제거 ----
const seen = new Map(); // key -> text
days.forEach((d) => {
  const L = global.window.LESSONS[d];
  if (!L) return;
  collectFromLesson(L).forEach((t) => {
    if (t.length > 200) return; // 너무 긴 건 앱에서 음성합성으로 처리
    const k = ttsKey(t);
    if (!seen.has(k)) seen.set(k, t);
  });
});

console.log("등록 일차:", days.join(", "));
console.log("고유 음성 문자열:", seen.size, "개");

if (LIST_ONLY) {
  [...seen.entries()].slice(0, 9999).forEach(([k, t]) => console.log(k, "|", t));
  process.exit(0);
}

if (!fs.existsSync(AUDIO_DIR)) fs.mkdirSync(AUDIO_DIR, { recursive: true });

function ttsURL(text) {
  return "https://translate.googleapis.com/translate_tts?ie=UTF-8&client=gtx&tl=tl&q=" +
    encodeURIComponent(text) + "&total=1&idx=0&textlen=" + text.length;
}
function fetchMp3(text) {
  return new Promise((resolve, reject) => {
    const req = https.get(ttsURL(text), {
      headers: { "User-Agent": "Mozilla/5.0", "Referer": "https://translate.google.com/" }
    }, (res) => {
      if (res.statusCode !== 200) { res.resume(); return reject(new Error("HTTP " + res.statusCode)); }
      const chunks = [];
      res.on("data", (c) => chunks.push(c));
      res.on("end", () => {
        const buf = Buffer.concat(chunks);
        if (buf.length < 200) return reject(new Error("too small (" + buf.length + ")"));
        resolve(buf);
      });
    });
    req.on("error", reject);
    req.setTimeout(15000, () => req.destroy(new Error("timeout")));
  });
}
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

(async () => {
  const items = [...seen.entries()];
  let made = 0, skipped = 0, failed = 0;
  for (let i = 0; i < items.length; i++) {
    const [k, t] = items[i];
    const file = path.join(AUDIO_DIR, k + ".mp3");
    if (!FORCE && fs.existsSync(file) && fs.statSync(file).size > 200) { skipped++; continue; }
    let ok = false;
    for (let attempt = 0; attempt < 3 && !ok; attempt++) {
      try {
        const buf = await fetchMp3(t);
        fs.writeFileSync(file, buf);
        made++; ok = true;
        if (made % 25 === 0) console.log("  ... " + made + " 생성됨");
      } catch (e) {
        if (attempt === 2) { failed++; console.warn("FAIL", k, JSON.stringify(t), e.message); }
        else await sleep(800);
      }
    }
    await sleep(120); // 레이트리밋 완화
  }
  console.log(`완료: 생성 ${made} / 건너뜀(이미 있음) ${skipped} / 실패 ${failed} / 총 ${items.length}`);
  if (failed) process.exit(1);
})();
