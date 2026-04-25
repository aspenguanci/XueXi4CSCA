// ===== CSCA PREP APP — MAIN JS =====

// ===== STATE =====
let state = {
  currentPage: 'dashboard',
  streak: 0,
  xp: 0,
  level: 1,
  xpToNext: 100,
  masteredCards: 0,
  testsCompleted: 0,
  studiedDays: [],
  completedLessons: [],
  flashcardDecks: {},
  currentDeck: null,
  currentCardIndex: 0,
  cardFlipped: false,
  currentTest: null,
  currentQuestion: 0,
  testAnswers: [],
  testStartTime: null,
  testTimerInterval: null,
  vocabTab: 'browse',
  lessonFilter: 'all',
  activeLessonId: null
};

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  loadState();
  checkStreak();
  renderAll();
  setupNav();
  setupMobileMenu();
});

function loadState() {
  const saved = localStorage.getItem('csca_state');
  if (saved) {
    const parsed = JSON.parse(saved);
    Object.assign(state, parsed);
  }
  // Ensure today is marked if it wasn't loaded
}

function saveState() {
  localStorage.setItem('csca_state', JSON.stringify(state));
}

function checkStreak() {
  const today = todayStr();
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yStr = yesterday.toISOString().split('T')[0];

  if (!state.studiedDays.includes(today)) {
    // Check if streak should reset
    if (state.studiedDays.length > 0) {
      const lastDay = state.studiedDays[state.studiedDays.length - 1];
      if (lastDay !== yStr) {
        // Missed a day — reset streak
        state.streak = 0;
      }
    }
  }
}

function markStudiedToday() {
  const today = todayStr();
  if (!state.studiedDays.includes(today)) {
    state.studiedDays.push(today);
    if (!state.streak) state.streak = 0;
    state.streak += 1;
    saveState();
    updateSidebarStats();
    showToast(`🔥 ${state.streak} day streak! Keep going!`, 'xp');
  }
}

function addXP(amount) {
  state.xp += amount;
  state.xpToNext = state.level * 100;
  while (state.xp >= state.xpToNext) {
    state.xp -= state.xpToNext;
    state.level += 1;
    state.xpToNext = state.level * 100;
    showToast(`⚡ Level Up! You're now Level ${state.level}!`, 'xp');
  }
  markStudiedToday();
  saveState();
  updateSidebarStats();
  updateDashboardStats();
}

function todayStr() {
  return new Date().toISOString().split('T')[0];
}

// ===== SETUP =====
function setupNav() {
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const page = link.dataset.page;
      navigateTo(page);
      if (window.innerWidth < 900) closeMobileMenu();
    });
  });
}

function setupMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const overlay = document.getElementById('overlay');
  hamburger.addEventListener('click', () => {
    document.getElementById('sidebar').classList.toggle('open');
    overlay.classList.toggle('active');
  });
  overlay.addEventListener('click', closeMobileMenu);
}

function closeMobileMenu() {
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('overlay').classList.remove('active');
}

function navigateTo(page) {
  state.currentPage = page;
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
  document.getElementById(`page-${page}`).classList.add('active');
  document.querySelector(`[data-page="${page}"]`).classList.add('active');

  if (page === 'lessons') renderLessons();
  if (page === 'flashcards') renderFlashcards();
  if (page === 'vocab') renderVocab();
  if (page === 'practice') renderPractice();
  if (page === 'notes') renderNotes();
  if (page === 'reminders') renderReminders();
}

// ===== RENDER ALL =====
function renderAll() {
  updateSidebarStats();
  renderDashboard();
}

function updateSidebarStats() {
  const pct = Math.round((state.xp / (state.level * 100)) * 100);
  document.getElementById('streak-count').textContent = state.streak;
  document.getElementById('sidebar-xp').textContent = state.xp + ' XP';
  document.getElementById('sidebar-level').textContent = 'Level ' + state.level;
  document.getElementById('xp-bar-fill').style.width = pct + '%';
  document.getElementById('xp-label-bottom').textContent = `${state.xp} / ${state.level * 100} XP to next level`;
}

// ===== DASHBOARD =====
function renderDashboard() {
  // Daily motivation (changes each day)
  const dayOfYear = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / 86400000);
  const motiv = DAILY_MOTIVATIONS[dayOfYear % DAILY_MOTIVATIONS.length];
  document.getElementById('motivation-text').textContent = motiv;

  updateDashboardStats();
  renderTopicCards();
  renderCalendar();
  renderProgressSection();
}

function updateDashboardStats() {
  document.getElementById('stat-streak').textContent = state.streak;
  document.getElementById('stat-xp').textContent = state.xp;
  document.getElementById('stat-cards').textContent = state.masteredCards;
  document.getElementById('stat-tests').textContent = state.testsCompleted;
}

function renderTopicCards() {
  const container = document.getElementById('topic-cards');
  const colors = ['#F472B6','#60A5FA','#4ADE80','#FACC15','#A78BFA','#FB923C'];
  const topTopics = CSCA_TOPICS.slice(0, 6);

  container.innerHTML = topTopics.map((t, i) => {
    const lessons = LESSONS.filter(l => l.category === t.id);
    const done = lessons.filter(l => state.completedLessons.includes(l.id)).length;
    const pct = lessons.length ? Math.round((done / lessons.length) * 100) : 0;
    return `
      <div class="topic-card" onclick="navigateToTopic('${t.id}')" style="--tc-color:${t.color}">
        <div style="position:absolute;top:0;left:0;right:0;height:4px;background:${t.color}"></div>
        <div class="tc-icon">${t.icon}</div>
        <div class="tc-title">${t.name}</div>
        <div class="tc-desc">${t.desc}</div>
        <span class="tc-badge" style="background:${t.color}22;color:${t.color}">${pct}% complete</span>
      </div>
    `;
  }).join('');
}

function navigateToTopic(topicId) {
  state.lessonFilter = topicId;
  navigateTo('lessons');
}

