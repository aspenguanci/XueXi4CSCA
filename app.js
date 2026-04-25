// ============================================================
//  XueXi4CSCA — app.js  (FULL REBUILD)
//  ✅ Fixed navigation + button routing
//  ✅ AI-powered Duolingo-style lesson engine
//  ✅ All CSCA topics wired with detailed lessons
//  ✅ XP, streaks, progress, flashcards, tests, notes
// ============================================================

const ANTHROPIC_MODEL = "claude-sonnet-4-20250514";

// ===== STATE =====
let state = {
  currentPage: 'home',
  currentSubject: 'chinese',
  streak: parseInt(localStorage.getItem('xx_streak') || '0'),
  xp: parseInt(localStorage.getItem('xx_xp') || '0'),
  level: parseInt(localStorage.getItem('xx_level') || '1'),
  completedLessons: JSON.parse(localStorage.getItem('xx_completed') || '[]'),
  studiedDays: JSON.parse(localStorage.getItem('xx_days') || '[]'),
  testsCompleted: parseInt(localStorage.getItem('xx_tests') || '0'),
  // lesson state
  activeLessonId: null,
  lessonSteps: [],
  lessonStepIndex: 0,
  lessonHearts: 3,
  lessonXpEarned: 0,
  lessonAnswer: null,
  lessonChecked: false,
  lessonAiMode: false,
  lessonAiHistory: [],
  // flashcard state
  currentDeck: null,
  currentCardIndex: 0,
  cardFlipped: false,
  // test state
  currentTest: null,
  currentQuestion: 0,
  testAnswers: [],
  testStartTime: null,
  testTimerInterval: null,
  // notes state
  notesSubject: 'chinese',
  // match state
  matchSelected: null,
  matchPairs: [],
  matchSolved: []
};

function saveState() {
  localStorage.setItem('xx_streak', state.streak);
  localStorage.setItem('xx_xp', state.xp);
  localStorage.setItem('xx_level', state.level);
  localStorage.setItem('xx_completed', JSON.stringify(state.completedLessons));
  localStorage.setItem('xx_days', JSON.stringify(state.studiedDays));
  localStorage.setItem('xx_tests', state.testsCompleted);
}

// ===== NAVIGATION =====
function goTo(page) { navigateTo(page); }

function navigateTo(page) {
  state.currentPage = page;
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(l => l.classList.remove('active'));
  const pg = document.getElementById(`page-${page}`);
  if (pg) pg.classList.add('active');
  const nav = document.querySelector(`[data-page="${page}"]`);
  if (nav) nav.classList.add('active');

  if (page === 'home')       renderHome();
  if (page === 'learn')      renderLearnPath();
  if (page === 'chinese')    renderSubjectPage('chinese');
  if (page === 'math')       renderSubjectPage('math');
  if (page === 'physics')    renderSubjectPage('physics');
  if (page === 'chemistry')  renderSubjectPage('chemistry');
  if (page === 'flashcards') renderFlashcards();
  if (page === 'notes')      renderNotes();
  if (page === 'tests')      renderTests();
  if (page === 'reminders')  renderReminders();

  if (window.innerWidth < 900) closeMobileMenu();
}

function setupNav() {
  document.querySelectorAll('.nav-item').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const page = link.dataset.page;
      if (page) navigateTo(page);
    });
  });
  document.getElementById('hamburger').addEventListener('click', () => {
    document.getElementById('sidebar').classList.toggle('open');
    document.getElementById('overlay').classList.toggle('show');
  });
  document.getElementById('overlay').addEventListener('click', closeMobileMenu);
}

function closeMobileMenu() {
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('overlay').classList.remove('show');
}

// ===== XP & LEVEL =====
function addXP(amount) {
  state.xp += amount;
  const xpNeeded = state.level * 100;
  if (state.xp >= xpNeeded) {
    state.xp -= xpNeeded;
    state.level++;
    showToast(`🎉 Level Up! You're now Level ${state.level}!`, 'level');
  }
  updateSidebarStats();
  saveState();
  showToast(`+${amount} XP ⚡`, 'xp');
}

function updateSidebarStats() {
  const xpNeeded = state.level * 100;
  const pct = Math.min(100, Math.round((state.xp / xpNeeded) * 100));
  const fill = document.getElementById('sb-xp-fill');
  if (fill) fill.style.width = pct + '%';
  const sbStreak = document.getElementById('sb-streak');
  const sbXp = document.getElementById('sb-xp');
  const sbLevel = document.getElementById('sb-level-text');
  if (sbStreak) sbStreak.textContent = state.streak;
  if (sbXp) sbXp.textContent = state.xp;
  if (sbLevel) sbLevel.textContent = `Level ${state.level} · ${state.xp} / ${xpNeeded} XP`;
}

function markTodayStudied() {
  const today = new Date().toISOString().slice(0, 10);
  if (!state.studiedDays.includes(today)) {
    state.studiedDays.push(today);
    // Check streak
    const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
    if (state.studiedDays.includes(yesterday)) {
      state.streak++;
    } else {
      state.streak = 1;
    }
    saveState();
  }
}

// ===== TOAST =====
function showToast(msg, type = '') {
  const stack = document.getElementById('toast-stack');
  const t = document.createElement('div');
  t.className = `toast ${type}`;
  t.textContent = msg;
  stack.appendChild(t);
  setTimeout(() => t.remove(), 3000);
}

