/**
 * Korean Read-Aloud Trainer - Main Application Logic
 * Helps overcome "chunking paralysis" through progressive difficulty
 * and click-to-track syllable highlighting.
 * Dynamically pulls Bible verses from sermons.bo-bob.org
 */

let currentLevel = Object.keys(DATA)[0];
let deck = [];
let idx = 0;
let startTime = null;
let timerInterval = null;
let bibleVersesLoaded = {}; // Track which Bible levels have been populated

const koreanEl = document.getElementById('korean');
const hintEl = document.getElementById('hint');
const progressEl = document.getElementById('progress');
const timerEl = document.getElementById('timer');
const attributionEl = document.getElementById('attribution');

/**
 * Fisher-Yates shuffle
 */
function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * Build level buttons at the top
 */
function buildLevels() {
  const div = document.getElementById('levels');
  Object.keys(DATA).forEach(name => {
    const b = document.createElement('button');
    b.textContent = name;
    b.onclick = async () => await setLevel(name, b);
    if (name === currentLevel) b.classList.add('active');
    div.appendChild(b);
  });
}

/**
 * Switch to a new level
 * If it's a Bible level, dynamically fetch verses
 */
async function setLevel(name, btn) {
  currentLevel = name;
  document.querySelectorAll('.levels button').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  // Check if this is a Bible level and hasn't been loaded yet
  if (name.includes('Bible') && !bibleVersesLoaded[name]) {
    try {
      const verseCount = DATA[name] ? DATA[name].length : 10;
      const newVerses = await bibleFetcher.fetchVerses(verseCount);
      if (newVerses.length > 0) {
        if (!DATA[name]) DATA[name] = [];
        DATA[name] = [...DATA[name], ...newVerses];
        bibleVersesLoaded[name] = true;
      }
    } catch (error) {
      console.error('Error loading Bible verses:', error);
    }
  }

  deck = shuffle([...DATA[name]]);
  idx = 0;
  show();
}

/**
 * Display current card with click-to-track syllables
 * Every Hangul syllable becomes clickable and highlights in red
 */
function show() {
  const [kor] = deck[idx];

  // Wrap each Hangul syllable in a span so users can click-track their place
  // This forces processing one chunk at a time instead of freezing at the whole block
  koreanEl.innerHTML = [...kor].map(ch =>
    /[가-힣]/.test(ch) ? `<span class="syl">${ch}</span>` : ch
  ).join('');

  // Adjust font size based on text length (progressive text sizing)
  koreanEl.style.fontSize = kor.length > 30 ? '1.6rem' : kor.length > 12 ? '2.2rem' : '3rem';

  // Add click handler to each syllable to light it up
  koreanEl.querySelectorAll('.syl').forEach(s => {
    s.onclick = () => s.classList.toggle('lit');
  });

  // Clear hint until user asks to reveal
  hintEl.innerHTML = '&nbsp;';

  // Show progress and level
  progressEl.textContent = `${idx + 1} / ${deck.length} — ${currentLevel}`;

  // Update attribution if this is a Bible level
  updateAttribution();

  // Start timer to pressure users to speak immediately rather than silently scan
  startTime = Date.now();
  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    timerEl.textContent = ((Date.now() - startTime) / 1000).toFixed(1) + 's';
  }, 100);
}

/**
 * Show romanization and English meaning/translation
 * Only reveal after attempt to combat passive scanning
 */
function reveal() {
  const [, rom, meaning] = deck[idx];
  hintEl.innerHTML = `<span class="rom">${rom}</span>${meaning || ''}`;
}

/**
 * Speak the Korean text using browser's Web Speech API
 * @param {number} rate - Speech rate (0.55 = slow, 0.9 = normal)
 */
function speak(rate = 0.9) {
  const u = new SpeechSynthesisUtterance(deck[idx][0]);
  u.lang = 'ko-KR';
  u.rate = rate;

  // Try to use Korean voice if available
  const koVoice = speechSynthesis.getVoices().find(v => v.lang.startsWith('ko'));
  if (koVoice) u.voice = koVoice;

  speechSynthesis.cancel();
  speechSynthesis.speak(u);
}

/**
 * Move to next card
 * When deck cycles, reshuffle to avoid repetition patterns
 */
function next() {
  idx = (idx + 1) % deck.length;
  if (idx === 0) deck = shuffle([...deck]);
  show();
}

/**
 * Update attribution display for Bible content
 */
function updateAttribution() {
  if (ATTRIBUTION_DATA[currentLevel]) {
    const attr = ATTRIBUTION_DATA[currentLevel];
    attributionEl.innerHTML = `
      <div>
        Bible passages sourced from <a href="https://${attr.source}" target="_blank" rel="noopener">${attr.source}</a>
        <br>Translation: ${attr.translation}
      </div>
    `;
  } else {
    attributionEl.innerHTML = '';
  }
}

/**
 * Keyboard shortcuts for fast drilling
 * Space: next card
 * R: reveal romanization
 * S: speak (normal speed)
 * D: slow speech
 */
document.getElementById('revealBtn').onclick = reveal;
document.getElementById('speakBtn').onclick = () => speak(0.9);
document.getElementById('slowBtn').onclick = () => speak(0.55);
document.getElementById('nextBtn').onclick = next;

document.addEventListener('keydown', e => {
  if (e.code === 'Space') {
    e.preventDefault();
    next();
  }
  if (e.key === 'r' || e.key === 'R') reveal();
  if (e.key === 's' || e.key === 'S') speak(0.9);
  if (e.key === 'd' || e.key === 'D') speak(0.55);
});

// Voices load asynchronously in some browsers
speechSynthesis.onvoiceschanged = () => {};

/**
 * Initialize the app
 */
(async () => {
  deck = shuffle([...DATA[currentLevel]]);
  buildLevels();
  show();
})();

/**
 * Daily routine recommendations:
 * 1. 2 minutes on Syllables — pure speed, say each one within 1 second
 * 2. 5 minutes on Words/Phrases — read aloud, then verify with audio
 * 3. 5 minutes on Sentences — aim for one smooth pass with no restarts
 * 4. Finish with one Wall of Text — click-track word by word. Slow is fine; finishing is the win.
 *
 * This progressive approach combats chunking paralysis by never presenting
 * a wall you haven't built up to.
 */