function renderCalendar() {
  const container = document.getElementById('calendar-strip');
  const today = new Date();
  const days = [];
  for (let i = 13; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    days.push(d);
  }

  const dayNames = ['Su','Mo','Tu','We','Th','Fr','Sa'];
  container.innerHTML = days.map(d => {
    const dStr = d.toISOString().split('T')[0];
    const isToday = dStr === todayStr();
    const isDone = state.studiedDays.includes(dStr);
    return `
      <div class="cal-day ${isToday ? 'today' : ''} ${isDone ? 'done' : ''}">
        <span style="font-size:10px;color:var(--text3)">${dayNames[d.getDay()]}</span>
        <span class="cal-num">${d.getDate()}</span>
        <span class="cal-check">${isDone ? '✅' : isToday ? '📚' : '○'}</span>
      </div>
    `;
  }).join('');
}

function renderProgressSection() {
  const container = document.getElementById('progress-section');
  const progressColors = ['#F472B6','#60A5FA','#4ADE80','#FACC15','#A78BFA','#FB923C'];
  container.innerHTML = CSCA_TOPICS.map((t, i) => {
    const lessons = LESSONS.filter(l => l.category === t.id);
    const done = lessons.filter(l => state.completedLessons.includes(l.id)).length;
    const pct = lessons.length ? Math.round((done / lessons.length) * 100) : 0;
    return `
      <div class="prog-item">
        <div class="prog-header">
          <span class="prog-name">${t.icon} ${t.name}</span>
          <span class="prog-pct">${pct}%</span>
        </div>
        <div class="prog-bar-wrap">
          <div class="prog-bar" style="width:${pct}%;background:${progressColors[i]}"></div>
        </div>
      </div>
    `;
  }).join('');
}

// ===== LESSONS =====
function renderLessons() {
  renderLessonFilter();
  renderLessonsGrid();
  document.getElementById('lesson-viewer').style.display = 'none';
  document.getElementById('lessons-grid').style.display = 'grid';
  document.getElementById('lesson-filter').style.display = 'flex';
}

function renderLessonFilter() {
  const container = document.getElementById('lesson-filter');
  const cats = [{ id: 'all', name: 'All Topics' }, ...CSCA_TOPICS];
  container.innerHTML = cats.map(c =>
    `<button class="filter-btn ${state.lessonFilter === c.id ? 'active' : ''}" onclick="filterLessons('${c.id}')">${c.id !== 'all' ? CSCA_TOPICS.find(t=>t.id===c.id)?.icon || '' : '📚'} ${c.name}</button>`
  ).join('');
}

function filterLessons(cat) {
  state.lessonFilter = cat;
  renderLessonFilter();
  renderLessonsGrid();
}

function renderLessonsGrid() {
  const container = document.getElementById('lessons-grid');
  const filtered = state.lessonFilter === 'all' ? LESSONS : LESSONS.filter(l => l.category === state.lessonFilter);
  container.innerHTML = filtered.map(lesson => {
    const isDone = state.completedLessons.includes(lesson.id);
    const cat = CSCA_TOPICS.find(t => t.id === lesson.category);
    return `
      <div class="lesson-card" onclick="openLesson('${lesson.id}')">
        <div class="lc-category">${cat ? cat.icon + ' ' + lesson.categoryName : lesson.categoryName}</div>
        <div class="lc-title">${lesson.title}</div>
        <div class="lc-desc">${lesson.desc}</div>
        <div class="lc-footer">
          <span class="lc-dur">⏱ ${lesson.duration}</span>
          <span style="font-size:12px;color:var(--pink-d)">+${lesson.xp} XP</span>
          ${isDone ? '<span class="lc-done">✅ Completed</span>' : '<span class="lc-lock">Start →</span>'}
        </div>
      </div>
    `;
  }).join('');
}

function openLesson(id) {
  const lesson = LESSONS.find(l => l.id === id);
  if (!lesson) return;
  state.activeLessonId = id;

  document.getElementById('lessons-grid').style.display = 'none';
  document.getElementById('lesson-filter').style.display = 'none';
  const viewer = document.getElementById('lesson-viewer');
  viewer.style.display = 'block';

  const isDone = state.completedLessons.includes(id);
  viewer.innerHTML = `
    <div class="lv-back" onclick="renderLessons()">← Back to Lessons</div>
    <div class="lv-title">${lesson.title}</div>
    <div class="lv-meta">${lesson.categoryName} · ⏱ ${lesson.duration} · ⚡ +${lesson.xp} XP</div>
    <div class="lv-body">${lesson.content}</div>
    ${isDone
      ? '<div style="margin-top:24px;font-size:15px;color:var(--green-d);font-weight:700">✅ You\'ve completed this lesson!</div>'
      : `<button class="lv-complete-btn" onclick="completeLesson('${id}')">✅ Mark as Complete (+${lesson.xp} XP)</button>`
    }
  `;
}

function completeLesson(id) {
  const lesson = LESSONS.find(l => l.id === id);
  if (!lesson || state.completedLessons.includes(id)) return;
  state.completedLessons.push(id);
  addXP(lesson.xp);
  showToast(`🎉 Lesson completed! +${lesson.xp} XP`, 'success');
  openLesson(id); // re-render
}

// ===== FLASHCARDS =====
function renderFlashcards() {
  const controls = document.getElementById('flashcard-controls');
  controls.innerHTML = `
    <select class="fc-deck-select" id="deck-select" onchange="selectDeck(this.value)">
      ${FLASHCARD_DECKS.map(d => `<option value="${d.id}">${d.name} (${d.cards.length} cards)</option>`).join('')}
    </select>
    <button class="fc-btn primary" onclick="startDeck()">🃏 Start Study Session</button>
    <button class="fc-btn" onclick="shuffleDeck()">🔀 Shuffle</button>
  `;

  if (!state.currentDeck) {
    state.currentDeck = FLASHCARD_DECKS[0].id;
  }
  document.getElementById('deck-select').value = state.currentDeck;

  const arena = document.getElementById('flashcard-arena');
  arena.innerHTML = `
    <div style="text-align:center;padding:48px;color:var(--text2)">
      <div style="font-size:48px;margin-bottom:16px">🃏</div>
      <div style="font-size:16px;font-weight:600;margin-bottom:8px">Select a deck and start studying!</div>
      <div style="font-size:13px">Spaced repetition helps you remember 3x longer.</div>
    </div>
  `;
}