// ===== HOME PAGE =====
function renderHome() {
  // Greeting
  const hr = new Date().getHours();
  const greet = hr < 12 ? '早上好! Good morning!' : hr < 18 ? '下午好! Good afternoon!' : '晚上好! Good evening!';
  const hg = document.getElementById('hero-greeting');
  if (hg) hg.textContent = greet;
  // Motivation
  const dm = document.getElementById('daily-motiv');
  if (dm) dm.textContent = DAILY_MOTIVATIONS[new Date().getDate() % DAILY_MOTIVATIONS.length];
  // Stats
  const setEl = (id, v) => { const el = document.getElementById(id); if (el) el.textContent = v; };
  setEl('h-streak', state.streak);
  setEl('h-xp', state.xp);
  setEl('h-done', state.completedLessons.length);
  setEl('h-tests', state.testsCompleted);
  // Calendar
  renderCalendar();
  // Progress
  renderProgressGrid();
  // Continue
  renderContinueRow();
  updateSidebarStats();
}

function renderCalendar() {
  const strip = document.getElementById('cal-strip');
  if (!strip) return;
  strip.innerHTML = '';
  const days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  const today = new Date();
  for (let i = 13; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const key = d.toISOString().slice(0, 10);
    const isToday = i === 0;
    const done = state.studiedDays.includes(key);
    const div = document.createElement('div');
    div.className = `cal-day${done ? ' done' : ''}${isToday ? ' today' : ''}`;
    div.innerHTML = `<span class="cal-n">${d.getDate()}</span><span>${days[d.getDay()]}</span>`;
    strip.appendChild(div);
  }
}

function renderProgressGrid() {
  const grid = document.getElementById('prog-grid');
  if (!grid) return;
  grid.innerHTML = '';
  const subjects = [
    { key: 'chinese', name: 'Chinese 🀄', color: '#EF4444' },
    { key: 'math', name: 'Mathematics 📐', color: '#3B82F6' },
    { key: 'physics', name: 'Physics ⚛️', color: '#8B5CF6' },
    { key: 'chemistry', name: 'Chemistry 🧪', color: '#10B981' }
  ];
  subjects.forEach(s => {
    const total = SUBJECTS[s.key].topics.length;
    const done = state.completedLessons.filter(id => id.startsWith(s.key[0] === 'c' && s.key !== 'chemistry' ? 'c-' : s.key[0] === 'm' ? 'm-' : s.key[0] === 'p' ? 'p-' : 'ch-')).length;
    // fix prefix detection
    const prefix = { chinese: 'c-', math: 'm-', physics: 'p-', chemistry: 'ch-' }[s.key];
    const doneCnt = state.completedLessons.filter(id => id.startsWith(prefix)).length;
    const pct = total > 0 ? Math.round((doneCnt / total) * 100) : 0;
    grid.innerHTML += `
      <div class="prog-card" onclick="goTo('${s.key}')">
        <div class="prog-card-top">
          <span class="prog-card-name">${s.name}</span>
          <span class="prog-pct" style="color:${s.color}">${pct}%</span>
        </div>
        <div class="prog-bar-bg"><div class="prog-bar-fill" style="width:${pct}%;background:${s.color}"></div></div>
      </div>`;
  });
}

function renderContinueRow() {
  const row = document.getElementById('continue-row');
  if (!row) return;
  row.innerHTML = '';
  const suggestions = [];
  Object.entries(SUBJECTS).forEach(([subj, data]) => {
    data.topics.forEach(t => {
      if (!state.completedLessons.includes(t.id)) {
        suggestions.push({ ...t, subj, subjName: data.name, color: data.color });
      }
    });
  });
  suggestions.slice(0, 3).forEach(s => {
    row.innerHTML += `
      <div class="cont-card" onclick="startLesson('${s.id}')">
        <div class="cont-icon">${s.icon}</div>
        <div class="cont-subj" style="color:${s.color}">${s.subjName}</div>
        <div class="cont-title">${s.name}</div>
        <div class="cont-xp">⚡ Earn XP</div>
      </div>`;
  });
  if (suggestions.length === 0) {
    row.innerHTML = '<div style="grid-column:1/-1;text-align:center;padding:32px;color:var(--text2)">🎉 You completed all lessons! Amazing work!</div>';
  }
}

// ===== LEARN PATH =====
function renderLearnPath() {
  // Subject switcher
  const sw = document.getElementById('subject-switcher');
  if (sw) {
    sw.innerHTML = Object.entries(SUBJECTS).map(([k, s]) =>
      `<button class="ss-btn${state.currentSubject === k ? ' active' : ''}" data-s="${k}" onclick="switchPathSubject('${k}')">${s.icon} ${s.name}</button>`
    ).join('');
  }
  renderPathNodes();
}

function switchPathSubject(subj) {
  state.currentSubject = subj;
  document.querySelectorAll('.ss-btn').forEach(b => b.classList.toggle('active', b.dataset.s === subj));
  renderPathNodes();
}

function renderPathNodes() {
  const container = document.getElementById('path-container');
  if (!container) return;
  const subj = SUBJECTS[state.currentSubject];
  container.innerHTML = '';
  // Group topics into units of 3-4
  const chunkSize = 4;
  for (let i = 0; i < subj.topics.length; i += chunkSize) {
    const chunk = subj.topics.slice(i, i + chunkSize);
    const unitNum = Math.floor(i / chunkSize) + 1;
    const unitDone = chunk.every(t => state.completedLessons.includes(t.id));
    const div = document.createElement('div');
    div.className = 'path-unit';
    div.innerHTML = `
      <div class="path-unit-header">
        <span class="puh-num">UNIT ${unitNum}</span>
        <span class="puh-title">${chunk[0].name.split(' ')[0]} & More</span>
        <span class="puh-stars">${unitDone ? '⭐⭐⭐' : '☆☆☆'}</span>
      </div>
      <div class="path-nodes">
        ${chunk.map((t, idx) => {
          const done = state.completedLessons.includes(t.id);
          const active = !done && (idx === 0 || state.completedLessons.includes(chunk[idx - 1]?.id));
          const locked = !done && !active;
          const cls = done ? 'done' : active ? 'active' : 'locked';
          return `
            <div class="path-node ${cls}" onclick="${locked ? '' : `startLesson('${t.id}')`}">
              <div class="node-circle" style="${done ? '' : active ? `border-color:${subj.color}` : ''}">
                ${done ? '✅' : t.icon}
              </div>
              <div class="node-label">${t.name}</div>
              <div class="node-xp">${done ? 'Done ✓' : '⚡ XP'}</div>
            </div>`;
        }).join('')}
      </div>`;
    container.appendChild(div);
  }
}

