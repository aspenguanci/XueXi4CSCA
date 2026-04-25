// ===== QUICK PATCH FOR BUTTONS + NAVIGATION =====
// Copy these exact functions into your existing app.js,
// replacing the old versions with these fixed ones.

// ===== STATE =====
let state = {
  currentPage: 'home',
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

// ===== REQUIRED FIX =====
function goTo(page) {
  navigateTo(page);
}

// ===== FIXED NAV SETUP =====
function setupNav() {
  document.querySelectorAll('.nav-item').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();

      const page = link.dataset.page;
      if (!page) return;

      navigateTo(page);

      if (window.innerWidth < 900) {
        closeMobileMenu();
      }
    });
  });
}

// ===== FIXED PAGE NAVIGATION =====
function navigateTo(page) {
  state.currentPage = page;

  document.querySelectorAll('.page').forEach(p => {
    p.classList.remove('active');
  });

  document.querySelectorAll('.nav-item').forEach(link => {
    link.classList.remove('active');
  });

  const targetPage = document.getElementById(`page-${page}`);
  if (targetPage) {
    targetPage.classList.add('active');
  }

  const activeNav = document.querySelector(`[data-page="${page}"]`);
  if (activeNav) {
    activeNav.classList.add('active');
  }

  if (page === 'lessons') renderLessons();
  if (page === 'flashcards') renderFlashcards();
  if (page === 'vocab') renderVocab();
  if (page === 'practice') renderPractice();
  if (page === 'notes') renderNotes();
  if (page === 'reminders') renderReminders();

  saveState();
}

// ===== FIXED SIDEBAR STATS =====
function updateSidebarStats() {
  const pct = Math.round((state.xp / (state.level * 100)) * 100);

  const streakEl = document.getElementById('sb-streak');
  const xpEl = document.getElementById('sb-xp');
  const levelEl = document.getElementById('sb-level-text');
  const fillEl = document.getElementById('sb-xp-fill');

  if (streakEl) streakEl.textContent = state.streak;
  if (xpEl) xpEl.textContent = state.xp + ' XP';
  if (levelEl) levelEl.textContent = 'Level ' + state.level;
  if (fillEl) fillEl.style.width = pct + '%';
}

// ===== IMPORTANT =====
// Keep the rest of your original app.js exactly the same.
// Only replace:
// 1. currentPage value
// 2. setupNav()
// 3. navigateTo()
// 4. updateSidebarStats()
// 5. add goTo() function
//
// Then deploy to Vercel using:
// git add .
// git commit -m "fixed navigation"
// git push