function selectDeck(deckId) {
  state.currentDeck = deckId;
}

function shuffleDeck() {
  const deck = FLASHCARD_DECKS.find(d => d.id === state.currentDeck);
  if (deck) {
    deck.cards.sort(() => Math.random() - 0.5);
    showToast('🔀 Deck shuffled!', 'success');
  }
}

function startDeck() {
  const deck = FLASHCARD_DECKS.find(d => d.id === state.currentDeck);
  if (!deck) return;
  state.currentCardIndex = 0;
  state.cardFlipped = false;
  renderCard(deck);
}

function renderCard(deck) {
  const arena = document.getElementById('flashcard-arena');
  const total = deck.cards.length;
  const idx = state.currentCardIndex;

  if (idx >= total) {
    // Done!
    arena.innerHTML = `
      <div class="fc-done-screen">
        <div class="fc-done-emoji">🎉</div>
        <div class="fc-done-title">Deck Complete!</div>
        <div class="fc-done-sub">You've studied all ${total} cards in this deck.</div>
        <button class="fc-btn primary" onclick="startDeck()" style="margin:0 8px">🔄 Restart</button>
        <button class="fc-btn" onclick="shuffleDeck();startDeck()" style="margin:0 8px">🔀 Shuffle & Restart</button>
      </div>
    `;
    addXP(10 * total);
    state.masteredCards += Math.floor(total * 0.7);
    saveState();
    return;
  }

  const card = deck.cards[idx];
  const pct = Math.round((idx / total) * 100);

  arena.innerHTML = `
    <div class="fc-progress-row">
      <div class="fc-progress-bar-wrap"><div class="fc-progress-bar-fill" style="width:${pct}%"></div></div>
      <span class="fc-progress-text">${idx + 1} / ${total}</span>
    </div>

    <div class="flashcard" id="flashcard" onclick="flipCard()">
      <div class="fc-inner" id="fc-inner">
        <div class="fc-face fc-front">
          <span class="fc-category-tag">${deck.name}</span>
          <div class="fc-question">${card.q}</div>
          <div class="fc-tap-hint">tap to reveal →</div>
        </div>
        <div class="fc-face fc-back">
          <span class="fc-category-tag">${deck.name}</span>
          <div class="fc-answer">${card.a.replace(/\n/g, '<br>')}</div>
        </div>
      </div>
    </div>

    <div class="fc-rating-row" id="fc-rating" style="display:none">
      <button class="fc-rate-btn again" onclick="rateCard('again')">😣 Again</button>
      <button class="fc-rate-btn hard"  onclick="rateCard('hard')">😰 Hard</button>
      <button class="fc-rate-btn good"  onclick="rateCard('good')">😊 Good</button>
      <button class="fc-rate-btn easy"  onclick="rateCard('easy')">😎 Easy</button>
    </div>
  `;
  state.cardFlipped = false;
}

function flipCard() {
  const inner = document.getElementById('fc-inner');
  if (!inner) return;
  state.cardFlipped = !state.cardFlipped;
  inner.classList.toggle('flipped', state.cardFlipped);
  document.getElementById('fc-rating').style.display = state.cardFlipped ? 'flex' : 'none';
}

function rateCard(rating) {
  const xpMap = { again: 2, hard: 5, good: 8, easy: 12 };
  addXP(xpMap[rating]);
  if (rating === 'easy' || rating === 'good') state.masteredCards += 1;
  state.currentCardIndex += 1;
  state.cardFlipped = false;
  const deck = FLASHCARD_DECKS.find(d => d.id === state.currentDeck);
  if (deck) renderCard(deck);
  saveState();
}

// ===== VOCAB =====
function renderVocab() {
  const tabs = document.querySelectorAll('.vtab');
  tabs.forEach(t => {
    t.addEventListener('click', () => {
      tabs.forEach(x => x.classList.remove('active'));
      t.classList.add('active');
      state.vocabTab = t.dataset.vtab;
      renderVocabContent();
    });
    if (t.dataset.vtab === state.vocabTab) t.classList.add('active');
    else t.classList.remove('active');
  });
  renderVocabContent();
}

function renderVocabContent() {
  const container = document.getElementById('vocab-content');
  if (state.vocabTab === 'browse') renderVocabBrowse(container);
  else if (state.vocabTab === 'flashcards') renderVocabFlashcards(container);
  else if (state.vocabTab === 'quiz') renderVocabQuiz(container);
  else if (state.vocabTab === 'notes') renderVocabNotes(container);
}

function renderVocabBrowse(container) {
  const categories = [...new Set(CHINESE_VOCAB.map(v => v.category))];
  const toneMap = { '1': 'tone-1', '2': 'tone-2', '3': 'tone-3', '4': 'tone-4', 'n': 'tone-n' };

  container.innerHTML = `
    <input type="text" class="vocab-search" placeholder="🔍 Search characters, pinyin, or English..." id="vocab-search-input" oninput="filterVocab()" />
    <div id="vocab-grid-container">
      ${categories.map(cat => {
        const words = CHINESE_VOCAB.filter(v => v.category === cat);
        return `
          <div class="vocab-category-header">${cat}</div>
          <div class="vocab-grid">
            ${words.map(v => {
              const t1 = (v.tone.split(',')[0] || 'n').trim();
              return `
                <div class="vocab-card" onclick="showVocabDetail('${v.char}')">
                  <div class="vc-char">${v.char}</div>
                  <div class="vc-pin">${v.pin}</div>
                  <div class="vc-eng">${v.eng}</div>
                  <span class="vc-tone ${toneMap[t1] || 'tone-n'}">Tone ${t1 === 'n' ? 'neutral' : t1}</span>
                </div>
              `;
            }).join('')}
          </div>
        `;
      }).join('')}
    </div>
  `;
}

function filterVocab() {
  const q = document.getElementById('vocab-search-input').value.toLowerCase();
  document.querySelectorAll('.vocab-card').forEach(card => {
    const text = card.textContent.toLowerCase();
    card.style.display = text.includes(q) ? '' : 'none';
  });
  document.querySelectorAll('.vocab-category-header, .vocab-grid').forEach(el => {
    if (el.classList.contains('vocab-grid')) {
      const visible = el.querySelectorAll('.vocab-card:not([style*="none"])').length;
      el.style.display = visible ? '' : 'none';
      const prev = el.previousElementSibling;
      if (prev && prev.classList.contains('vocab-category-header')) {
        prev.style.display = visible ? '' : 'none';
      }
    }
  });
}