// ===== SUBJECT PAGES =====
function renderSubjectPage(subj) {
  const grid = document.getElementById(`${subj}-grid`);
  if (!grid) return;
  const data = SUBJECTS[subj];
  grid.innerHTML = data.topics.map(t => {
    const done = state.completedLessons.includes(t.id);
    return `
      <div class="topic-card" style="--tc-color:${data.color}" onclick="startLesson('${t.id}')">
        <div class="tc-icon">${t.icon}</div>
        <div class="tc-name">${t.name}</div>
        <div class="tc-desc">${t.desc}</div>
        <div class="tc-meta">
          <span class="tc-count">${(LESSONS[t.id] || []).length} steps</span>
          <span class="tc-pill ${done ? 'done' : 'new'}">${done ? '✅ Done' : '🆕 New'}</span>
        </div>
      </div>`;
  }).join('');
}

// ===== LESSON ENGINE =====
function startLesson(lessonId) {
  const steps = LESSONS[lessonId];
  if (!steps || steps.length === 0) {
    // No pre-built lesson → AI-generate it
    startAILesson(lessonId);
    return;
  }
  state.activeLessonId = lessonId;
  state.lessonSteps = steps;
  state.lessonStepIndex = 0;
  state.lessonHearts = 3;
  state.lessonXpEarned = 0;
  state.lessonAnswer = null;
  state.lessonChecked = false;
  state.lessonAiMode = false;
  navigateTo('lesson');
  renderLessonStep();
  markTodayStudied();
}

// ===== AI LESSON (for topics without pre-built steps) =====
async function startAILesson(lessonId) {
  state.activeLessonId = lessonId;
  state.lessonAiMode = true;
  state.lessonAiHistory = [];
  state.lessonHearts = 3;
  state.lessonXpEarned = 0;
  navigateTo('lesson');

  // Find topic info
  let topicInfo = null;
  let subjInfo = null;
  Object.entries(SUBJECTS).forEach(([k, s]) => {
    const t = s.topics.find(t => t.id === lessonId);
    if (t) { topicInfo = t; subjInfo = { key: k, ...s }; }
  });

  const shell = document.getElementById('lesson-shell');
  shell.innerHTML = `
    <div class="lesson-topbar">
      <button class="ls-back" onclick="navigateTo('learn')">✕</button>
      <div class="ls-prog-wrap"><div class="ls-prog-fill" id="ls-prog" style="width:0%"></div></div>
      <div class="ls-hearts" id="ls-hearts">❤️❤️❤️</div>
    </div>
    <div class="lesson-content">
      <span class="lc-type-badge lesson">AI LESSON</span>
      <div class="lc-title">${topicInfo ? topicInfo.name : lessonId}</div>
      <div class="lc-subtitle">${topicInfo ? topicInfo.desc : 'Interactive AI-powered lesson'}</div>
    </div>
    <div id="ai-lesson-body">
      <div class="ai-loader">
        <div class="ai-dots"><span></span><span></span><span></span></div>
        Generating your personalized lesson...
      </div>
    </div>`;

  const prompt = buildAILessonPrompt(topicInfo, subjInfo);

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: ANTHROPIC_MODEL,
        max_tokens: 1000,
        system: `You are XueXi4CSCA, a Duolingo-style tutor for students studying for the CSCA (Chinese Science College Admission) exam.
Generate a lesson as JSON with this EXACT structure — no markdown, no backticks, just raw JSON:
{
  "teach": "HTML string with teaching content (use <p>, <ul>, <li>, <strong>, <br> tags only)",
  "questions": [
    {
      "type": "mc",
      "question": "question text",
      "options": ["A","B","C","D"],
      "correct": 0,
      "explanation": "why this is correct"
    },
    {
      "type": "fill",
      "sentence": "sentence with ___ blank",
      "options": ["opt1","opt2","opt3","opt4"],
      "correct": ["opt1"],
      "explanation": "explanation"
    },
    {
      "type": "mc",
      "question": "another question",
      "options": ["A","B","C","D"],
      "correct": 2,
      "explanation": "explanation"
    }
  ]
}
Generate exactly 3 questions. Keep teach content focused and clear.`,
        messages: [{ role: "user", content: prompt }]
      })
    });
    const data = await response.json();
    const text = data.content.map(c => c.text || '').join('');
    let lesson;
    try {
      const clean = text.replace(/```json|```/g, '').trim();
      lesson = JSON.parse(clean);
    } catch {
      lesson = null;
    }
    if (lesson) {
      renderAILesson(lesson, topicInfo);
    } else {
      renderAILessonFallback(topicInfo, lessonId);
    }
  } catch (err) {
    renderAILessonFallback(topicInfo, lessonId);
  }
}

