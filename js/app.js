/* ============================================================
   타갈로그어 100일 마스터 — 앱 로직 (순수 JS, 빌드 도구 없음)
   ============================================================ */
(function () {
  "use strict";

  var TOTAL_DAYS = 100;
  var STORAGE_KEY = "tagalog100";
  var THEME_KEY = "tagalog100_theme";
  var LESSON_DIR = "lessons/";
  var REVIEW_LIMIT = 10; // 복습 1회당 문제 수(가능한 범위 내에서)

  // 복습 종류 정의 (홈 버튼 + 범위 선택 화면에서 공용)
  var REVIEW_TYPES = [
    { key: "word",     icon: "📚", label: "타갈로그 단어 복습", desc: "단어 → 뜻 맞히기" },
    { key: "grammar",  icon: "🧩", label: "문법 복습",         desc: "수업 퀴즈 다시 풀기" },
    { key: "sentence", icon: "💬", label: "문장 복습",         desc: "한국어 → 타갈로그어 문장" }
  ];
  function reviewMeta(key) {
    for (var i = 0; i < REVIEW_TYPES.length; i++) if (REVIEW_TYPES[i].key === key) return REVIEW_TYPES[i];
    return REVIEW_TYPES[0];
  }

  window.LESSONS = window.LESSONS || {};

  var appEl = document.getElementById("app");

  /* ---------- 진행 상황 저장 (localStorage) ---------- */
  function loadProgress() {
    var def = { completed: [], scores: {}, lastDay: null };
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return def;
      var data = JSON.parse(raw);
      return {
        completed: Array.isArray(data.completed) ? data.completed : [],
        scores: data.scores && typeof data.scores === "object" ? data.scores : {},
        lastDay: data.lastDay || null
      };
    } catch (e) {
      return def;
    }
  }

  function saveProgress() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (e) {
      /* localStorage 불가(시크릿 모드 등) — 무시 */
    }
  }

  var progress = loadProgress();

  function recordResult(day, score) {
    if (progress.completed.indexOf(day) === -1) progress.completed.push(day);
    var prev = progress.scores[day];
    if (prev == null || score > prev) progress.scores[day] = score;
    progress.lastDay = day;
    saveProgress();
  }

  /* ---------- 동적 수업 로딩 (manifest 기반) ---------- */
  function loadLessonScripts(days) {
    var pending = days.filter(function (d) { return !window.LESSONS[d]; });
    if (pending.length === 0) return Promise.resolve();
    return Promise.all(pending.map(function (d) {
      return new Promise(function (resolve) {
        var s = document.createElement("script");
        s.src = LESSON_DIR + "day" + d + ".js";
        s.onload = function () { resolve(); };
        s.onerror = function () {
          console.warn("수업 파일을 불러오지 못했습니다: " + s.src);
          resolve(); // 누락된 일차는 잠금 처리되므로 계속 진행
        };
        document.head.appendChild(s);
      });
    }));
  }

  /* ---------- 유틸 ---------- */
  function el(tag, opts, children) {
    var node = document.createElement(tag);
    opts = opts || {};
    if (opts.class) node.className = opts.class;
    if (opts.text != null) node.textContent = opts.text;
    if (opts.html != null) node.innerHTML = opts.html;
    if (opts.attrs) {
      for (var k in opts.attrs) node.setAttribute(k, opts.attrs[k]);
    }
    if (opts.on) {
      for (var ev in opts.on) node.addEventListener(ev, opts.on[ev]);
    }
    if (children) {
      (Array.isArray(children) ? children : [children]).forEach(function (c) {
        if (c == null) return;
        node.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
      });
    }
    return node;
  }

  function clear(node) { while (node.firstChild) node.removeChild(node.firstChild); }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  // 아주 작은 마크다운: **굵게** 만 지원
  function mdInline(str) {
    return escapeHtml(str).replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  }

  /* ---------- 발음 듣기 (Web Speech API) ---------- */
  var speech = {
    supported: typeof window.speechSynthesis !== "undefined" &&
               typeof window.SpeechSynthesisUtterance !== "undefined",
    voice: null,
    triedVoices: false
  };

  function pickVoice() {
    if (!speech.supported) return;
    var voices = window.speechSynthesis.getVoices();
    if (!voices || !voices.length) return;
    speech.triedVoices = true;

    function find(pred) {
      for (var i = 0; i < voices.length; i++) { if (pred(voices[i])) return voices[i]; }
      return null;
    }

    // 1순위: 진짜 필리핀어(Filipino/Tagalog) voice — lang 코드 또는 voice 이름으로 탐지
    var v = find(function (o) {
      return /^fil/i.test(o.lang) || /^tl([-_]|$)/i.test(o.lang) ||
             /[-_]ph\b/i.test(o.lang) || /filipino|tagalog/i.test(o.name || "");
    });

    // 2순위: 스페인어 voice. 타갈로그어는 모음(a/e/i/o/u)이 스페인어와 사실상 동일하고
    // 어휘도 상당수 스페인어계라, 영어 voice보다 발음이 훨씬 자연스럽습니다.
    if (!v) v = find(function (o) { return /^es([-_]|$)/i.test(o.lang); });

    speech.voice = v; // 둘 다 없으면 null → 기본 voice + "fil-PH" lang 힌트 사용
    speech.usingFallback = !!(v && /^es/i.test(v.lang));
  }

  if (speech.supported) {
    pickVoice();
    window.speechSynthesis.onvoiceschanged = function () { pickVoice(); };
  }

  // 1순위 음성: 구글 번역의 타갈로그어(tl) TTS 오디오.
  // 실제 필리핀어 발음이라 정확하고, PC·모바일에서 동일한 음성이 납니다.
  // (기기마다 제각각인 speechSynthesis와 달리, 모든 기기에서 같은 소리)
  var TTS_URL = "https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=tl&q=";
  var hasAudio = typeof window.Audio !== "undefined";
  var activeAudio = null;
  var activeBtn = null;

  // 발음 버튼 표시 여부: 오디오 재생 또는 음성 합성 중 하나라도 가능하면 표시
  function canSpeak() { return hasAudio || speech.supported; }

  function setSpeaking(btn, on) {
    if (!btn || !btn.classList) return;
    if (on) btn.classList.add("speak-btn--speaking");
    else btn.classList.remove("speak-btn--speaking");
  }

  function stopSpeaking() {
    if (activeAudio) { try { activeAudio.pause(); } catch (e) {} activeAudio = null; }
    if (speech.supported) { try { window.speechSynthesis.cancel(); } catch (e) {} }
    if (activeBtn) { setSpeaking(activeBtn, false); activeBtn = null; }
  }

  // 2순위(폴백): 기기 내장 음성 합성. 오프라인이거나 구글 TTS가 막혔을 때만 사용.
  function speakViaSynth(text, btn) {
    if (!speech.supported) { setSpeaking(btn, false); if (activeBtn === btn) activeBtn = null; return; }
    try {
      window.speechSynthesis.cancel();
      var u = new SpeechSynthesisUtterance(text);
      if (speech.voice) u.voice = speech.voice;
      u.lang = speech.voice ? speech.voice.lang : "fil-PH";
      u.rate = 0.9;
      var off = function () { setSpeaking(btn, false); if (activeBtn === btn) activeBtn = null; };
      u.onend = off;
      u.onerror = off;
      window.speechSynthesis.speak(u);
    } catch (e) { setSpeaking(btn, false); }
  }

  function speak(text, btn) {
    var t = String(text == null ? "" : text).trim();
    if (!t) return;
    stopSpeaking();
    activeBtn = btn || null;
    setSpeaking(btn, true);

    // 긴 문장이나 오디오 미지원 환경은 곧장 음성 합성으로
    if (!hasAudio || t.length > 200) { speakViaSynth(t, btn); return; }

    var fellBack = false;
    function fallback() {
      if (fellBack) return;
      fellBack = true;
      if (activeAudio) { activeAudio = null; }
      speakViaSynth(t, btn);
    }

    try {
      var audio = new Audio();
      activeAudio = audio;
      audio.onended = function () {
        if (activeAudio === audio) activeAudio = null;
        setSpeaking(btn, false);
        if (activeBtn === btn) activeBtn = null;
      };
      audio.onerror = function () { fallback(); };
      audio.src = TTS_URL + encodeURIComponent(t);
      var p = audio.play();
      if (p && typeof p.catch === "function") p.catch(function () { fallback(); });
    } catch (e) {
      fallback();
    }
  }

  function makeSpeakBtn(text) {
    if (!canSpeak()) return null;
    return el("button", {
      class: "speak-btn",
      attrs: { type: "button", "aria-label": "발음 듣기", title: "발음 듣기 (필리핀어)" },
      text: "🔊",
      on: { click: function () { speak(text, this); } }
    });
  }

  /* ---------- 다크/라이트 모드 ---------- */
  // 적용은 <html data-theme="dark">로 하고, CSS 변수로 전 화면(수업·퀴즈·복습)에 일괄 반영됩니다.
  function currentTheme() {
    return document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
  }
  function applyTheme(theme) {
    if (theme === "dark") document.documentElement.setAttribute("data-theme", "dark");
    else document.documentElement.removeAttribute("data-theme");
    var btn = document.getElementById("theme-btn");
    if (btn) {
      btn.textContent = theme === "dark" ? "☀️" : "🌙";
      btn.setAttribute("aria-label", theme === "dark" ? "라이트모드로 전환" : "다크모드로 전환");
      btn.setAttribute("title", theme === "dark" ? "라이트모드로 전환" : "다크모드로 전환");
    }
    try { localStorage.setItem(THEME_KEY, theme); } catch (e) {}
  }
  function toggleTheme() { applyTheme(currentTheme() === "dark" ? "light" : "dark"); }

  /* ---------- 라우팅 ---------- */
  function render(view) {
    stopSpeaking();
    clear(appEl);
    appEl.appendChild(view);
    window.scrollTo(0, 0);
  }

  function go(route) {
    if (route.screen === "home") render(renderHome());
    else if (route.screen === "lesson") render(renderLesson(route.day));
    else if (route.screen === "quiz") render(renderLessonQuiz(route.day));
  }

  /* ---------- 홈 화면 ---------- */
  function renderHome() {
    var done = progress.completed.length;
    var pct = Math.round((done / TOTAL_DAYS) * 100);

    var wrap = el("div", { class: "screen screen--home" });

    var head = el("div", { class: "home-head" }, [
      el("h1", { text: "타갈로그어 100일 마스터" }),
      el("p", { class: "subtitle", text: "하루 한 수업씩, 100일 안에 기초 회화 완성" })
    ]);

    var progressBox = el("div", { class: "progress" }, [
      el("div", { class: "progress__top" }, [
        el("span", { class: "progress__label", text: done + "/" + TOTAL_DAYS + "일 완료" }),
        el("span", { class: "progress__pct", text: pct + "%" })
      ]),
      el("div", { class: "progress__bar" }, [
        el("div", { class: "progress__fill", attrs: { style: "width:" + pct + "%" } })
      ])
    ]);

    head.appendChild(progressBox);
    wrap.appendChild(head);

    // ----- 복습 -----
    wrap.appendChild(el("h2", { class: "grid-title", text: "복습" }));
    var reviewGrid = el("div", { class: "review-grid" });
    REVIEW_TYPES.forEach(function (t) {
      reviewGrid.appendChild(el("button", {
        class: "review-card",
        attrs: { type: "button" },
        on: { click: function () { render(renderReviewScope(t.key)); } }
      }, [
        el("span", { class: "review-card__icon", text: t.icon }),
        el("span", { class: "review-card__label", text: t.label }),
        el("span", { class: "review-card__desc", text: t.desc })
      ]));
    });
    wrap.appendChild(reviewGrid);

    wrap.appendChild(el("h2", { class: "grid-title", text: "일차 선택" }));

    var grid = el("div", { class: "day-grid" });
    for (var d = 1; d <= TOTAL_DAYS; d++) {
      grid.appendChild(renderDayCell(d));
    }
    wrap.appendChild(grid);
    return wrap;
  }

  function renderDayCell(day) {
    var hasData = !!window.LESSONS[day];
    var isDone = progress.completed.indexOf(day) !== -1;
    var score = progress.scores[day];

    var children = [el("span", { class: "day-cell__num", text: String(day) })];

    if (isDone) {
      children.push(el("span", { class: "day-cell__check", text: "✓" }));
      if (score != null) children.push(el("span", { class: "day-cell__score", text: score + "점" }));
    } else if (hasData) {
      children.push(el("span", { class: "day-cell__sub", text: "시작" }));
    } else {
      children.push(el("span", { class: "day-cell__sub", text: "Coming soon" }));
    }

    var cls = "day-cell";
    if (!hasData) cls += " day-cell--locked";
    else if (isDone) cls += " day-cell--done";
    else cls += " day-cell--active";

    var attrs = { type: "button" };
    if (!hasData) attrs.disabled = "disabled";
    attrs["aria-label"] = day + "일차" + (hasData ? "" : " (준비 중)");

    return el("button", {
      class: cls,
      attrs: attrs,
      on: hasData ? { click: function () { go({ screen: "lesson", day: day }); } } : null
    }, children);
  }

  /* ---------- 콘텐츠 블록 렌더링 ---------- */
  function renderBlock(block) {
    switch (block.type) {
      case "p":
        return el("p", { class: "block", html: mdInline(block.text) });

      case "list": {
        var listTag = block.ordered ? "ol" : "ul";
        var list = el(listTag, {});
        (block.items || []).forEach(function (it) {
          list.appendChild(el("li", { html: mdInline(it) }));
        });
        return el("div", { class: "block" }, [list]);
      }

      case "table":
        return renderTable(block);

      case "examples": {
        var ul = el("ul", { class: "block examples" });
        (block.items || []).forEach(function (ex) {
          var tlNode = el("span", { class: "example__tl", text: ex.tl });
          var left = el("div", {}, [
            tlNode,
            el("div", { class: "example__ko", text: ex.ko })
          ]);
          var row = el("li", { class: "example" }, [left]);
          var sb = makeSpeakBtn(ex.tl);
          if (sb) {
            row.style.justifyContent = "space-between";
            row.appendChild(sb);
          }
          ul.appendChild(row);
        });
        return ul;
      }

      case "tip":
        return el("div", { class: "block tip", html: mdInline(block.text) });

      default:
        return el("p", { class: "block", text: "" });
    }
  }

  function renderTable(block) {
    var cols = block.columns || [];
    var speakCol = typeof block.speakCol === "number" ? block.speakCol : -1;

    var thead = el("thead", {}, [
      el("tr", {}, cols.map(function (c) { return el("th", { text: c }); }))
    ]);

    var tbody = el("tbody", {});
    (block.rows || []).forEach(function (row) {
      var tr = el("tr", {});
      row.forEach(function (cellText, ci) {
        var td;
        if (ci === speakCol && canSpeak()) {
          var speakText = String(cellText).replace(/\s*\(.*?\)\s*/g, "").split("/")[0].trim();
          var span = el("span", { class: "cell-speak" }, [
            document.createTextNode(cellText),
            makeSpeakBtn(speakText || cellText)
          ]);
          td = el("td", {}, [span]);
        } else {
          td = el("td", { text: cellText });
        }
        tr.appendChild(td);
      });
      tbody.appendChild(tr);
    });

    var table = el("table", { class: "tbl" }, [thead, tbody]);
    return el("div", { class: "block tbl-wrap" }, [table]);
  }

  /* ---------- 수업 화면 (교시별 스텝) ---------- */
  function renderLesson(day) {
    var lesson = window.LESSONS[day];
    if (!lesson) return renderHome();

    var sections = lesson.sections || [];
    var step = 0;

    var wrap = el("div", { class: "screen screen--lesson" });

    var top = el("div", { class: "lesson-top" }, [
      el("span", { class: "lesson-top__day", text: "DAY " + day }),
      el("h1", { text: lesson.title })
    ]);
    wrap.appendChild(top);

    var stepper = el("div", { class: "stepper" });
    sections.forEach(function () { stepper.appendChild(el("div", { class: "stepper__dot" })); });
    wrap.appendChild(stepper);

    var sectionHost = el("div", {});
    wrap.appendChild(sectionHost);

    var navRow = el("div", { class: "nav-row" });
    wrap.appendChild(navRow);

    function paint() {
      // 스텝 표시
      Array.prototype.forEach.call(stepper.children, function (dot, i) {
        dot.className = "stepper__dot" + (i <= step ? " stepper__dot--on" : "");
      });

      clear(sectionHost);
      var sec = sections[step];
      var card = el("div", { class: "card section" }, [
        el("h2", { text: sec.title })
      ]);
      (sec.blocks || []).forEach(function (b) { card.appendChild(renderBlock(b)); });
      sectionHost.appendChild(card);

      clear(navRow);
      var prevBtn = el("button", {
        class: "btn btn--ghost",
        attrs: step === 0 ? { type: "button", disabled: "disabled" } : { type: "button" },
        text: "← 이전",
        on: { click: function () { if (step > 0) { step--; paint(); } } }
      });
      navRow.appendChild(prevBtn);

      if (step < sections.length - 1) {
        navRow.appendChild(el("button", {
          class: "btn btn--primary",
          attrs: { type: "button" },
          text: "다음 교시 →",
          on: { click: function () { step++; paint(); } }
        }));
      } else {
        navRow.appendChild(el("button", {
          class: "btn btn--primary",
          attrs: { type: "button" },
          text: "퀴즈 풀기 →",
          on: { click: function () { go({ screen: "quiz", day: day }); } }
        }));
      }
      window.scrollTo(0, 0);
    }

    paint();
    return wrap;
  }

  /* ---------- 주관식 채점: 정규화 ---------- */
  function normalize(str) {
    var s = String(str).toLowerCase().trim();
    s = s.replace(/\s+/g, " ");                       // 연속 공백 1개
    s = s.replace(/[.,!?'’"]/g, "");                  // 구두점 제거
    var words = s.split(" ").filter(function (w) {
      return w !== "" && w !== "po" && w !== "ba";    // po, ba 단어 제거
    });
    return words.join(" ").trim();
  }

  function checkInput(userAns, answers) {
    var u = normalize(userAns);
    if (u === "") return false;
    return (answers || []).some(function (a) { return normalize(a) === u; });
  }

  /* ---------- 퀴즈 코어 (수업 퀴즈 + 복습 공용) ---------- */
  function makeQuizScreen(config) {
    // config: { questions, headerTitle, onComplete(grade) }
    var questions = config.questions || [];

    var idx = 0;
    var userAnswers = new Array(questions.length).fill(null);

    var wrap = el("div", { class: "screen screen--quiz" });

    var head = el("div", { class: "quiz-head" }, [
      el("span", { class: "quiz-head__count" }),
      el("span", { class: "quiz-head__title", text: config.headerTitle || "퀴즈" })
    ]);
    wrap.appendChild(head);

    var host = el("div", {});
    wrap.appendChild(host);

    function paintQuestion() {
      var q = questions[idx];
      head.firstChild.textContent = (idx + 1) + " / " + questions.length;

      clear(host);
      var card = el("div", { class: "card quiz-card" }, [
        el("p", { class: "quiz-q", html: mdInline(q.q) })
      ]);

      var nextBtn;

      function refreshNext() {
        var answered = userAnswers[idx] != null &&
          !(q.type === "input" && String(userAnswers[idx]).trim() === "");
        nextBtn.disabled = !answered;
      }

      if (q.type === "choice") {
        var optWrap = el("div", { class: "options" });
        q.options.forEach(function (opt, oi) {
          var b = el("button", {
            class: "option" + (userAnswers[idx] === oi ? " option--selected" : ""),
            attrs: { type: "button" },
            html: mdInline(opt),
            on: { click: function () {
              userAnswers[idx] = oi;
              Array.prototype.forEach.call(optWrap.children, function (c, ci) {
                c.className = "option" + (ci === oi ? " option--selected" : "");
              });
              refreshNext();
            } }
          });
          optWrap.appendChild(b);
        });
        card.appendChild(optWrap);
      } else { // input
        var input = el("input", {
          class: "quiz-input",
          attrs: {
            type: "text", placeholder: "타갈로그어로 입력…",
            autocomplete: "off", autocapitalize: "off", spellcheck: "false",
            value: userAnswers[idx] != null ? userAnswers[idx] : ""
          },
          on: {
            input: function () { userAnswers[idx] = this.value; refreshNext(); },
            keydown: function (e) {
              if (e.key === "Enter" && !nextBtn.disabled) nextBtn.click();
            }
          }
        });
        card.appendChild(input);
        card.appendChild(el("p", { class: "quiz-hint", text: "po, ba, 대소문자, 구두점은 채점에 영향 없어요." }));
      }

      var isLast = idx === questions.length - 1;
      nextBtn = el("button", {
        class: "btn btn--primary btn--block",
        attrs: { type: "button" },
        text: isLast ? "결과 보기" : "다음 →",
        on: { click: function () {
          if (idx < questions.length - 1) { idx++; paintQuestion(); }
          else { showResult(); }
        } }
      });

      var navRow = el("div", { class: "nav-row" });
      if (idx > 0) {
        navRow.appendChild(el("button", {
          class: "btn btn--ghost",
          attrs: { type: "button" },
          text: "← 이전",
          on: { click: function () { idx--; paintQuestion(); } }
        }));
      }
      navRow.appendChild(nextBtn);
      card.appendChild(navRow);

      host.appendChild(card);
      refreshNext();
      window.scrollTo(0, 0);
    }

    function grade() {
      var results = questions.map(function (q, i) {
        var ua = userAnswers[i];
        var correct, userText, correctText;
        if (q.type === "choice") {
          correct = ua === q.answer;
          userText = ua != null ? q.options[ua] : "(미응답)";
          correctText = q.options[q.answer];
        } else {
          correct = checkInput(ua || "", q.answers);
          userText = ua && String(ua).trim() !== "" ? ua : "(미응답)";
          correctText = (q.answers || []).join(" / ");
        }
        return { q: q, correct: correct, userText: userText, correctText: correctText };
      });
      var right = results.filter(function (r) { return r.correct; }).length;
      var score = questions.length ? Math.round((right / questions.length) * 100) : 0;
      return { results: results, right: right, score: score };
    }

    function showResult() {
      config.onComplete(grade());
    }

    paintQuestion();
    return wrap;
  }

  /* ---------- 수업 퀴즈 ---------- */
  function renderLessonQuiz(day) {
    var lesson = window.LESSONS[day];
    if (!lesson) return renderHome();
    return makeQuizScreen({
      questions: lesson.quiz || [],
      headerTitle: "DAY " + day + " 퀴즈",
      onComplete: function (g) {
        recordResult(day, g.score);
        var nextDay = day + 1, hasNext = !!window.LESSONS[nextDay];
        render(renderResult(g, {
          best: progress.scores[day],
          actions: [
            { label: "다시 풀기", kind: "ghost", onClick: function () { go({ screen: "quiz", day: day }); } },
            { label: "홈으로", kind: "ghost", onClick: function () { go({ screen: "home" }); } },
            { label: hasNext ? (nextDay + "일차로 →") : "다음 일차 준비 중", kind: "primary",
              disabled: !hasNext, onClick: hasNext ? function () { go({ screen: "lesson", day: nextDay }); } : null }
          ]
        }));
      }
    });
  }

  /* ---------- 결과 화면 (수업 퀴즈 + 복습 공용) ---------- */
  function renderResult(g, opts) {
    opts = opts || {};
    var wrap = el("div", { class: "screen screen--result" });

    var emoji = g.score >= 90 ? "🎉" : g.score >= 70 ? "👍" : g.score >= 50 ? "💪" : "📚";

    var hero = el("div", { class: "card result-hero" }, [
      el("div", { class: "result-hero__emoji", text: emoji }),
      el("div", { class: "result-hero__score", text: g.score + "점" }),
      el("div", { class: "result-hero__detail",
        text: g.right + " / " + g.results.length + "문제 정답" })
    ]);
    if (opts.best != null) {
      hero.appendChild(el("div", { class: "result-hero__best", text: "최고 점수: " + opts.best + "점" }));
    }
    wrap.appendChild(hero);

    wrap.appendChild(el("h2", { class: "review-title", text: "문제별 결과" }));

    g.results.forEach(function (r, i) {
      var item = el("div", { class: "card review-item" });
      item.appendChild(el("div", { class: "review-item__head" }, [
        el("span", {
          class: "mark " + (r.correct ? "mark--ok" : "mark--no"),
          text: r.correct ? "O" : "X"
        }),
        el("span", { class: "review-item__q", html: (i + 1) + ". " + mdInline(r.q.q) })
      ]));

      item.appendChild(el("p", { class: "review-line" }, [
        el("span", { class: "review-line__label", text: "내 답" }),
        el("span", { class: r.correct ? "ans-ok" : "ans-no", text: r.userText })
      ]));

      if (!r.correct) {
        item.appendChild(el("p", { class: "review-line" }, [
          el("span", { class: "review-line__label", text: "정답" }),
          el("span", { class: "ans-ok", text: r.correctText })
        ]));
      }

      if (r.q.explain) {
        item.appendChild(el("div", { class: "review-explain", html: mdInline(r.q.explain) }));
      }
      wrap.appendChild(item);
    });

    // 액션 버튼: ghost들은 한 줄, primary는 블록으로
    var actions = opts.actions || [];
    var ghosts = actions.filter(function (a) { return a.kind !== "primary"; });
    var primaries = actions.filter(function (a) { return a.kind === "primary"; });

    if (ghosts.length) {
      wrap.appendChild(el("div", { class: "btn-row", attrs: { style: "margin-top:20px" } },
        ghosts.map(function (a) {
          return el("button", {
            class: "btn btn--ghost", attrs: { type: "button" }, text: a.label,
            on: a.onClick ? { click: a.onClick } : null
          });
        })
      ));
    }
    primaries.forEach(function (a) {
      var b = el("button", {
        class: "btn btn--primary btn--block",
        attrs: a.disabled ? { type: "button", disabled: "disabled" } : { type: "button" },
        text: a.label,
        on: (a.onClick && !a.disabled) ? { click: a.onClick } : null
      });
      wrap.appendChild(el("div", { attrs: { style: "margin-top:10px" } }, [b]));
    });

    return wrap;
  }

  /* ============================================================
     복습 시스템 — 등록된 수업 데이터에서 퀴즈를 자동 생성
     ============================================================ */
  function getAvailableDays() {
    var arr = Array.isArray(window.LESSON_DAYS) ? window.LESSON_DAYS : [];
    return arr.filter(function (d) { return !!window.LESSONS[d]; })
      .slice().sort(function (a, b) { return a - b; });
  }

  // 셀에서 타갈로그어만 추출 (한글 발음 괄호·슬래시 변형 제거) — 표 speakCol과 동일 규칙
  function cleanTerm(s) {
    return String(s == null ? "" : s).replace(/\s*\(.*?\)\s*/g, "").split("/")[0].trim();
  }
  // 뜻 텍스트에서 괄호 보충설명 제거
  function cleanMeaning(s) {
    return String(s == null ? "" : s).replace(/\s*\(.*?\)\s*/g, " ").replace(/\s+/g, " ").trim();
  }
  function shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }
  function sample(arr, n) { return shuffle(arr).slice(0, n); }
  function uniqueValues(arr) {
    var seen = {}, out = [];
    arr.forEach(function (v) { if (!seen[v]) { seen[v] = 1; out.push(v); } });
    return out;
  }

  // 표에서 (타갈로그어 단어, 뜻) 쌍 수집
  function collectWords(days) {
    var out = [], seen = {};
    days.forEach(function (d) {
      var L = window.LESSONS[d];
      if (!L) return;
      (L.sections || []).forEach(function (s) {
        (s.blocks || []).forEach(function (b) {
          if (b.type !== "table" || typeof b.speakCol !== "number") return;
          var meaningIdx = -1;
          (b.columns || []).forEach(function (c, ci) { if (/뜻/.test(c)) meaningIdx = ci; });
          if (meaningIdx < 0) return;
          (b.rows || []).forEach(function (row) {
            var tl = cleanTerm(row[b.speakCol]);
            var ko = cleanMeaning(row[meaningIdx]);
            if (!tl || !ko || seen[tl]) return;
            seen[tl] = 1;
            out.push({ tl: tl, ko: ko });
          });
        });
      });
    });
    return out;
  }

  // examples 블록에서 (타갈로그어 문장, 뜻) 쌍 수집
  function collectSentences(days) {
    var out = [], seen = {};
    days.forEach(function (d) {
      var L = window.LESSONS[d];
      if (!L) return;
      (L.sections || []).forEach(function (s) {
        (s.blocks || []).forEach(function (b) {
          if (b.type !== "examples") return;
          (b.items || []).forEach(function (it) {
            var tl = String(it.tl == null ? "" : it.tl).trim();
            var ko = cleanMeaning(it.ko);
            if (!tl || !ko || seen[tl]) return;
            seen[tl] = 1;
            out.push({ tl: tl, ko: ko });
          });
        });
      });
    });
    return out;
  }

  // (보기/정답) 객관식 한 문항 생성
  function makeChoice(qText, correct, distractPool, explain) {
    var distract = sample(uniqueValues(distractPool.filter(function (x) { return x !== correct; })), 3);
    var options = shuffle([correct].concat(distract));
    return { type: "choice", q: qText, options: options, answer: options.indexOf(correct), explain: explain };
  }

  function buildWordQuiz(days) {
    var words = collectWords(days);
    if (words.length < 2) return [];
    var allKo = words.map(function (w) { return w.ko; });
    return sample(words, Math.min(REVIEW_LIMIT, words.length)).map(function (w) {
      return makeChoice("**" + w.tl + "** 의 뜻은?", w.ko, allKo, w.tl + " = " + w.ko);
    });
  }

  function buildSentenceQuiz(days) {
    var sents = collectSentences(days);
    if (sents.length < 2) return [];
    var allTl = sents.map(function (s) { return s.tl; });
    return sample(sents, Math.min(REVIEW_LIMIT, sents.length)).map(function (s) {
      return makeChoice("\"" + s.ko + "\" 를 타갈로그어로?", s.tl, allTl, s.tl + " = " + s.ko);
    });
  }

  function buildGrammarQuiz(days) {
    var pool = [];
    days.forEach(function (d) {
      var L = window.LESSONS[d];
      if (L && L.quiz) pool = pool.concat(L.quiz);
    });
    if (!pool.length) return [];
    return sample(pool, Math.min(REVIEW_LIMIT, pool.length));
  }

  function buildReviewQuestions(type, days) {
    if (type === "word") return buildWordQuiz(days);
    if (type === "sentence") return buildSentenceQuiz(days);
    return buildGrammarQuiz(days);
  }

  // 복습 범위 선택 화면
  function renderReviewScope(type) {
    var meta = reviewMeta(type);
    var available = getAvailableDays();
    var wrap = el("div", { class: "screen screen--scope" });

    wrap.appendChild(el("button", {
      class: "link-back", attrs: { type: "button" }, text: "← 홈으로",
      on: { click: function () { go({ screen: "home" }); } }
    }));
    wrap.appendChild(el("h1", { class: "scope-title", text: meta.icon + " " + meta.label }));

    if (!available.length) {
      wrap.appendChild(el("p", { class: "scope-sub", text: "아직 등록된 수업이 없어 복습할 내용이 없어요." }));
      return wrap;
    }

    wrap.appendChild(el("p", { class: "scope-sub", text: "복습 범위를 선택하세요." }));

    // 1) 전체
    wrap.appendChild(el("button", {
      class: "card scope-opt", attrs: { type: "button" },
      on: { click: function () { startReview(type, available); } }
    }, [
      el("span", { class: "scope-opt__title", text: "지금까지 배운 것 전체" }),
      el("span", { class: "scope-opt__desc", text: "등록된 " + available.length + "개 수업 전체에서 출제" })
    ]));

    // 2) 수업 지정 (회차 범위)
    var startSel = el("select", { class: "range-sel", attrs: { "aria-label": "시작 회차" } });
    var endSel = el("select", { class: "range-sel", attrs: { "aria-label": "끝 회차" } });
    available.forEach(function (d) {
      startSel.appendChild(el("option", { attrs: { value: String(d) }, text: d + "회차" }));
      endSel.appendChild(el("option", { attrs: { value: String(d) }, text: d + "회차" }));
    });
    startSel.value = String(available[0]);
    endSel.value = String(available[available.length - 1]);

    var custom = el("div", { class: "card scope-opt scope-opt--custom" }, [
      el("span", { class: "scope-opt__title", text: "수업 지정해서 복습" }),
      el("span", { class: "scope-opt__desc", text: "회차 범위를 골라 출제 (예: 1~3회차)" }),
      el("div", { class: "range-row" }, [
        startSel, el("span", { class: "range-tilde", text: "~" }), endSel
      ]),
      el("button", {
        class: "btn btn--primary btn--block", attrs: { type: "button" }, text: "이 범위로 복습 시작",
        on: { click: function () {
          var s = parseInt(startSel.value, 10), e = parseInt(endSel.value, 10);
          if (s > e) { var t = s; s = e; e = t; }
          var sel = available.filter(function (d) { return d >= s && d <= e; });
          startReview(type, sel);
        } }
      })
    ]);
    wrap.appendChild(custom);

    return wrap;
  }

  function startReview(type, days) {
    var meta = reviewMeta(type);
    var questions = buildReviewQuestions(type, days);

    if (!questions.length) {
      render(renderReviewEmpty(type, days));
      return;
    }

    var label = days.length === 1
      ? (days[0] + "회차")
      : (days[0] + "~" + days[days.length - 1] + "회차");

    render(makeQuizScreen({
      questions: questions,
      headerTitle: meta.label + " · " + label,
      onComplete: function (g) {
        render(renderResult(g, {
          best: null,
          actions: [
            { label: "다시 풀기", kind: "ghost", onClick: function () { startReview(type, days); } },
            { label: "홈으로", kind: "ghost", onClick: function () { go({ screen: "home" }); } },
            { label: "복습 범위 다시 선택", kind: "primary", onClick: function () { render(renderReviewScope(type)); } }
          ]
        }));
      }
    }));
  }

  function renderReviewEmpty(type, days) {
    var meta = reviewMeta(type);
    var wrap = el("div", { class: "screen screen--scope" });
    wrap.appendChild(el("button", {
      class: "link-back", attrs: { type: "button" }, text: "← 뒤로",
      on: { click: function () { render(renderReviewScope(type)); } }
    }));
    wrap.appendChild(el("h1", { class: "scope-title", text: meta.icon + " " + meta.label }));
    wrap.appendChild(el("div", { class: "card scope-empty" }, [
      el("p", { text: "선택한 범위에는 " + meta.label.replace(" 복습", "") + "으로 낼 내용이 부족해요." }),
      el("p", { class: "scope-sub", text: "범위를 넓히거나 다른 복습을 골라보세요." })
    ]));
    return wrap;
  }

  /* ---------- 헤더 버튼 (홈 / 테마) ---------- */
  document.getElementById("home-btn").addEventListener("click", function () {
    go({ screen: "home" });
  });
  var themeBtn = document.getElementById("theme-btn");
  if (themeBtn) themeBtn.addEventListener("click", toggleTheme);
  applyTheme(currentTheme()); // <head> 인라인 스크립트로 정해진 테마에 아이콘 동기화

  /* ---------- 부팅 ---------- */
  var days = Array.isArray(window.LESSON_DAYS) ? window.LESSON_DAYS.slice() : [];
  loadLessonScripts(days).then(function () {
    go({ screen: "home" });
  });
})();