function showVocabDetail(char) {
  const word = CHINESE_VOCAB.find(v => v.char === char);
  if (!word) return;
  showToast(`${word.char} — ${word.pin} — ${word.eng}`, 'success');
}

function renderVocabFlashcards(container) {
  // Use vocab as flashcard deck
  const vocabDeck = { id: 'vocab-all', name: 'Chinese Vocabulary', cards: CHINESE_VOCAB.map(v => ({
    q: `What is the meaning of: ${v.char}`,
    a: `Pinyin: ${v.pin}\nEnglish: ${v.eng}\nCategory: ${v.category}`
  }))};
  state.currentDeck = 'vocab-all';
  FLASHCARD_DECKS.push(vocabDeck);
  state.currentCardIndex = 0;
  container.innerHTML = `<div style="margin-bottom:16px;font-size:14px;color:var(--text2)">Flashcard mode for all ${CHINESE_VOCAB.length} vocabulary words.</div>`;
  const fcDiv = document.createElement('div');
  fcDiv.id = 'vocab-fc-arena';
  container.appendChild(fcDiv);
  // Temporarily redirect flashcard render
  const origArena = document.getElementById('flashcard-arena');
  const tempId = 'vocab-fc-arena';
  // Inline card render for vocab
  renderVocabCard(vocabDeck, 0, container);
}

function renderVocabCard(deck, idx, container) {
  if (idx >= deck.cards.length) {
    container.innerHTML = `<div class="fc-done-screen"><div class="fc-done-emoji">🌟</div><div class="fc-done-title">All vocab reviewed!</div><button class="fc-btn primary" onclick="renderVocab()">Start Over</button></div>`;
    addXP(50);
    return;
  }
  const card = deck.cards[idx];
  const word = CHINESE_VOCAB[idx];
  let flipped = false;

  container.innerHTML = `
    <div style="text-align:center;margin-bottom:12px;font-size:13px;color:var(--text2)">${idx+1} / ${deck.cards.length}</div>
    <div class="flashcard" id="vfc" onclick="flipVocabCard('${idx}')">
      <div class="fc-inner" id="vfc-inner">
        <div class="fc-face fc-front">
          <div class="fc-zh">${word.char}</div>
          <div class="fc-tap-hint">tap to see meaning →</div>
        </div>
        <div class="fc-face fc-back">
          <div class="fc-zh">${word.char}</div>
          <div class="fc-pin">${word.pin}</div>
          <div class="fc-answer">${word.eng}</div>
        </div>
      </div>
    </div>
    <div class="fc-rating-row" id="vfc-rating" style="display:none">
      <button class="fc-rate-btn again" onclick="nextVocabCard(${idx}, 'again', '${deck.id}')">Again</button>
      <button class="fc-rate-btn good"  onclick="nextVocabCard(${idx}, 'good', '${deck.id}')">Got it!</button>
      <button class="fc-rate-btn easy"  onclick="nextVocabCard(${idx}, 'easy', '${deck.id}')">Easy!</button>
    </div>
  `;
}

let vocabFlipped = false;
function flipVocabCard() {
  vocabFlipped = !vocabFlipped;
  const inner = document.getElementById('vfc-inner');
  if (inner) inner.classList.toggle('flipped', vocabFlipped);
  const rating = document.getElementById('vfc-rating');
  if (rating) rating.style.display = vocabFlipped ? 'flex' : 'none';
}

function nextVocabCard(idx, rating, deckId) {
  addXP(rating === 'easy' ? 8 : rating === 'good' ? 5 : 2);
  vocabFlipped = false;
  const deck = FLASHCARD_DECKS.find(d => d.id === deckId);
  if (deck) renderVocabCard(deck, idx + 1, document.getElementById('vocab-content'));
}

function renderVocabQuiz(container) {
  const words = CHINESE_VOCAB.sort(() => Math.random() - 0.5).slice(0, 10);
  let qIdx = 0;
  let score = 0;

  function renderQ() {
    if (qIdx >= words.length) {
      container.innerHTML = `
        <div class="test-results">
          <div class="tr-score">${score}/${words.length}</div>
          <div class="tr-label">Vocab Quiz Complete! ${score === words.length ? '🌟 Perfect!' : score >= 7 ? '👏 Great job!' : '📚 Keep studying!'}</div>
          <button class="test-btn primary" onclick="renderVocab();document.querySelector('.vtab[data-vtab=quiz]').click()">🔄 New Quiz</button>
        </div>
      `;
      addXP(score * 5);
      return;
    }
    const word = words[qIdx];
    // Make 4 options
    const others = CHINESE_VOCAB.filter(v => v.char !== word.char).sort(() => Math.random() - 0.5).slice(0, 3);
    const options = [word, ...others].sort(() => Math.random() - 0.5);
    const correctIdx = options.findIndex(o => o.char === word.char);

    container.innerHTML = `
      <div style="font-size:13px;color:var(--text2);margin-bottom:16px">Question ${qIdx+1} of ${words.length}</div>
      <div class="question-card">
        <div class="q-text">What does this character mean?</div>
        <div class="fc-zh" style="text-align:center;font-size:48px;margin:20px 0">${word.char}</div>
        <div class="q-pin" style="text-align:center">${word.pin}</div>
        <div class="options" style="margin-top:20px">
          ${options.map((o, i) => `<button class="option-btn" onclick="ansVocab(${i}, ${correctIdx})">${o.eng}</button>`).join('')}
        </div>
      </div>
    `;

    window.ansVocab = (chosen, correct) => {
      document.querySelectorAll('.option-btn').forEach((btn, i) => {
        btn.disabled = true;
        if (i === correct) btn.classList.add('correct');
        if (i === chosen && chosen !== correct) btn.classList.add('wrong');
      });
      if (chosen === correct) score++;
      setTimeout(() => { qIdx++; renderQ(); }, 1200);
    };
  }

  renderQ();
}