function buildAILessonPrompt(topicInfo, subjInfo) {
  if (!topicInfo) return "Generate a general CSCA lesson.";
  return `Create a CSCA exam lesson on: "${topicInfo.name}" (${topicInfo.desc}) for the subject ${subjInfo ? subjInfo.name : ''}.
The lesson should cover the most important exam-tested concepts for CSCA students.
Make questions challenging but educational. Focus on common exam traps and key formulas/rules.`;
}

function renderAILesson(lesson, topicInfo) {
  const body = document.getElementById('ai-lesson-body');
  if (!body) return;

  // Convert AI lesson to steps format and use regular lesson engine
  const steps = [
    {
      type: 'teach',
      title: topicInfo ? topicInfo.name : 'Lesson',
      content: lesson.teach
    },
    ...(lesson.questions || [])
  ];
  state.lessonSteps = steps;
  state.lessonStepIndex = 0;
  state.lessonAiMode = false;

  // Re-render with these steps
  const shell = document.getElementById('lesson-shell');
  shell.innerHTML = '';
  renderLessonStep();
}

function renderAILessonFallback(topicInfo, lessonId) {
  const body = document.getElementById('ai-lesson-body');
  if (!body) return;
  body.innerHTML = `
    <div class="teach-card">
      <h3>${topicInfo ? topicInfo.name : 'Lesson'}</h3>
      <p>${topicInfo ? topicInfo.desc : ''}</p>
      <div class="teach-callout">⚠️ AI lesson couldn't load. Check your connection and try again.</div>
    </div>
    <div class="lesson-bottom">
      <button class="lb-skip" onclick="navigateTo('learn')">← Back</button>
      <button class="lb-check" onclick="startLesson('${lessonId}')">Retry</button>
    </div>`;
}

// ===== RENDER LESSON STEP =====
function renderLessonStep() {
  const shell = document.getElementById('lesson-shell');
  if (!shell) return;

  const steps = state.lessonSteps;
  const idx = state.lessonStepIndex;
  const total = steps.length;
  const pct = total > 0 ? Math.round((idx / total) * 100) : 0;
  const hearts = '❤️'.repeat(state.lessonHearts) + '🖤'.repeat(3 - state.lessonHearts);

  // Lesson complete
  if (idx >= total) {
    renderLessonComplete();
    return;
  }

  const step = steps[idx];

  shell.innerHTML = `
    <div class="lesson-topbar">
      <button class="ls-back" onclick="confirmExitLesson()">✕</button>
      <div class="ls-prog-wrap"><div class="ls-prog-fill" style="width:${pct}%"></div></div>
      <div class="ls-hearts">${hearts}</div>
    </div>
    <div class="lesson-content" id="lesson-content">
      ${renderStep(step, idx)}
    </div>
    <div class="lesson-bottom" id="lesson-bottom">
      ${renderLessonBottom(step)}
    </div>`;

  // Attach interactions
  setupStepInteractions(step, idx);
}

function renderStep(step, idx) {
  if (step.type === 'teach') return renderTeachStep(step);
  if (step.type === 'mc')    return renderMCStep(step);
  if (step.type === 'fill')  return renderFillStep(step);
  if (step.type === 'match') return renderMatchStep(step);
  if (step.type === 'input') return renderInputStep(step);
  return `<div class="lc-title">Unknown step type</div>`;
}

function renderTeachStep(step) {
  return `
    <span class="lc-type-badge lesson">📖 LESSON</span>
    <div class="lc-title">${step.title}</div>
    <div class="teach-card">${step.content}</div>`;
}

function renderMCStep(step) {
  const letters = ['A','B','C','D','E'];
  const opts = step.options.map((o, i) =>
    `<button class="mc-opt" data-idx="${i}" onclick="selectMC(${i})">
      <div class="mc-opt-letter">${letters[i]}</div>
      <span>${o}</span>
    </button>`
  ).join('');
  return `
    <span class="lc-type-badge quiz">🧠 QUESTION</span>
    ${step.passage ? `<div class="mc-passage">${step.passage}</div>` : ''}
    <div class="mc-question">${step.question}</div>
    <div class="mc-options" id="mc-opts">${opts}</div>
    <div id="lesson-feedback"></div>`;
}

function renderFillStep(step) {
  const displayed = step.sentence.replace('___', `<span class="fill-blank" id="fill-answer">___</span>`);
  const opts = step.options.map((o, i) =>
    `<button class="fill-opt" data-val="${o}" onclick="selectFill('${o}', this)">${o}</button>`
  ).join('');
  return `
    <span class="lc-type-badge fill">✏️ FILL IN</span>
    <div class="fill-sentence">${displayed}</div>
    <div class="fill-options" id="fill-opts">${opts}</div>
    <div id="lesson-feedback"></div>`;
}

function renderMatchStep(step) {
  // Flatten all pairs into shuffled left/right columns
  const lefts = step.pairs.map((p, i) => ({ text: p.left, id: i, side: 'left' }));
  const rights = [...step.pairs.map((p, i) => ({ text: p.right, id: i, side: 'right' }))].sort(() => Math.random() - 0.5);
  state.matchPairs = step.pairs;
  state.matchSolved = [];
  state.matchSelected = null;

  const leftHTML = lefts.map(l =>
    `<div class="match-item zh" data-side="left" data-id="${l.id}" onclick="selectMatch('left',${l.id},this)">${l.text}</div>`
  ).join('');
  const rightHTML = rights.map(r =>
    `<div class="match-item" data-side="right" data-id="${r.id}" onclick="selectMatch('right',${r.id},this)">${r.text}</div>`
  ).join('');

  return `
    <span class="lc-type-badge match">🔗 MATCH</span>
    <div class="lc-title">${step.instruction}</div>
    <div class="match-grid" id="match-grid">
      ${lefts.map((l, i) => `
        <div class="match-item zh" data-side="left" data-id="${l.id}" onclick="selectMatch('left',${l.id},this)">${l.text}</div>
        <div class="match-item" data-side="right" data-id="${rights[i].id}" onclick="selectMatch('right',${rights[i].id},this)">${rights[i].text}</div>
      `).join('')}
    </div>
    <div id="lesson-feedback"></div>`;
}

