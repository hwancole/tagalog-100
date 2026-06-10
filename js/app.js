/* ============================================================
   타갈로그어 100일 마스터 — 앱 로직 (순수 JS, 빌드 도구 없음)
   ============================================================ */
(function () {
  "use strict";

  var TOTAL_DAYS = 100;
  var STORAGE_KEY = "tagalog100";
  var LESSON_DIR = "lessons/";

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

  // 발음 재생 가능 여부: 미지원이면 false → 버튼 숨김
  function canSpeak() { return speech.supported; }

  function speak(text, btn) {
    if (!speech.supported) return;
    try {
      window.speechSynthesis.cancel();
      var u = new SpeechSynthesisUtterance(text);
      if (speech.voice) u.voice = speech.voice;
      u.lang = speech.voice ? speech.voice.lang : "fil-PH";
      u.rate = 0.9;
      if (btn) {
        u.onstart = function () { btn.classList.add("speak-btn--speaking"); };
        var off = function () { btn.classList.remove("speak-btn--speaking"); };
        u.onend = off;
        u.onerror = off;
      }
      window.speechSynthesis.speak(u);
    } catch (e) { /* 무시 */ }
  }

  function makeSpeakBtn(text) {
    if (!canSpeak()) return null;
    return el("button", {
      class: "speak-btn",
      attrs: { type: "button", "aria-label": "발음 듣기", title: "발음 듣기" },
      text: "🔊",
      on: { click: function () { speak(text, this); } }
    });
  }

  /* ---------- 라우팅 ---------- */
  function render(view) {
    if (speech.supported) window.speechSynthesis.cancel();
    clear(appEl);
    appEl.appendChild(view);
    window.scrollTo(0, 0);
  }

  function go(route) {
    if (route.screen === "home") render(renderHome());
    else if (route.screen === "lesson") render(renderLesson(route.day));
    else if (route.screen === "quiz") render(renderQuiz(route.day));
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

  /* ---------- 퀴즈 화면 ---------- */
  function renderQuiz(day) {
    var lesson = window.LESSONS[day];
    if (!lesson) return renderHome();
    var questions = lesson.quiz || [];

    var idx = 0;
    var userAnswers = new Array(questions.length).fill(null);

    var wrap = el("div", { class: "screen screen--quiz" });

    var head = el("div", { class: "quiz-head" }, [
      el("span", { class: "quiz-head__count" }),
      el("span", { class: "quiz-head__title", text: "DAY " + day + " 퀴즈" })
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
      var g = grade();
      recordResult(day, g.score);
      render(renderResult(day, g));
    }

    paintQuestion();
    return wrap;
  }

  /* ---------- 결과 화면 ---------- */
  function renderResult(day, g) {
    var wrap = el("div", { class: "screen screen--result" });

    var emoji = g.score >= 90 ? "🎉" : g.score >= 70 ? "👍" : g.score >= 50 ? "💪" : "📚";
    var best = progress.scores[day];

    var hero = el("div", { class: "card result-hero" }, [
      el("div", { class: "result-hero__emoji", text: emoji }),
      el("div", { class: "result-hero__score", text: g.score + "점" }),
      el("div", { class: "result-hero__detail",
        text: g.right + " / " + g.results.length + "문제 정답" })
    ]);
    if (best != null) {
      hero.appendChild(el("div", { class: "result-hero__best", text: "최고 점수: " + best + "점" }));
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

    // 액션 버튼
    var nextDay = day + 1;
    var hasNext = !!window.LESSONS[nextDay];

    var row1 = el("div", { class: "btn-row", attrs: { style: "margin-top:20px" } }, [
      el("button", {
        class: "btn btn--ghost", attrs: { type: "button" }, text: "다시 풀기",
        on: { click: function () { go({ screen: "quiz", day: day }); } }
      }),
      el("button", {
        class: "btn btn--ghost", attrs: { type: "button" }, text: "홈으로",
        on: { click: function () { go({ screen: "home" }); } }
      })
    ]);
    wrap.appendChild(row1);

    var nextBtn = el("button", {
      class: "btn btn--primary btn--block",
      attrs: hasNext ? { type: "button" } : { type: "button", disabled: "disabled" },
      text: hasNext ? (nextDay + "일차로 →") : "다음 일차 준비 중",
      on: hasNext ? { click: function () { go({ screen: "lesson", day: nextDay }); } } : null
    });
    wrap.appendChild(el("div", { attrs: { style: "margin-top:10px" } }, [nextBtn]));

    return wrap;
  }

  /* ---------- 헤더 홈 버튼 ---------- */
  document.getElementById("home-btn").addEventListener("click", function () {
    go({ screen: "home" });
  });

  /* ---------- 부팅 ---------- */
  var days = Array.isArray(window.LESSON_DAYS) ? window.LESSON_DAYS.slice() : [];
  loadLessonScripts(days).then(function () {
    go({ screen: "home" });
  });
})();