function renderVocabNotes(container) {
  const tones = [
    { n: 1, sym: 'ā', desc: 'High flat tone', eg: '妈 (mā) — mom', color: '#3B82F6' },
    { n: 2, sym: 'á', desc: 'Rising tone', eg: '麻 (má) — hemp/numb', color: '#22C55E' },
    { n: 3, sym: 'ǎ', desc: 'Dipping tone (down-up)', eg: '马 (mǎ) — horse', color: '#EAB308' },
    { n: 4, sym: 'à', desc: 'Falling tone', eg: '骂 (mà) — scold', color: '#EF4444' },
    { n: 'n', sym: 'a', desc: 'Neutral tone (unstressed)', eg: '吗 (ma) — question particle', color: '#A855F7' }
  ];

  container.innerHTML = `
    <div class="vocab-notes-section">
      <h2>📊 Chinese Tones — Complete Guide</h2>
      <p>Mandarin Chinese has 4 main tones plus a neutral tone. Getting tones wrong can completely change meaning — 妈麻马骂 all sound like "ma" but mean completely different things!</p>
      <table>
        <tr><th>Tone</th><th>Symbol</th><th>Description</th><th>Example</th></tr>
        ${tones.map(t => `<tr><td style="font-weight:700;color:${t.color}">Tone ${t.n}</td><td style="font-size:20px;font-family:'Noto Serif SC',serif">${t.sym}</td><td>${t.desc}</td><td style="font-family:'Noto Serif SC',serif">${t.eg}</td></tr>`).join('')}
      </table>

      <h2 style="margin-top:28px">🔑 Radical Reference Chart</h2>
      <p>Learn these 20 radicals and you can guess the meaning category of hundreds of unknown characters.</p>
      <table>
        <tr><th>Radical</th><th>Pinyin</th><th>Meaning</th><th>Example Characters</th></tr>
        <tr><td>氵</td><td>shuǐ</td><td>water</td><td>海、河、洗、游、流</td></tr>
        <tr><td>忄</td><td>xīn</td><td>heart/emotion</td><td>想、怕、爱、恨、忙</td></tr>
        <tr><td>口</td><td>kǒu</td><td>mouth/speech</td><td>吃、喝、说、叫、唱</td></tr>
        <tr><td>手/扌</td><td>shǒu</td><td>hand/action</td><td>拿、打、推、抱、握</td></tr>
        <tr><td>艹</td><td>cǎo</td><td>grass/plant</td><td>花、草、茶、菜、药</td></tr>
        <tr><td>木</td><td>mù</td><td>wood/tree</td><td>树、桌、椅、林、森</td></tr>
        <tr><td>火/灬</td><td>huǒ</td><td>fire/heat</td><td>热、烧、炒、炸、烤</td></tr>
        <tr><td>金/钅</td><td>jīn</td><td>metal</td><td>钱、银、铁、锅、钟</td></tr>
        <tr><td>足/⻊</td><td>zú</td><td>foot/movement</td><td>走、跑、跳、踢、踏</td></tr>
        <tr><td>讠</td><td>yán</td><td>speech/language</td><td>说、话、语、请、谢</td></tr>
      </table>

      <h2 style="margin-top:28px">📝 Measure Words (量词) Reference</h2>
      <p>One of the most common CSCA grammar traps. Know which measure word goes with which noun.</p>
      <table>
        <tr><th>Measure Word</th><th>Pinyin</th><th>Used For</th><th>Example</th></tr>
        <tr><td>本</td><td>běn</td><td>books, notebooks</td><td>一本书、三本杂志</td></tr>
        <tr><td>张</td><td>zhāng</td><td>flat things (paper, tables, faces)</td><td>一张纸、两张桌子</td></tr>
        <tr><td>条</td><td>tiáo</td><td>long flexible things (fish, rivers, trousers)</td><td>一条鱼、一条裤子</td></tr>
        <tr><td>只</td><td>zhī</td><td>animals, small objects</td><td>一只猫、两只手</td></tr>
        <tr><td>把</td><td>bǎ</td><td>things with handles</td><td>一把刀、一把椅子</td></tr>
        <tr><td>件</td><td>jiàn</td><td>clothing items, matters</td><td>一件衬衫、一件事</td></tr>
        <tr><td>位</td><td>wèi</td><td>people (polite/formal)</td><td>一位老师、三位客人</td></tr>
        <tr><td>双</td><td>shuāng</td><td>pairs</td><td>一双鞋、两双筷子</td></tr>
      </table>
    </div>
  `;
}

// ===== PRACTICE TESTS =====
function renderPractice() {
  const hub = document.getElementById('practice-hub');
  hub.innerHTML = `
    <div class="practice-menu">
      <div class="pm-card" onclick="startTest('grammar')">
        <div class="pm-icon">✏️</div>
        <div class="pm-title">Grammar Test</div>
        <div class="pm-desc">10 questions · 把/被, complements, particles</div>
      </div>
      <div class="pm-card" onclick="startTest('vocab')">
        <div class="pm-icon">🔤</div>
        <div class="pm-title">Vocabulary Test</div>
        <div class="pm-desc">10 questions · Word usage & confusing pairs</div>
      </div>
      <div class="pm-card" onclick="startTest('reading')">
        <div class="pm-icon">📖</div>
        <div class="pm-title">Reading Comprehension</div>
        <div class="pm-desc">2 passages with questions</div>
      </div>
      <div class="pm-card" onclick="startTest('mixed')">
        <div class="pm-icon">🎯</div>
        <div class="pm-title">Full Mock Test</div>
        <div class="pm-desc">All sections · Timed · Exam simulation</div>
      </div>
      <div class="pm-card" onclick="startAITest()">
        <div class="pm-icon">🤖</div>
        <div class="pm-title">AI-Generated Test</div>
        <div class="pm-desc">Fresh questions every time · Claude-powered</div>
      </div>
      <div class="pm-card" onclick="startTest('listening')">
        <div class="pm-icon">🎧</div>
        <div class="pm-title">Listening Simulation</div>
        <div class="pm-desc">Transcript-based listening practice</div>
      </div>
    </div>
    <div id="test-area"></div>
  `;
}