function renderInputStep(step) {
  return `
    <span class="lc-type-badge input">⌨️ TRANSLATE</span>
    <div class="input-prompt">${step.prompt}</div>
    ${step.hint ? `<div class="teach-callout">💡 Hint: ${step.hint}</div>` : ''}
    <input type="text" class="lesson-input" id="lesson-input" placeholder="Type your answer here..." oninput="onInputChange()" onkeydown="if(event.key==='Enter')checkAnswer()">
    <div id="lesson-feedback"></div>`;
}

function renderLessonBottom(step) {
  if (step.type === 'teach') {
    return `<button class="lb-check next" onclick="nextLessonStep()">Continue →</button>`;
  }
  return `
    <button class="lb-skip" onclick="skipLessonStep()">SKIP</button>
    <button class="lb-check" id="check-btn" disabled onclick="checkAnswer()">CHECK</button>`;
}

// ===== STEP INTERACTIONS =====
function setupStepInteractions(step, idx) {
  if (step.type === 'match') {
    // Auto-check when all pairs matched
  }
}

function selectMC(idx) {
  if (state.lessonChecked) return;
  state.lessonAnswer = idx;
  document.querySelectorAll('.mc-opt').forEach(b => b.classList.remove('selected'));
  const selected = document.querySelector(`.mc-opt[data-idx="${idx}"]`);
  if (selected) selected.classList.add('selected');
  const btn = document.getElementById('check-btn');
  if (btn) { btn.disabled = false; }
}

function selectFill(val, el) {
  if (state.lessonChecked) return;
  state.lessonAnswer = val;
  document.querySelectorAll('.fill-opt').forEach(b => b.classList.remove('selected'));
  el.classList.add('selected');
  const blank = document.getElementById('fill-answer');
  if (blank) blank.textContent = val;
  const btn = document.getElementById('check-btn');
  if (btn) btn.disabled = false;
}

function selectMatch(side, id, el) {
  if (state.matchSolved.includes(id)) return;
  const prev = state.matchSelected;
  if (!prev) {
    state.matchSelected = { side, id, el };
    el.classList.add('selected');
    return;
  }
  // Same side — swap selection
  if (prev.side === side) {
    prev.el.classList.remove('selected');
    state.matchSelected = { side, id, el };
    el.classList.add('selected');
    return;
  }
  // Different sides — check match
  const leftId = side === 'left' ? id : prev.id;
  const rightId = side === 'right' ? id : prev.id;
  const correct = leftId === rightId;
  if (correct) {
    prev.el.classList.remove('selected');
    prev.el.classList.add('matched');
    el.classList.add('matched');
    state.matchSolved.push(leftId);
    showToast('✅ Matched!', 'success');
    state.matchSelected = null;
    if (state.matchSolved.length === state.matchPairs.length) {
      setTimeout(() => {
        showFeedback(true, 'Perfect Match! 🎉', 'You matched all pairs correctly!');
        state.lessonChecked = true;
        enableNextButton();
      }, 400);
    }
  } else {
    prev.el.classList.remove('selected');
    prev.el.classList.add('wrong');
    el.classList.add('wrong');
    setTimeout(() => {
      prev.el.classList.remove('wrong');
      el.classList.remove('wrong');
    }, 600);
    state.matchSelected = null;
    loseHeart();
  }
}

function onInputChange() {
  const inp = document.getElementById('lesson-input');
  const btn = document.getElementById('check-btn');
  if (inp && btn) btn.disabled = inp.value.trim().length === 0;
}

function checkAnswer() {
  if (state.lessonChecked) { nextLessonStep(); return; }
  const step = state.lessonSteps[state.lessonStepIndex];
  let correct = false;
  let explanation = step.explanation || '';

  if (step.type === 'mc') {
    correct = state.lessonAnswer === step.correct;
    document.querySelectorAll('.mc-opt').forEach((b, i) => {
      b.disabled = true;
      if (i === step.correct) b.classList.add('correct');
      if (i === state.lessonAnswer && !correct) b.classList.add('wrong');
    });
  } else if (step.type === 'fill') {
    const correctArr = Array.isArray(step.correct) ? step.correct : [step.correct];
    correct = correctArr.includes(state.lessonAnswer);
    document.querySelectorAll('.fill-opt').forEach(b => {
      b.disabled = true;
      if (correctArr.includes(b.dataset.val)) b.classList.add('correct');
      else if (b.dataset.val === state.lessonAnswer) b.classList.add('wrong');
    });
    const blank = document.getElementById('fill-answer');
    if (blank) blank.textContent = correctArr[0];
  } else if (step.type === 'input') {
    const inp = document.getElementById('lesson-input');
    const userAns = inp ? inp.value.trim().toLowerCase().replace(/[，。！？\s]/g, '') : '';
    const correctAns = step.answer.toLowerCase().replace(/[，。！？\s]/g, '');
    correct = userAns === correctAns;
    if (inp) inp.classList.add(correct ? 'correct' : 'wrong');
  }

  state.lessonChecked = true;
  if (!correct) loseHeart();
  if (correct) { state.lessonXpEarned += 10; }

  showFeedback(correct,
    correct ? ['Correct! 🎉', '完美! Perfect!', 'Nailed it! 🌟', 'Brilliant! 💯'][Math.floor(Math.random()*4)] : 'Not quite...',
    correct ? explanation : (explanation ? `Correct answer: ${step.type === 'fill' ? step.correct : step.options?.[step.correct] || step.answer}<br>${explanation}` : '')
  );

  const btn = document.getElementById('check-btn');
  if (btn) { btn.textContent = 'CONTINUE →'; btn.classList.add('next'); btn.disabled = false; }
}