function startTest(type) {
  let questions = [];
  if (type === 'grammar') questions = PRACTICE_QUESTIONS.grammar;
  else if (type === 'vocab') questions = PRACTICE_QUESTIONS.vocab;
  else if (type === 'reading') questions = PRACTICE_QUESTIONS.reading;
  else if (type === 'listening') questions = PRACTICE_QUESTIONS.listening;
  else if (type === 'mixed') {
    questions = [...PRACTICE_QUESTIONS.grammar, ...PRACTICE_QUESTIONS.vocab, ...PRACTICE_QUESTIONS.reading].sort(() => Math.random() - 0.5).slice(0, 10);
  }

  if (!questions.length) {
    showToast('No questions available for this type yet!', 'error');
    return;
  }

  state.currentTest = { type, questions };
  state.currentQuestion = 0;
  state.testAnswers = [];
  state.testStartTime = Date.now();

  if (state.testTimerInterval) clearInterval(state.testTimerInterval);

  renderTestQuestion();
}

function renderTestQuestion() {
  const { questions } = state.currentTest;
  const qIdx = state.currentQuestion;
  const area = document.getElementById('test-area');

  if (qIdx >= questions.length) {
    renderTestResults();
    return;
  }

  const q = questions[qIdx];
  const elapsed = Math.floor((Date.now() - state.testStartTime) / 1000);
  const mins = Math.floor(elapsed / 60).toString().padStart(2, '0');
  const secs = (elapsed % 60).toString().padStart(2, '0');

  let qHtml = '';
  if (q.type === 'reading') {
    qHtml = `<div class="callout" style="margin-bottom:16px;font-size:14px;line-height:1.75;color:var(--text2)"><strong>📖 Passage:</strong><br>${q.passage}</div>`;
  }
  if (q.type === 'listening_sim') {
    qHtml = `<div class="example" style="margin-bottom:16px;font-size:13px;line-height:1.75;color:var(--text2)"><strong>🎧 Audio Transcript (Simulation):</strong><br>${q.transcript}</div>`;
  }

  const answered = state.testAnswers[qIdx];

  area.innerHTML = `
    <div class="test-container">
      <div class="test-header-bar">
        <span class="test-title-bar">${state.currentTest.type.toUpperCase()} TEST</span>
        <span class="test-qnum">Question ${qIdx + 1} / ${questions.length}</span>
        <span class="test-timer" id="test-timer">${mins}:${secs}</span>
      </div>
      <div class="question-card">
        <div class="q-num">Question ${qIdx + 1}</div>
        ${qHtml}
        <div class="q-text">${q.question}</div>
        <div class="options">
          ${q.options.map((opt, i) => {
            let cls = '';
            if (answered !== undefined) {
              if (i === q.correct) cls = 'correct';
              else if (i === answered && i !== q.correct) cls = 'wrong';
            }
            return `<button class="option-btn ${cls}" onclick="answerQuestion(${i})" ${answered !== undefined ? 'disabled' : ''}>
              <span class="option-letter">${String.fromCharCode(65+i)}</span>
              ${opt}
            </button>`;
          }).join('')}
        </div>
        <div class="q-explanation ${answered !== undefined ? 'show' : ''}" id="q-exp">
          💡 <strong>Explanation:</strong> ${q.explanation}
        </div>
      </div>
      <div class="test-nav">
        <button class="test-btn secondary" onclick="navigateTo('practice')">← Exit</button>
        ${answered !== undefined ? `<button class="test-btn primary" onclick="nextQuestion()">Next →</button>` : ''}
      </div>
    </div>
  `;

  // Timer tick
  if (state.testTimerInterval) clearInterval(state.testTimerInterval);
  state.testTimerInterval = setInterval(() => {
    const el = document.getElementById('test-timer');
    if (el) {
      const e = Math.floor((Date.now() - state.testStartTime) / 1000);
      el.textContent = `${Math.floor(e/60).toString().padStart(2,'0')}:${(e%60).toString().padStart(2,'0')}`;
    }
  }, 1000);
}

function answerQuestion(chosen) {
  state.testAnswers[state.currentQuestion] = chosen;
  renderTestQuestion();
}

function nextQuestion() {
  state.currentQuestion += 1;
  renderTestQuestion();
}

function renderTestResults() {
  if (state.testTimerInterval) clearInterval(state.testTimerInterval);
  const { questions } = state.currentTest;
  let correct = 0;
  state.testAnswers.forEach((a, i) => { if (a === questions[i].correct) correct++; });
  const total = questions.length;
  const pct = Math.round((correct / total) * 100);
  const elapsed = Math.floor((Date.now() - state.testStartTime) / 1000);

  state.testsCompleted += 1;
  addXP(correct * 10 + 20);
  saveState();

  const area = document.getElementById('test-area');
  area.innerHTML = `
    <div class="test-container">
      <div class="test-results">
        <div class="tr-score">${pct}%</div>
        <div class="tr-label">${pct >= 90 ? '🏆 Outstanding! CSCA-ready!' : pct >= 75 ? '💪 Good — keep pushing!' : '📚 Keep studying — you\'ll get there!'}</div>
        <div class="tr-breakdown">
          <div class="tr-item"><div class="tr-item-num" style="color:var(--green-d)">${correct}</div><div class="tr-item-label">Correct ✅</div></div>
          <div class="tr-item"><div class="tr-item-num" style="color:var(--red)">${total - correct}</div><div class="tr-item-label">Wrong ❌</div></div>
          <div class="tr-item"><div class="tr-item-num">${Math.floor(elapsed/60)}:${(elapsed%60).toString().padStart(2,'0')}</div><div class="tr-item-label">Time ⏱</div></div>
        </div>
        <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap">
          <button class="test-btn primary" onclick="startTest('${state.currentTest.type}')">🔄 Retry</button>
          <button class="test-btn secondary" onclick="navigateTo('practice')">← Back to Tests</button>
        </div>
      </div>
    </div>
  `;
}

// ===== AI TEST =====
function startAITest() {
  const area = document.getElementById('test-area');
  area.innerHTML = `
    <div class="test-container">
      <div class="test-header-bar"><span class="test-title-bar">🤖 AI-GENERATED TEST</span></div>
      <div class="ai-generating">
        <div class="ai-dots"><span></span><span></span><span></span></div>
        <span>Claude is generating a custom CSCA test for you...</span>
      </div>
    </div>
  `;

  const prompt = `You are a CSCA (Chinese Subject Competency Assessment) exam expert. Generate a 5-question multiple choice practice test.

Each question should test ONE of: grammar (把/被/complements), vocabulary (usage in context), reading comprehension, or cultural knowledge.

Return ONLY valid JSON, no markdown, no explanation:
{
  "questions": [
    {
      "question": "Question text here",
      "options": ["A option", "B option", "C option", "D option"],
      "correct": 0,
      "explanation": "Why this is correct",
      "type": "grammar"
    }
  ]
}

Make questions challenging but fair — appropriate for students aiming for 90%+. Include at least one reading passage question. All Chinese characters must be simplified. Questions should be similar to real CSCA format.`;

  fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      messages: [{ role: "user", content: prompt }]
    })
  })
  .then(r => r.json())
  .then(data => {
    const text = data.content.map(c => c.text || '').join('');
    const clean = text.replace(/```json|```/g, '').trim();
    const parsed = JSON.parse(clean);
    state.currentTest = { type: 'AI-Generated', questions: parsed.questions };
    state.currentQuestion = 0;
    state.testAnswers = [];
    state.testStartTime = Date.now();
    renderTestQuestion();
  })
  .catch(err => {
    console.error(err);
    area.innerHTML = `
      <div class="test-container">
        <div style="padding:24px;color:var(--text2);text-align:center">
          <div style="font-size:32px;margin-bottom:12px">⚠️</div>
          <div style="font-size:15px;font-weight:600;margin-bottom:8px">Couldn't generate AI test</div>
          <div style="font-size:13px;margin-bottom:20px">Using a pre-built test instead.</div>
          <button class="test-btn primary" onclick="startTest('mixed')">Start Mixed Test</button>
        </div>
      </div>
    `;
  });
}

// ===== NOTES =====
function renderNotes() {
  const container = document.getElementById('notes-container');
  container.innerHTML = `
    <div class="notes-toc">
      <h2>📚 Table of Contents</h2>
      <ul class="toc-list">
        ${STUDY_NOTES_DATA.map(n => `<li><a href="#note-${n.id}" class="toc-link"><span>${n.icon} ${n.title}</span><span>→</span></a></li>`).join('')}
        <li><a href="#" class="toc-link" onclick="renderFullNotes()"><span>📝 All Grammar Notes</span><span>→</span></a></li>
        <li><a href="#" class="toc-link" onclick="renderLessons();navigateTo('lessons')"><span>📚 Go to Lessons</span><span>→</span></a></li>
      </ul>
    </div>
    ${renderDetailedNotes()}
  `;
}

function renderDetailedNotes() {
  return `
    <div class="note-section" id="note-grammar-overview">
      <h2>✏️ Grammar Overview</h2>
      <h3>The 把 (bǎ) Construction</h3>
      <p>The 把 sentence is a disposal construction — it moves a definite object before the verb to show what happens TO it.</p>
      <div class="formula">Subject + 把 + [Definite Object] + Verb + Complement</div>
      <div class="highlight">⚠️ The verb can NEVER stand alone after 把. It must have: 了, a result complement, direction, or degree complement.</div>
      <h3>CANNOT use 把 when:</h3>
      <ul>
        <li>Object is indefinite (一本书 → use definite 这本书)</li>
        <li>Verb is stative: 是, 有, 喜欢, 知道, 认识, 感觉, 希望</li>
        <li>Negative with 不 (use 没有 instead)</li>
        <li>Simple existence or location sentences</li>
      </ul>

      <h3>The 被 (bèi) Passive</h3>
      <p>Subject receives the action. Same complement rule applies — verb cannot stand alone.</p>
      <div class="formula">Subject (receiver) + 被 + [Agent] + Verb + Complement</div>
      <ul>
        <li>Agent can be omitted: 书被偷了 (book was stolen)</li>
        <li>Traditional: implies negative/undesirable outcome</li>
        <li>Modern: increasingly neutral usage</li>
      </ul>
    </div>

    <div class="note-section" id="note-complements">
      <h2>🔧 Complement Types — Full Guide</h2>
      <h3>1. Resultative Complements (结果补语)</h3>
      <p>Describe the RESULT of the action. Attach directly to the verb.</p>
      <div class="formula">V + Result: 做完 / 听懂 / 看见 / 写错 / 找到</div>

      <h3>2. Directional Complements (趋向补语)</h3>
      <p>Simple: 来/去 | Compound: 进来, 出去, 上来, 下去, 回来</p>
      <div class="formula">V + Direction: 走进来 / 拿出去 / 跑回来</div>

      <h3>3. Potential Complements (可能补语)</h3>
      <p>Insert 得 (can) or 不 (cannot) between verb and result.</p>
      <div class="formula">V + 得/不 + Result: 听得懂 / 听不懂 / 做得完 / 做不完</div>
      <div class="highlight">⚠️ Potential complements CANNOT co-occur with 了, 过, or aspect markers.</div>

      <h3>4. Degree Complements (程度补语)</h3>
      <div class="formula">V + 得 + Degree: 说得很流利 / 写得漂亮</div>
      <p>With object: Repeat the verb → 他说中文说得很流利 ✓</p>
    </div>

    <div class="note-section" id="note-connectors">
      <h2>🔗 Essay Connectors & Discourse Markers</h2>
      <h3>Sequence</h3>
      <ul><li>首先 (shǒuxiān) — first of all</li><li>其次 (qícì) — secondly</li><li>然后 (ránhòu) — then, afterwards</li><li>最后 (zuìhòu) — finally, lastly</li></ul>
      <h3>Addition</h3>
      <ul><li>此外 (cǐwài) — in addition, besides</li><li>而且 (érqiě) — furthermore, moreover</li><li>不但…而且 (bùdàn…érqiě) — not only…but also</li></ul>
      <h3>Contrast</h3>
      <ul><li>但是/可是 (dànshì/kěshì) — but, however</li><li>然而 (rán'ér) — however (formal)</li><li>虽然…但是 (suīrán…dànshì) — although…but</li><li>尽管…仍然 (jǐnguǎn…réngrán) — despite…still</li></ul>
      <h3>Conclusion</h3>
      <ul><li>总之 (zǒngzhī) — in short, in a word</li><li>综上所述 (zōng shàng suǒ shù) — in summary of the above</li><li>由此可见 (yóucǐ kějiàn) — from this we can see</li><li>因此 (yīncǐ) — therefore, as a result</li></ul>
    </div>

    <div class="note-section" id="note-chengyu-ref">
      <h2>📜 Essential 成语 Quick Reference</h2>
      <table style="width:100%;border-collapse:collapse;font-size:13px">
        <tr style="background:var(--pink-l)"><th style="padding:8px;text-align:left">成语</th><th style="padding:8px;text-align:left">Pinyin</th><th style="padding:8px;text-align:left">Meaning</th><th style="padding:8px;text-align:left">Usage</th></tr>
        ${[
          ['一石二鸟','yī shí èr niǎo','Kill two birds with one stone','When one action achieves two goals'],
          ['半途而废','bàn tú ér fèi','Give up halfway','Criticizing someone for not finishing'],
          ['守株待兔','shǒu zhū dài tù','Wait passively for luck','Criticizing passive behavior'],
          ['画蛇添足','huà shé tiān zú','Ruin by overdoing','When someone adds unnecessary things'],
          ['对牛弹琴','duì niú tán qín','Cast pearls before swine','Wasting effort on unappreciative audience'],
          ['亡羊补牢','wáng yáng bǔ láo','Better late than never','Fixing a problem after harm occurs'],
          ['滴水穿石','dī shuǐ chuān shí','Perseverance prevails','Encouraging continued effort'],
          ['掩耳盗铃','yǎn ěr dào líng','Self-deception','When someone ignores obvious reality'],
          ['脚踏实地','jiǎo tà shí dì','Down-to-earth, practical','Praising practical, grounded approach'],
          ['废寝忘食','fèi qǐn wàng shí','So absorbed you forget to eat/sleep','Intense study or work devotion']
        ].map(r => `<tr style="border-bottom:1px solid var(--border)"><td style="padding:8px;font-family:'Noto Serif SC',serif;font-size:16px">${r[0]}</td><td style="padding:8px;color:var(--pink-d)">${r[1]}</td><td style="padding:8px">${r[2]}</td><td style="padding:8px;color:var(--text3);font-size:12px">${r[3]}</td></tr>`).join('')}
      </table>
    </div>
  `;
}