function showFeedback(correct, title, exp) {
  const fb = document.getElementById('lesson-feedback');
  if (!fb) return;
  fb.innerHTML = `
    <div class="feedback-banner ${correct ? 'correct' : 'wrong'}">
      <div class="fb-icon">${correct ? '✅' : '❌'}</div>
      <div><div class="fb-title">${title}</div><div class="fb-exp">${exp}</div></div>
    </div>`;
}

function enableNextButton() {
  const btn = document.getElementById('check-btn');
  if (btn) { btn.textContent = 'CONTINUE →'; btn.classList.add('next'); btn.disabled = false; }
}

function loseHeart() {
  if (state.lessonHearts > 0) state.lessonHearts--;
  const hearts = document.getElementById('ls-hearts');
  if (hearts) hearts.textContent = '❤️'.repeat(state.lessonHearts) + '🖤'.repeat(3 - state.lessonHearts);
}

function nextLessonStep() {
  state.lessonStepIndex++;
  state.lessonAnswer = null;
  state.lessonChecked = false;
  state.matchSelected = null;
  state.matchSolved = [];
  renderLessonStep();
}

function skipLessonStep() {
  state.lessonHearts = Math.max(0, state.lessonHearts - 1);
  nextLessonStep();
}

function confirmExitLesson() {
  if (confirm('Exit lesson? Your progress will be lost.')) navigateTo('learn');
}

// ===== LESSON COMPLETE =====
function renderLessonComplete() {
  const shell = document.getElementById('lesson-shell');
  if (!shell) return;

  const lessonId = state.activeLessonId;
  if (!state.completedLessons.includes(lessonId)) {
    state.completedLessons.push(lessonId);
  }

  const xp = 50 + (state.lessonXpEarned || 0) + (state.lessonHearts * 10);
  addXP(xp);
  markTodayStudied();
  saveState();

  shell.innerHTML = `
    <div class="lesson-complete">
      <div class="lc-trophy">🏆</div>
      <div class="lc-done-title">Lesson Complete!</div>
      <div class="lc-done-sub">You crushed it! Keep this momentum going.</div>
      <div class="lc-xp-badge">⚡ +${xp} XP Earned</div>
      <div class="lc-stats">
        <div class="lc-stat"><div class="lc-stat-n" style="color:var(--orange)">${state.streak}</div><div class="lc-stat-l">🔥 Streak</div></div>
        <div class="lc-stat"><div class="lc-stat-n" style="color:var(--red)">${state.lessonHearts}</div><div class="lc-stat-l">❤️ Hearts Left</div></div>
        <div class="lc-stat"><div class="lc-stat-n" style="color:var(--green-d)">${state.completedLessons.length}</div><div class="lc-stat-l">✅ Done</div></div>
      </div>
      <div class="lc-actions">
        <button class="btn-secondary" onclick="navigateTo('learn')">Back to Path</button>
        <button class="btn-primary" onclick="startNextLesson('${lessonId}')">Next Lesson →</button>
      </div>
    </div>`;
}

function startNextLesson(currentId) {
  // Find next incomplete lesson
  let found = false;
  for (const [subj, data] of Object.entries(SUBJECTS)) {
    for (const topic of data.topics) {
      if (found && !state.completedLessons.includes(topic.id)) {
        startLesson(topic.id);
        return;
      }
      if (topic.id === currentId) found = true;
    }
  }
  navigateTo('learn');
}

// ===== FLASHCARDS =====
function renderFlashcards() {
  const root = document.getElementById('fc-root');
  if (!root) return;
  if (state.currentDeck) { renderDeckStudy(); return; }

  root.innerHTML = `
    <div class="fc-deck-grid">
      ${FC_DECKS.map(deck => `
        <div class="fc-deck-card" onclick="openDeck('${deck.id}')">
          <div class="fdc-icon">${deck.icon}</div>
          <div class="fdc-name">${deck.name}</div>
          <div class="fdc-count">${deck.cards.length} cards</div>
          <div class="fdc-subj" style="background:${SUBJECTS[deck.subject]?.color}20;color:${SUBJECTS[deck.subject]?.color}">${deck.subject.toUpperCase()}</div>
        </div>`).join('')}
    </div>`;
}

function openDeck(deckId) {
  state.currentDeck = FC_DECKS.find(d => d.id === deckId);
  state.currentCardIndex = 0;
  state.cardFlipped = false;
  renderDeckStudy();
}

function renderDeckStudy() {
  const root = document.getElementById('fc-root');
  if (!root || !state.currentDeck) return;
  const deck = state.currentDeck;
  const idx = state.currentCardIndex;
  const card = deck.cards[idx];
  const pct = Math.round((idx / deck.cards.length) * 100);

  root.innerHTML = `
    <div class="fc-study-header">
      <button class="fc-back-btn" onclick="closeDeck()">← Decks</button>
      <div class="fc-prog-wrap"><div class="fc-prog-fill" style="width:${pct}%"></div></div>
      <div class="fc-prog-txt">${idx + 1} / ${deck.cards.length}</div>
    </div>
    <div class="fc-card-wrap" onclick="flipCard()">
      <div class="fc-card-inner${state.cardFlipped ? ' flipped' : ''}" id="fc-inner">
        <div class="fc-card-face fc-card-front">
          <div class="fc-q">${card.q}</div>
          <div class="fc-hint">Click to reveal ↻</div>
        </div>
        <div class="fc-card-face fc-card-back">
          <div class="fc-ans" style="white-space:pre-line">${card.a}</div>
          <div class="fc-hint">Rate your recall ↓</div>
        </div>
      </div>
    </div>
    ${state.cardFlipped ? `
    <div class="fc-rate-row">
      <button class="fc-rate-btn again" onclick="rateCard('again')">😰 Again</button>
      <button class="fc-rate-btn hard" onclick="rateCard('hard')">😓 Hard</button>
      <button class="fc-rate-btn good" onclick="rateCard('good')">😊 Good</button>
      <button class="fc-rate-btn easy" onclick="rateCard('easy')">😎 Easy</button>
    </div>` : ''}`;
}

function flipCard() {
  state.cardFlipped = !state.cardFlipped;
  renderDeckStudy();
}

function rateCard(rating) {
  if (rating === 'good' || rating === 'easy') addXP(5);
  state.currentCardIndex++;
  state.cardFlipped = false;
  if (state.currentCardIndex >= state.currentDeck.cards.length) {
    const root = document.getElementById('fc-root');
    root.innerHTML = `
      <div class="fc-done-screen">
        <div style="font-size:64px;margin-bottom:16px">🎉</div>
        <div style="font-size:22px;font-weight:900;margin-bottom:8px">Deck Complete!</div>
        <div style="color:var(--text2);margin-bottom:24px">You reviewed all ${state.currentDeck.cards.length} cards</div>
        <button class="btn-primary" onclick="closeDeck()">Back to Decks</button>
      </div>`;
    return;
  }
  renderDeckStudy();
}

function closeDeck() {
  state.currentDeck = null;
  state.currentCardIndex = 0;
  state.cardFlipped = false;
  renderFlashcards();
}

// ===== NOTES =====
function renderNotes() {
  const root = document.getElementById('notes-root');
  if (!root) return;
  const subj = state.notesSubject;
  const tabs = ['chinese', 'math', 'physics', 'chemistry'].map(s =>
    `<button class="nst-btn${s === subj ? ' active' : ''}" data-ns="${s}" onclick="switchNotes('${s}')">${SUBJECTS[s].icon} ${SUBJECTS[s].name}</button>`
  ).join('');

  const notes = NOTES[subj] || [];
  const notesHTML = notes.map(n => `
    <div class="note-card">
      <h2>${n.title}</h2>
      ${n.content}
    </div>`).join('');

  root.innerHTML = `
    <div class="notes-subject-tabs">${tabs}</div>
    <div class="notes-body">${notesHTML || '<p style="color:var(--text2)">No notes yet for this subject.</p>'}</div>`;
}

function switchNotes(subj) {
  state.notesSubject = subj;
  renderNotes();
}

// ===== TESTS =====
function renderTests() {
  const root = document.getElementById('tests-root');
  if (!root) return;
  if (state.currentTest) { renderTestQuestion(); return; }

  const subjects = ['chinese', 'math', 'physics', 'chemistry'];
  root.innerHTML = `
    <div class="tests-menu">
      ${subjects.map(s => `
        <div class="test-menu-card" onclick="startTest('${s}')">
          <div class="tmc-icon">${SUBJECTS[s].icon}</div>
          <div class="tmc-title">${SUBJECTS[s].name}</div>
          <div class="tmc-desc">${TEST_QUESTIONS[s]?.length || 0} questions · ~10 min</div>
        </div>`).join('')}
      <div class="test-menu-card" onclick="startMixedTest()">
        <div class="tmc-icon">🎯</div>
        <div class="tmc-title">Mixed Review</div>
        <div class="tmc-desc">All subjects combined</div>
      </div>
    </div>`;
}

function startTest(subject) {
  const qs = TEST_QUESTIONS[subject] || [];
  state.currentTest = { subject, questions: qs };
  state.currentQuestion = 0;
  state.testAnswers = [];
  state.testStartTime = Date.now();
  if (state.testTimerInterval) clearInterval(state.testTimerInterval);
  renderTestQuestion();
}

function startMixedTest() {
  const all = [];
  Object.entries(TEST_QUESTIONS).forEach(([s, qs]) => {
    qs.forEach(q => all.push({ ...q, subj: s }));
  });
  const shuffled = all.sort(() => Math.random() - 0.5).slice(0, 10);
  state.currentTest = { subject: 'mixed', questions: shuffled };
  state.currentQuestion = 0;
  state.testAnswers = [];
  state.testStartTime = Date.now();
  renderTestQuestion();
}

function renderTestQuestion() {
  const root = document.getElementById('tests-root');
  if (!root || !state.currentTest) return;
  const { questions } = state.currentTest;
  const idx = state.currentQuestion;

  if (idx >= questions.length) { renderTestResult(); return; }

  const q = questions[idx];
  const letters = ['A','B','C','D'];
  root.innerHTML = `
    <div class="test-area">
      <div class="test-topbar">
        <span class="test-topbar-title">Question ${idx + 1} / ${questions.length}</span>
        <button onclick="endTest()" style="background:none;border:none;cursor:pointer;color:var(--text2);font-weight:800">✕ Exit</button>
      </div>
      <div class="test-q-card">
        <div class="test-q-label">Question ${idx + 1}</div>
        <div class="mc-question">${q.q}</div>
        <div class="mc-options" id="test-opts">
          ${q.opts.map((o, i) => `
            <button class="mc-opt" onclick="answerTest(${i})">
              <div class="mc-opt-letter">${letters[i]}</div>
              <span>${o}</span>
            </button>`).join('')}
        </div>
        <div id="test-feedback"></div>
      </div>
    </div>`;
}