// ===== SMS REMINDERS =====
function renderReminders() {
  const container = document.getElementById('reminders-container');
  const dayOfYear = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / 86400000);
  const todayMsg = DAILY_MOTIVATIONS[dayOfYear % DAILY_MOTIVATIONS.length];
  const yestMsg = DAILY_MOTIVATIONS[(dayOfYear - 1 + DAILY_MOTIVATIONS.length) % DAILY_MOTIVATIONS.length];

  container.innerHTML = `
    <div class="sms-preview">
      <div class="sms-bubble">
        <div class="sms-text">📚 ${yestMsg}</div>
        <div class="sms-time">Yesterday · CSCA Study</div>
      </div>
      <div class="sms-bubble today">
        <div class="sms-text">🔥 ${todayMsg}</div>
        <div class="sms-time">Today · CSCA Study</div>
      </div>
    </div>

    <div class="sms-form">
      <h3>📱 Set Up Daily Study Reminders</h3>
      <p style="font-size:13px;color:var(--text2);margin-bottom:20px">We use Twilio to send you a personalized, daily motivation message. Each day is different — and they get increasingly intense the closer your exam gets.</p>

      <div class="form-group">
        <label class="form-label">Your Phone Number (with country code)</label>
        <input type="tel" class="form-input" id="phone-input" placeholder="+1 555 123 4567" />
      </div>
      <div class="form-group">
        <label class="form-label">Reminder Time</label>
        <input type="time" class="form-input" id="time-input" value="08:00" />
      </div>
      <div class="form-group">
        <label class="form-label">Motivation Style</label>
        <select class="form-input" id="style-input">
          <option value="toxic">🔥 Toxic Grind (Maximum pressure)</option>
          <option value="tough">💪 Tough Love (Push but kind)</option>
          <option value="gentle">🌸 Gentle Nudge (Encouraging)</option>
        </select>
      </div>
      <button class="lv-complete-btn" onclick="saveReminder()">📱 Save Reminder Settings</button>
      <div class="sms-disclaimer">By providing your number, you consent to receive daily study reminders. Standard message rates apply. Reply STOP to unsubscribe.</div>
    </div>

    <div class="twilio-note">
      <strong>🛠️ Developer Setup (Twilio Integration):</strong><br>
      To enable real SMS, add these to your <code>.env</code> file:<br>
      <code>TWILIO_ACCOUNT_SID=your_sid</code><br>
      <code>TWILIO_AUTH_TOKEN=your_token</code><br>
      <code>TWILIO_PHONE=+1xxxxxxxxxx</code><br><br>
      Then deploy a serverless function at <code>/api/send-reminder</code> that runs daily via a cron job (Vercel Cron or similar). Full setup instructions in <code>README.md</code>.
    </div>

    <div class="motivation-preview-grid">
      <h4>📅 Upcoming Daily Messages Preview</h4>
      ${DAILY_MOTIVATIONS.slice(0, 7).map((m, i) => `
        <div class="mpg-item">${i === 0 ? '📅 Today: ' : `Day +${i}: `}${m}</div>
      `).join('')}
    </div>
  `;
}

function saveReminder() {
  const phone = document.getElementById('phone-input').value;
  if (!phone) { showToast('Please enter your phone number!', 'error'); return; }
  state.reminderPhone = phone;
  state.reminderTime = document.getElementById('time-input').value;
  state.reminderStyle = document.getElementById('style-input').value;
  saveState();
  showToast('✅ Reminder settings saved! Connect Twilio to activate SMS.', 'success');
}

// ===== TOAST =====
function showToast(msg, type = '') {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = msg;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 3500);
}