function answerTest(idx) {
  const q = state.currentTest.questions[state.currentQuestion];
  const correct = idx === q.ans;
  state.testAnswers.push({ correct, selected: idx });

  document.querySelectorAll('#test-opts .mc-opt').forEach((b, i) => {
    b.disabled = true;
    if (i === q.ans) b.classList.add('correct');
    if (i === idx && !correct) b.classList.add('wrong');
  });

  const fb = document.getElementById('test-feedback');
  if (fb) fb.innerHTML = `
    <div class="feedback-banner ${correct ? 'correct' : 'wrong'}" style="margin-top:16px">
      <div class="fb-icon">${correct ? '✅' : '❌'}</div>
      <div><div class="fb-title">${correct ? 'Correct!' : 'Wrong'}</div><div class="fb-exp">${q.exp}</div></div>
    </div>
    <div style="text-align:center;margin-top:16px">
      <button class="btn-primary" onclick="nextTestQuestion()">${state.currentQuestion + 1 < state.currentTest.questions.length ? 'Next Question →' : 'See Results'}</button>
    </div>`;
}

function nextTestQuestion() {
  state.currentQuestion++;
  renderTestQuestion();
}

function endTest() {
  state.currentTest = null;
  state.currentQuestion = 0;
  renderTests();
}

function renderTestResult() {
  const root = document.getElementById('tests-root');
  if (!root) return;
  const answers = state.testAnswers;
  const correct = answers.filter(a => a.correct).length;
  const total = answers.length;
  const pct = Math.round((correct / total) * 100);
  const grade = pct >= 90 ? 'A+' : pct >= 80 ? 'A' : pct >= 70 ? 'B' : pct >= 60 ? 'C' : 'F';
  const msg = pct >= 80 ? '🏆 Excellent! CSCA ready!' : pct >= 60 ? '📈 Good effort! Review the misses.' : '📚 Keep studying — you got this!';
  const xp = correct * 15;

  state.testsCompleted++;
  addXP(xp);
  saveState();
  state.currentTest = null;

  root.innerHTML = `
    <div class="test-result-screen">
      <div class="tr-big-score">${pct}%</div>
      <div class="tr-grade">${grade}</div>
      <div class="tr-msg">${msg}</div>
      <div class="tr-breakdown">
        <div class="tr-item"><div class="tr-item-n" style="color:var(--green-d)">${correct}</div><div class="tr-item-l">✅ Correct</div></div>
        <div class="tr-item"><div class="tr-item-n" style="color:var(--red)">${total - correct}</div><div class="tr-item-l">❌ Wrong</div></div>
        <div class="tr-item"><div class="tr-item-n" style="color:var(--orange)">+${xp}</div><div class="tr-item-l">⚡ XP</div></div>
      </div>
      <div style="display:flex;gap:12px;justify-content:center;margin-top:24px">
        <button class="btn-secondary" onclick="renderTests()">Try Another</button>
        <button class="btn-primary" onclick="navigateTo('home')">Back Home</button>
      </div>
    </div>`;
}

// ===== REMINDERS =====
function renderReminders() {
  const root = document.getElementById('reminders-root');
  if (!root) return;
  root.innerHTML = `
    <div class="reminders-body">
      <div class="phone-preview">
        <div class="sms-bubble"><div class="sms-t">📚 XueXi4CSCA Reminder: Time to study! You have 3 topics in queue.</div><div class="sms-time">8:00 AM</div></div>
        <div class="sms-bubble today"><div class="sms-t">🔥 Streak alert! You're on a ${state.streak}-day streak. Don't break it!</div><div class="sms-time">Today</div></div>
      </div>
      <div class="reminder-form">
        <h3>📱 Set Daily Study Reminders</h3>
        <div class="form-group">
          <label class="form-label">Phone Number</label>
          <input class="form-ctrl" type="tel" placeholder="+1 (555) 000-0000" id="rem-phone">
        </div>
        <div class="form-group">
          <label class="form-label">Daily Reminder Time</label>
          <input class="form-ctrl" type="time" value="08:00" id="rem-time">
        </div>
        <div class="form-group">
          <label class="form-label">Message Style</label>
          <select class="form-ctrl" id="rem-style">
            <option>Motivational 💪</option>
            <option>Strict 😤</option>
            <option>Friendly 😊</option>
          </select>
        </div>
        <button class="save-btn" onclick="saveReminder()">Save Reminder</button>
        <div class="twilio-info">
          ℹ️ SMS reminders use <strong>Twilio</strong>. Configure your <code>TWILIO_ACCOUNT_SID</code>, <code>TWILIO_AUTH_TOKEN</code>, and <code>TWILIO_FROM_NUMBER</code> environment variables on your server to activate this feature.
        </div>
      </div>
    </div>`;
}

function saveReminder() {
  const phone = document.getElementById('rem-phone')?.value;
  const time = document.getElementById('rem-time')?.value;
  if (!phone || !time) { showToast('Please fill in all fields', 'error'); return; }
  showToast('✅ Reminder saved! (Requires Twilio backend)', 'success');
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  setupNav();
  updateSidebarStats();
  renderHome();

  // Ensure home page is active on load
  const homePage = document.getElementById('page-home');
  if (homePage) homePage.classList.add('active');
  const homeNav = document.querySelector('[data-page="home"]');
  if (homeNav) homeNav.classList.add('active');
});
