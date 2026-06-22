/**
 * Minha Opp+ — PWA de onboarding gamificado
 * Grupo Opp+ | Design System Opp+ v1.1
 * Vanilla JS | Mobile-first | Dual-theme
 */

// ═══════════════════════════════════════════════════════════════
// THEME MANAGEMENT
// ═══════════════════════════════════════════════════════════════

const THEME_KEY = 'minha-opp-theme';

function getStoredTheme() {
  try { return localStorage.getItem(THEME_KEY); } catch (_) { return null; }
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.content = theme === 'light' ? '#FFFFFF' : '#0F1419';
  try { localStorage.setItem(THEME_KEY, theme); } catch (_) { /* noop */ }
}

function currentTheme() {
  return document.documentElement.getAttribute('data-theme') || 'dark';
}

function toggleTheme() {
  applyTheme(currentTheme() === 'dark' ? 'light' : 'dark');
  render();
}

function setTheme(theme) {
  applyTheme(theme);
  render();
}

(function initTheme() {
  const stored = getStoredTheme();
  if (stored) { applyTheme(stored); return; }
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
    applyTheme('light');
  }
})();

// ═══════════════════════════════════════════════════════════════
// LOGO PROGRESSIVO — variantes desbloqueadas por milestone
// ═══════════════════════════════════════════════════════════════

const LOGO_VARIANTS = [
  { from: 0,  variant: 'padrao' },
  { from: 2,  variant: 'esmeralda' },
  { from: 3,  variant: 'branco' },
  { from: 5,  variant: 'rubi' },
  { from: 7,  variant: 'prata-brilhante' },
  { from: 9,  variant: 'ouro-brilhante' },
  { from: 15, variant: 'diamante' },
];

function currentLogoVariant() {
  let variant = LOGO_VARIANTS[0].variant;
  for (const m of LOGO_VARIANTS) {
    if (state.currentScreen >= m.from) variant = m.variant;
  }
  return variant;
}

function iconSrc(variant) {
  return `img/icon/icon-gopp-${variant || currentLogoVariant()}.png`;
}

function logoSrc(variant) {
  return `img/logo/logo-gopp-${variant || 'padrao'}.png`;
}

function iconImg(cssClass, variant) {
  return `<img class="${cssClass}" src="${iconSrc(variant)}" alt="Grupo Opp+" loading="lazy">`;
}

function logoImg(cssClass, variant) {
  return `<img class="${cssClass}" src="${logoSrc(variant)}" alt="Logo Grupo Opp+" loading="lazy">`;
}

// ═══════════════════════════════════════════════════════════════
// SCREEN DEFINITIONS
// ═══════════════════════════════════════════════════════════════

const MISSION_NAMES = {
  1: 'Preparação',
  2: 'Suas Ferramentas',
  3: 'Configurando o Celular',
  4: 'Finalização',
};

const SCREENS = [
  { id: 'splash', mission: 1 },
  { id: 'email-input', mission: 1 },
  { id: 'overview', mission: 1 },
  { id: 'identity', mission: 2 },
  { id: 'tools', mission: 2 },
  { id: 'privacy', mission: 2 },
  { id: 'conduct', mission: 2 },
  { id: 'security', mission: 2 },
  { id: 'terms', mission: 2 },
  { id: 'smtp-intro', mission: 3 },
  { id: 'smtp-1', mission: 3 },
  { id: 'smtp-2', mission: 3 },
  { id: 'smtp-3', mission: 3 },
  { id: 'smtp-4', mission: 3 },
  { id: 'smtp-5', mission: 3 },
  { id: 'smtp-6', mission: 3 },
  { id: 'smtp-7', mission: 3 },
  { id: 'smtp-8', mission: 3 },
  { id: 'smtp-9', mission: 3 },
  { id: 'celebration', mission: 4 },
  { id: 'feedback', mission: 4 },
  { id: 'summary', mission: 4 },
];

// ═══════════════════════════════════════════════════════════════
// FEEDBACK — HAPTIC & AUDIO
// ═══════════════════════════════════════════════════════════════

function vibrate(pattern) {
  if (navigator.vibrate) navigator.vibrate(pattern);
}

const haptic = {
  tap: () => vibrate(30),
  step: () => vibrate(50),
  success: () => vibrate([50, 40, 50]),
  mission: () => vibrate([80, 60, 80, 60, 120]),
  celebration: () => vibrate([100, 50, 100, 50, 200]),
};

function playTone(freq, duration, type = 'sine') {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0.12, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch (_) { /* noop */ }
}

const audio = {
  step: () => playTone(880, 0.1),
  success: () => { playTone(523, 0.12); setTimeout(() => playTone(659, 0.12), 100); setTimeout(() => playTone(784, 0.18), 200); },
  celebration: () => { playTone(523, 0.15); setTimeout(() => playTone(659, 0.15), 120); setTimeout(() => playTone(784, 0.15), 240); setTimeout(() => playTone(1047, 0.3, 'triangle'), 380); },
  error: () => playTone(220, 0.2, 'square'),
};

function feedbackStep() { haptic.step(); audio.step(); }
function feedbackSuccess() { haptic.success(); audio.success(); }
function feedbackMission() { haptic.mission(); audio.success(); }
function feedbackCelebration() { haptic.celebration(); audio.celebration(); }
function feedbackError() { haptic.tap(); audio.error(); }

// ═══════════════════════════════════════════════════════════════
// STATE
// ═══════════════════════════════════════════════════════════════

const STORAGE_KEY = 'minha-opp-state';

const state = {
  currentScreen: 0,
  emailInput: '',
  user: null,
  termsAccepted: false,
  completedSteps: [],
  lookupError: '',
  feedback: { q1: 0, q2: 0, q3: 0, q4: 0, q5: 0, q6: '' },
  feedbackSent: false,
};

let usersDb = [];

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      currentScreen: state.currentScreen,
      emailInput: state.emailInput,
      user: state.user,
      termsAccepted: state.termsAccepted,
      completedSteps: state.completedSteps,
      feedback: state.feedback,
      feedbackSent: state.feedbackSent,
    }));
  } catch (_) { /* noop */ }
}

function loadState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      Object.assign(state, parsed);
    }
  } catch (_) { /* noop */ }
}

const API_URL = 'https://script.google.com/macros/s/AKfycbz5kICPSL0qLzVXOwaWgfPdzfVn4Wm5kUlc8dFyEGovT9mfXbzXHNbHP_i-WCFYrsIFLA/exec';

async function loadUsers() {
  try {
    const res = await fetch(API_URL);
    const json = await res.json();
    usersDb = Array.isArray(json) ? json : (json.data || []);
  } catch (_) {
    usersDb = [];
  }
}

function lookupUser(email) {
  const normalized = email.trim().toLowerCase();
  return usersDb.find(u => u.personalEmail.toLowerCase() === normalized) || null;
}

// ═══════════════════════════════════════════════════════════════
// HELPERS
// ═══════════════════════════════════════════════════════════════

const u = () => state.user || {};
const firstName = () => u().firstName || 'colaborador';
const corpEmail = () => u().corporateEmail || 'seu-email@grupooppmais.com.br';
const accessEmail = () => u().accessEmail || 'seuemailacesso@grupooppmais.com.br';
const fullName = () => u().name || 'Colaborador';
const userRole = () => u().role || '';

// ═══════════════════════════════════════════════════════════════
// NAVIGATION
// ═══════════════════════════════════════════════════════════════

const app = document.getElementById('app');

function goTo(index) {
  if (index < 0 || index >= SCREENS.length) return;
  state.currentScreen = index;
  if (!state.completedSteps.includes(index)) {
    state.completedSteps.push(index);
  }
  saveState();
  render();
}

function next() { goTo(state.currentScreen + 1); }
function back() { goTo(state.currentScreen - 1); }

function nextWithFeedback(type) {
  if (type === 'step') feedbackStep();
  else if (type === 'success') feedbackSuccess();
  else if (type === 'mission') feedbackMission();
  else if (type === 'celebration') feedbackCelebration();
  else haptic.tap();
  next();
}

function restart() {
  state.currentScreen = 0;
  state.emailInput = '';
  state.user = null;
  state.termsAccepted = false;
  state.completedSteps = [];
  state.lookupError = '';
  state.feedback = { q1: 0, q2: 0, q3: 0, q4: 0, q5: 0, q6: '' };
  state.feedbackSent = false;
  saveState();
  render();
}

function handleEmailSubmit() {
  const input = document.getElementById('user-email');
  if (!input) return;
  const email = input.value.trim();
  if (!email) return;

  state.emailInput = email;
  const found = lookupUser(email);

  if (found) {
    state.user = found;
    state.lookupError = '';
    feedbackSuccess();
    saveState();
    next();
  } else {
    state.lookupError = 'E-mail não encontrado. Verifique a digitação ou chame a TI.';
    feedbackError();
    render();
  }
}

// ═══════════════════════════════════════════════════════════════
// HEADER
// ═══════════════════════════════════════════════════════════════

function headerLogoVariant() {
  return currentLogoVariant();
}

function renderHeader() {
  const screen = SCREENS[state.currentScreen];
  if (screen.id === 'splash') return '';

  const missionName = MISSION_NAMES[screen.mission];
  const total = SCREENS.length;
  const progress = ((state.currentScreen + 1) / total) * 100;

  return `
    <div class="wizard-header">
      <div class="wizard-header__top">
        ${iconImg('wizard-header__logo', headerLogoVariant())}
        <div class="wizard-header__info">
          <span class="wizard-header__phase">Missão ${screen.mission} — ${missionName}</span>
          <span class="wizard-header__step">${state.currentScreen + 1} / ${total}</span>
        </div>
      </div>
      <div class="progress-bar">
        <div class="progress-bar__fill" style="width:${progress}%"></div>
      </div>
    </div>
  `;
}

// ═══════════════════════════════════════════════════════════════
// NAV BUTTONS
// ═══════════════════════════════════════════════════════════════

function btnRow(opts = {}) {
  const {
    backLabel = 'Voltar',
    nextLabel = 'Avançar',
    showBack = state.currentScreen > 0,
    showNext = true,
    nextDisabled = false,
    nextId = 'btn-next',
    nextClass = 'btn--primary',
    nextAction = "nextWithFeedback('tap')",
    feedback = '',
  } = opts;

  const action = feedback ? `nextWithFeedback('${feedback}')` : nextAction;

  return `
    <div class="btn-row">
      ${showBack ? `<button class="btn btn--secondary" onclick="back()">${backLabel}</button>` : ''}
      ${showNext ? `<button id="${nextId}" class="btn ${nextClass}" onclick="${action}" ${nextDisabled ? 'disabled' : ''}>${nextLabel}</button>` : ''}
    </div>
  `;
}

// ═══════════════════════════════════════════════════════════════
// SMTP STEP HELPER
// ═══════════════════════════════════════════════════════════════

function smtpStep(num, action, detail, btnLabel, illustration) {
  return `
    <div class="screen">
      <span class="phase-badge phase-badge--3">Passo ${num} de 9</span>
      <div class="step-instruction">
        <div class="step-instruction__number">${num}</div>
        <div class="step-instruction__action">${action}</div>
        <div class="step-instruction__detail">${detail}</div>
      </div>
      ${illustration ? `<div class="smtp-illustration">${illustration}</div>` : ''}
      ${btnRow({ nextLabel: btnLabel || 'Feito ✓', nextClass: 'btn--done', feedback: 'step' })}
    </div>
  `;
}

function gmailMockup(elements) {
  const isLight = currentTheme() === 'light';
  const bg = isLight ? '#f6f8fc' : '#1a1f26';
  const cardBg = isLight ? '#ffffff' : '#242a33';
  const textPri = isLight ? '#1f1f1f' : '#e8e8e8';
  const textSec = isLight ? '#5f6368' : '#b0b0b0';
  const border = isLight ? '#e0e0e0' : 'rgba(255,255,255,0.1)';
  const accent = '#219653';
  const highlight = 'rgba(33,150,83,0.15)';
  const highlightBorder = '#6FCF97';
  return `<svg viewBox="0 0 320 ${elements.height || 280}" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:320px;border-radius:12px;overflow:hidden;">
    <rect width="320" height="${elements.height || 280}" fill="${bg}" rx="12"/>
    ${elements.render({ bg, cardBg, textPri, textSec, border, accent, highlight, highlightBorder })}
  </svg>`;
}

const SMTP_ILLUSTRATIONS = {
  1: () => gmailMockup({
    height: 200,
    render: (c) => `
      <rect x="30" y="20" width="260" height="50" rx="25" fill="${c.cardBg}" stroke="${c.border}"/>
      <text x="55" y="50" font-size="13" fill="${c.textSec}" font-family="sans-serif">Pesquisar no e-mail</text>
      <circle cx="280" cy="45" r="16" fill="${c.accent}" opacity="0.15"/>
      <text x="274" y="50" font-size="14" fill="${c.accent}" font-family="sans-serif">🔍</text>
      <rect x="10" y="90" width="300" height="44" rx="8" fill="${c.cardBg}" stroke="${c.border}"/>
      <circle cx="32" cy="112" r="12" fill="#4285f4"/>
      <text x="26" y="116" font-size="10" fill="white" font-family="sans-serif">G</text>
      <text x="52" y="108" font-size="12" fill="${c.textPri}" font-weight="600" font-family="sans-serif">Google</text>
      <text x="52" y="122" font-size="10" fill="${c.textSec}" font-family="sans-serif">Bem-vindo ao Gmail</text>
      <rect x="10" y="140" width="300" height="44" rx="8" fill="${c.cardBg}" stroke="${c.border}"/>
      <circle cx="32" cy="162" r="12" fill="#ea4335"/>
      <text x="24" y="166" font-size="10" fill="white" font-family="sans-serif">YT</text>
      <text x="52" y="158" font-size="12" fill="${c.textPri}" font-weight="600" font-family="sans-serif">YouTube</text>
      <text x="52" y="172" font-size="10" fill="${c.textSec}" font-family="sans-serif">Novo vídeo disponível</text>
    `
  }),

  2: () => gmailMockup({
    height: 300,
    render: (c) => `
      <rect x="0" y="0" width="320" height="48" fill="${c.cardBg}"/>
      <rect x="14" y="16" width="18" height="2.5" rx="1" fill="${c.textSec}"/>
      <rect x="14" y="22" width="18" height="2.5" rx="1" fill="${c.textSec}"/>
      <rect x="14" y="28" width="18" height="2.5" rx="1" fill="${c.textSec}"/>
      <circle cx="52" cy="24" r="5" fill="${c.highlight}" stroke="${c.highlightBorder}" stroke-width="2"/>
      <line x1="20" y1="14" x2="42" y2="24" stroke="${c.highlightBorder}" stroke-width="2" stroke-dasharray="4"/>
      <text x="60" y="28" font-size="14" fill="${c.textPri}" font-weight="700" font-family="sans-serif">Caixa de entrada</text>
      <rect x="0" y="48" width="240" height="252" fill="${c.cardBg}" stroke="${c.border}"/>
      <rect x="0" y="48" width="240" height="40" fill="${c.highlight}" stroke="${c.highlightBorder}" stroke-width="2" rx="0"/>
      <text x="45" y="72" font-size="13" fill="${c.accent}" font-weight="700" font-family="sans-serif">📥 Caixa de entrada</text>
      <text x="45" y="108" font-size="12" fill="${c.textSec}" font-family="sans-serif">⭐ Com estrela</text>
      <text x="45" y="138" font-size="12" fill="${c.textSec}" font-family="sans-serif">📤 Enviados</text>
      <text x="45" y="168" font-size="12" fill="${c.textSec}" font-family="sans-serif">📝 Rascunhos</text>
      <rect x="20" y="195" width="200" height="1" fill="${c.border}"/>
      <rect x="20" y="210" width="200" height="36" rx="6" fill="${c.highlight}" stroke="${c.highlightBorder}" stroke-width="2"/>
      <text x="45" y="233" font-size="13" fill="${c.accent}" font-weight="700" font-family="sans-serif">⚙️ Configurações</text>
      <line x1="130" y1="246" x2="130" y2="270" stroke="${c.highlightBorder}" stroke-width="2" stroke-dasharray="4"/>
      <text x="85" y="285" font-size="11" fill="${c.accent}" font-weight="600" font-family="sans-serif">👆 Toque aqui</text>
    `
  }),

  3: () => gmailMockup({
    height: 310,
    render: (c) => `
      <rect x="0" y="0" width="320" height="44" fill="${c.accent}"/>
      <text x="16" y="28" font-size="13" fill="white" font-weight="600" font-family="sans-serif">← Configurações</text>
      <rect x="10" y="56" width="300" height="36" rx="6" fill="${c.cardBg}" stroke="${c.border}"/>
      <text x="24" y="79" font-size="12" fill="${c.textPri}" font-family="sans-serif">Contas e importação</text>
      <rect x="10" y="98" width="300" height="36" rx="6" fill="${c.cardBg}" stroke="${c.border}"/>
      <text x="24" y="121" font-size="12" fill="${c.textPri}" font-family="sans-serif">Filtros e endereços bloqueados</text>
      <text x="10" y="158" font-size="11" fill="${c.textSec}" font-weight="600" font-family="sans-serif">ENVIAR E-MAIL COMO:</text>
      <rect x="10" y="168" width="300" height="36" rx="6" fill="${c.cardBg}" stroke="${c.border}"/>
      <text x="24" y="191" font-size="12" fill="${c.textSec}" font-family="sans-serif">meu.email@gmail.com</text>
      <rect x="10" y="212" width="300" height="44" rx="8" fill="${c.highlight}" stroke="${c.highlightBorder}" stroke-width="2"/>
      <text x="24" y="233" font-size="12" fill="${c.accent}" font-weight="700" font-family="sans-serif">➕ Adicionar outro endereço</text>
      <text x="28" y="248" font-size="10" fill="${c.accent}" font-family="sans-serif">de e-mail</text>
      <line x1="160" y1="256" x2="160" y2="278" stroke="${c.highlightBorder}" stroke-width="2" stroke-dasharray="4"/>
      <text x="115" y="293" font-size="11" fill="${c.accent}" font-weight="600" font-family="sans-serif">👆 Toque aqui</text>
    `
  }),

  5: () => gmailMockup({
    height: 220,
    render: (c) => `
      <rect x="0" y="0" width="320" height="44" fill="${c.accent}"/>
      <text x="16" y="28" font-size="13" fill="white" font-weight="600" font-family="sans-serif">← Adicionar conta</text>
      <rect x="20" y="64" width="280" height="48" rx="8" fill="#ff6b6b22" stroke="#FF6B6B" stroke-width="2"/>
      <rect x="40" y="76" width="18" height="18" rx="3" fill="${c.cardBg}" stroke="#FF6B6B" stroke-width="2"/>
      <text x="44" y="89" font-size="10" fill="#FF6B6B" font-family="sans-serif">✗</text>
      <text x="68" y="88" font-size="12" fill="${c.textPri}" font-family="sans-serif">Tratar como um alias</text>
      <text x="68" y="103" font-size="9" fill="#FF6B6B" font-weight="600" font-family="sans-serif">⚠ DESMARQUE esta opção!</text>
      <rect x="20" y="130" width="280" height="40" rx="8" fill="${c.cardBg}" stroke="${c.border}"/>
      <text x="85" y="155" font-size="12" fill="${c.textPri}" font-family="sans-serif">Próxima etapa ›</text>
      <text x="55" y="198" font-size="10" fill="${c.textSec}" font-style="italic" font-family="sans-serif">Se não aparecer, apenas avance normalmente</text>
    `
  }),

  6: () => gmailMockup({
    height: 280,
    render: (c) => `
      <rect x="0" y="0" width="320" height="44" fill="${c.accent}"/>
      <text x="16" y="28" font-size="13" fill="white" font-weight="600" font-family="sans-serif">← Servidor SMTP</text>
      <text x="20" y="74" font-size="11" fill="${c.textSec}" font-weight="600" font-family="sans-serif">SERVIDOR SMTP</text>
      <rect x="20" y="82" width="280" height="36" rx="6" fill="${c.highlight}" stroke="${c.highlightBorder}" stroke-width="1.5"/>
      <text x="32" y="105" font-size="13" fill="${c.accent}" font-weight="700" font-family="monospace">smtp.gmail.com</text>
      <text x="20" y="138" font-size="11" fill="${c.textSec}" font-weight="600" font-family="sans-serif">PORTA</text>
      <rect x="20" y="146" width="120" height="36" rx="6" fill="${c.highlight}" stroke="${c.highlightBorder}" stroke-width="1.5"/>
      <text x="32" y="169" font-size="13" fill="${c.accent}" font-weight="700" font-family="monospace">465</text>
      <text x="20" y="205" font-size="11" fill="${c.textSec}" font-weight="600" font-family="sans-serif">SEGURANÇA</text>
      <rect x="20" y="213" width="280" height="36" rx="6" fill="${c.highlight}" stroke="${c.highlightBorder}" stroke-width="1.5"/>
      <rect x="32" y="224" width="16" height="16" rx="3" fill="${c.accent}"/>
      <text x="35" y="236" font-size="10" fill="white" font-family="sans-serif">✓</text>
      <text x="56" y="236" font-size="11" fill="${c.textPri}" font-family="sans-serif">Conexão segura usando SSL</text>
    `
  }),

  9: () => gmailMockup({
    height: 250,
    render: (c) => `
      <rect x="0" y="0" width="320" height="44" fill="${c.accent}"/>
      <text x="16" y="28" font-size="13" fill="white" font-weight="600" font-family="sans-serif">← Configurações</text>
      <text x="20" y="74" font-size="11" fill="${c.textSec}" font-weight="600" font-family="sans-serif">RESPONDER COMO</text>
      <rect x="20" y="82" width="280" height="36" rx="6" fill="${c.cardBg}" stroke="${c.border}"/>
      <text x="32" y="105" font-size="11" fill="${c.textSec}" font-family="sans-serif">Sempre responder do endereço padrão</text>
      <rect x="20" y="126" width="280" height="52" rx="8" fill="${c.highlight}" stroke="${c.highlightBorder}" stroke-width="2"/>
      <rect x="34" y="140" width="16" height="16" rx="8" fill="${c.accent}"/>
      <circle cx="42" cy="148" r="4" fill="white"/>
      <text x="58" y="148" font-size="11" fill="${c.accent}" font-weight="600" font-family="sans-serif">Responder pelo mesmo endereço</text>
      <text x="58" y="164" font-size="10" fill="${c.accent}" font-family="sans-serif">para o qual a mensagem foi enviada</text>
      <line x1="160" y1="178" x2="160" y2="200" stroke="${c.highlightBorder}" stroke-width="2" stroke-dasharray="4"/>
      <text x="113" y="215" font-size="11" fill="${c.accent}" font-weight="600" font-family="sans-serif">👆 Marque esta</text>
    `
  })
};

// ═══════════════════════════════════════════════════════════════
// SCREEN RENDERERS
// ═══════════════════════════════════════════════════════════════

const screenRenderers = {

  // ─── MISSÃO 1: PREPARAÇÃO ────────────────────────────────

  'splash': () => `
    <div class="splash">
      <div class="splash__logo">${logoImg('splash__logo-img', 'padrao')}</div>
      <h1 class="splash__title">Bem-vindo(a) ao Ambiente OPP Virtual!</h1>
      <p class="splash__subtitle">Sua jornada digital começa aqui 🚀</p>
      <p class="splash__tagline">
        O Grupo Opp+ tem o prazer de fornecer a você as ferramentas do <strong>Google Workspace</strong>. Este é o seu novo escritório digital, estruturado para facilitar sua rotina, conectar nossa equipe e impulsionar resultados.
      </p>
      <p class="splash__tagline" style="margin-top:var(--space-3)">
        <span class="text-warn">Atenção:</span> este é um ambiente estritamente profissional. O uso de sua identidade e das ferramentas concedidas exige responsabilidade, ética e compromisso com a segurança dos dados. Lembre-se de que toda ação realizada aqui reflete a credibilidade da nossa marca.
      </p>
      <p class="splash__tagline" style="margin-top:var(--space-3)">
        Vamos configurar seus acessos de um jeito rápido e sem complicação.
      </p>
      <div class="theme-toggle" style="margin-top:var(--space-5);">
        <button class="theme-toggle__btn ${currentTheme() === 'light' ? 'theme-toggle__btn--active' : ''}" onclick="setTheme('light')">☀️ Claro</button>
        <button class="theme-toggle__btn ${currentTheme() === 'dark' ? 'theme-toggle__btn--active' : ''}" onclick="setTheme('dark')">🌙 Escuro</button>
      </div>
      <div class="btn-row" style="width:100%;max-width:300px;">
        <button class="btn btn--primary" onclick="nextWithFeedback('tap')">Começar agora</button>
      </div>
    </div>
  `,

  'email-input': () => `
    <div class="screen">
      <span class="phase-badge phase-badge--1">Missão 1: Identificação</span>
      <h2 class="screen__title">Qual é o seu e-mail pessoal?</h2>
      <p class="screen__lead">
        Digite o e-mail que você usa no dia a dia. Usaremos ele para encontrar seu perfil Opp+.
      </p>
      <div class="input-group">
        <label class="input-group__label" for="user-email">Seu e-mail pessoal</label>
        <input
          id="user-email"
          class="input-group__field"
          type="email"
          placeholder="Ex: seunome@gmail.com"
          value="${state.emailInput}"
          autocomplete="email"
          inputmode="email"
        />
      </div>
      ${state.lookupError ? `
        <div class="card card--warning" style="margin-bottom:var(--space-4)">
          <div class="card__text" style="color:var(--color-error)">
            ⚠️ ${state.lookupError}
          </div>
        </div>
      ` : ''}
      ${btnRow({
        nextLabel: 'Encontrar meu perfil',
        nextDisabled: !state.emailInput,
        showBack: false,
        nextAction: 'handleEmailSubmit()',
      })}
    </div>
  `,

  'overview': () => `
    <div class="screen">
      <span class="phase-badge phase-badge--1">Missão 1 Concluída ⭐</span>
      <h2 class="screen__title">Olá, ${firstName()}!</h2>
      <p class="screen__lead">
        Tudo certo! Você é <span class="text-highlight">${userRole()}</span> e este é seu novo e-mail de trabalho:
      </p>
      <div class="card card--accent">
        <div class="card__title">✉️ E-mail Corporativo</div>
        <div class="step-instruction__value">${corpEmail()}</div>
      </div>
      <div class="divider"></div>
      <p class="screen__text" style="font-weight:var(--font-weight-semibold);color:var(--color-text-primary);">
        A seguir, vamos:
      </p>
      <ul class="feature-list">
        <li class="feature-list__item">
          <span class="feature-list__icon">🧰</span>
          <div class="feature-list__content">
            <div class="feature-list__name">Conhecer suas ferramentas</div>
          </div>
        </li>
        <li class="feature-list__item">
          <span class="feature-list__icon">🛡️</span>
          <div class="feature-list__content">
            <div class="feature-list__name">Ver nossas regras de segurança</div>
          </div>
        </li>
        <li class="feature-list__item">
          <span class="feature-list__icon">📲</span>
          <div class="feature-list__content">
            <div class="feature-list__name">Configurar seu celular</div>
          </div>
        </li>
      </ul>
      ${btnRow({ nextLabel: 'Iniciar Missão 2', feedback: 'mission' })}
    </div>
  `,

  // ─── MISSÃO 2: SUAS FERRAMENTAS ─────────────────────────

  'identity': () => `
    <div class="screen">
      <span class="phase-badge phase-badge--2">Missão 2: Ferramentas</span>
      <h2 class="screen__title">Entenda seus acessos</h2>
      <p class="screen__lead">
        Você tem duas contas que trabalham juntas:
      </p>
      <div class="card card--accent">
        <div class="card__title">🔑 Para fazer Login</div>
        <div class="step-instruction__value">${accessEmail()}</div>
        <div class="card__text">
          Use apenas para entrar no Google e acessar arquivos.
        </div>
      </div>
      <div class="card card--info">
        <div class="card__title">✉️ Para Enviar E-mails</div>
        <div class="step-instruction__value">${corpEmail()}</div>
        <div class="card__text">
          Use apenas para se comunicar com as pessoas.
        </div>
      </div>
      ${btnRow({ nextLabel: 'Entendi', feedback: 'tap' })}
    </div>
  `,

  'tools': () => `
    <div class="screen">
      <span class="phase-badge phase-badge--2">Missão 2: Ferramentas</span>
      <h2 class="screen__title">Seus novos recursos</h2>
      <ul class="feature-list">
        <li class="feature-list__item">
          <span class="feature-list__icon">📝</span>
          <div class="feature-list__content">
            <div class="feature-list__name">Google Workspace</div>
            <div class="feature-list__desc">Docs, Planilhas, Agenda e Meet.</div>
          </div>
        </li>
        <li class="feature-list__item">
          <span class="feature-list__icon">💬</span>
          <div class="feature-list__content">
            <div class="feature-list__name">Google Chat</div>
            <div class="feature-list__desc">Nosso canal interno oficial.</div>
          </div>
        </li>
        <li class="feature-list__item">
          <span class="feature-list__icon">🌐</span>
          <div class="feature-list__content">
            <div class="feature-list__name">Grupo "Ágora"</div>
            <div class="feature-list__desc">Fórum para assuntos diversos da equipe.</div>
          </div>
        </li>
        <li class="feature-list__item">
          <span class="feature-list__icon">📁</span>
          <div class="feature-list__content">
            <div class="feature-list__name">Drive "Nexo Opp Virtual"</div>
            <div class="feature-list__desc">Arquivos e atualizações gerais da empresa.</div>
          </div>
        </li>
        <li class="feature-list__item">
          <span class="feature-list__icon">📂</span>
          <div class="feature-list__content">
            <div class="feature-list__name">Seu Drive Exclusivo</div>
            <div class="feature-list__desc">Pasta só sua para troca de arquivos com a empresa.</div>
          </div>
        </li>
      </ul>
      ${btnRow({ nextLabel: 'Avançar', feedback: 'tap' })}
    </div>
  `,

  'privacy': () => `
    <div class="screen">
      <span class="phase-badge phase-badge--2">Missão 2: Ferramentas</span>
      <h2 class="screen__title">Pessoal vs. Trabalho</h2>
      <p class="screen__lead">
        Valorizamos sua privacidade. A regra é simples:
      </p>
      <div class="card card--accent">
        <div class="card__title">🏢 Espaço Opp+ (Trabalho)</div>
        <div class="card__text">
          Seu login <strong>${accessEmail()}</strong> é da empresa. Pode ser auditado. Use só para trabalhar.
        </div>
      </div>
      <div class="card card--info">
        <div class="card__title">🏠 Seu Espaço (Pessoal)</div>
        <div class="card__text">
          Seu e-mail <strong>${state.emailInput}</strong> é 100% seu. A empresa não tem acesso a ele.
        </div>
      </div>
      ${btnRow({ nextLabel: 'Combinado', feedback: 'tap' })}
    </div>
  `,

  'conduct': () => `
    <div class="screen">
      <span class="phase-badge phase-badge--2">Missão 2: Ferramentas</span>
      <h2 class="screen__title">Você nos representa</h2>
      <p class="screen__lead">
        Ao usar o e-mail <span class="text-highlight">${corpEmail()}</span>, você fala em nome do Grupo Opp+.
      </p>
      <ul class="feature-list">
        <li class="feature-list__item">
          <span class="feature-list__icon">🤝</span>
          <div class="feature-list__content">
            <div class="feature-list__name">Mantenha o tom profissional.</div>
          </div>
        </li>
        <li class="feature-list__item">
          <span class="feature-list__icon">📝</span>
          <div class="feature-list__content">
            <div class="feature-list__name">Suas ações nos sistemas são registradas.</div>
          </div>
        </li>
        <li class="feature-list__item">
          <span class="feature-list__icon">🏢</span>
          <div class="feature-list__content">
            <div class="feature-list__name">Arquivos criados aqui pertencem à empresa.</div>
          </div>
        </li>
      </ul>
      ${btnRow({ nextLabel: 'Certo!', feedback: 'tap' })}
    </div>
  `,

  'security': () => `
    <div class="screen">
      <span class="phase-badge phase-badge--2">Missão 2: Ferramentas</span>
      <h2 class="screen__title">Regras de Ouro</h2>
      <p class="screen__lead">
        Proteja você e a empresa:
      </p>
      <ul class="feature-list">
        <li class="feature-list__item">
          <span class="feature-list__icon">🔒</span>
          <div class="feature-list__content">
            <div class="feature-list__name">Ative o 2FA</div>
            <div class="feature-list__desc">A verificação em duas etapas é obrigatória.</div>
          </div>
        </li>
        <li class="feature-list__item">
          <span class="feature-list__icon">🚫</span>
          <div class="feature-list__content">
            <div class="feature-list__name">Senha é secreta</div>
            <div class="feature-list__desc">Nunca passe sua senha para ninguém.</div>
          </div>
        </li>
        <li class="feature-list__item">
          <span class="feature-list__icon">📱</span>
          <div class="feature-list__content">
            <div class="feature-list__name">Perdeu o celular?</div>
            <div class="feature-list__desc">Avise a TI imediatamente.</div>
          </div>
        </li>
      </ul>
      ${btnRow({ nextLabel: 'Serei um guardião', feedback: 'tap' })}
    </div>
  `,

  'terms': () => `
    <div class="screen">
      <span class="phase-badge phase-badge--2">Missão 2: Finalizando</span>
      <h2 class="screen__title">Tudo certo?</h2>
      <p class="screen__lead">
        Marque a caixa abaixo para liberar a configuração do seu e-mail no celular.
      </p>
      <label class="checkbox-group" id="terms-checkbox">
        <input
          type="checkbox"
          class="checkbox-group__input"
          id="terms-check"
          ${state.termsAccepted ? 'checked' : ''}
        />
        <span class="checkbox-group__label">
          Eu, <strong>${fullName()}</strong>, entendi como usar meus e-mails, conheço minhas ferramentas (Nexo, Drive Exclusivo, Grupo Ágora) e aceito as regras de segurança e privacidade.
        </span>
      </label>
      ${btnRow({ nextLabel: 'Desbloquear Missão 3 🔓', nextDisabled: !state.termsAccepted, feedback: 'mission' })}
    </div>
  `,

  // ─── MISSÃO 3: CONFIGURANDO O CELULAR ───────────────────

  'smtp-intro': () => `
    <div class="screen">
      <span class="phase-badge phase-badge--3">Missão 3: Celular</span>
      <h2 class="screen__title">Hora de conectar 📱</h2>
      <p class="screen__lead">
        Vamos configurar seu app do Gmail pessoal para enviar e-mails em nome da Opp+.
      </p>
      <p class="screen__text" style="font-weight:var(--font-weight-semibold);color:var(--color-text-primary);">
        Tenha em mãos:
      </p>
      <ul class="feature-list">
        <li class="feature-list__item">
          <span class="feature-list__icon">1️⃣</span>
          <div class="feature-list__content">
            <div class="feature-list__name">Seu celular com o Gmail aberto.</div>
          </div>
        </li>
        <li class="feature-list__item">
          <span class="feature-list__icon">2️⃣</span>
          <div class="feature-list__content">
            <div class="feature-list__name">A Senha de Aplicativo</div>
            <div class="feature-list__desc">Código de 16 letras que a TI enviou.</div>
          </div>
        </li>
      </ul>
      ${btnRow({ nextLabel: 'Iniciar passo a passo', feedback: 'mission' })}
    </div>
  `,

  'smtp-1': () => smtpStep(1, 'Abra o Gmail',
    `No seu celular, abra o aplicativo do Gmail. Fique logado na sua conta pessoal (<strong>${state.emailInput}</strong>).`,
    'Já abri ✓', SMTP_ILLUSTRATIONS[1]()),

  'smtp-2': () => smtpStep(2, 'Vá em Configurações',
    `Toque no menu (três linhas ☰) > "<strong>Configurações</strong>" > Toque na sua conta pessoal (<strong>${state.emailInput}</strong>).`,
    'Feito ✓', SMTP_ILLUSTRATIONS[2]()),

  'smtp-3': () => smtpStep(3, 'Adicionar conta',
    `Procure e toque na opção "<strong>Adicionar outro endereço de e-mail</strong>" ou "<strong>Enviar e-mail como</strong>".`,
    'Achei ✓', SMTP_ILLUSTRATIONS[3]()),

  'smtp-4': () => `
    <div class="screen">
      <span class="phase-badge phase-badge--3">Passo 4 de 9</span>
      <div class="step-instruction">
        <div class="step-instruction__number">4</div>
        <div class="step-instruction__action">Preencha seus dados</div>
      </div>
      <div class="card card--accent">
        <div class="card__title">Nome</div>
        <div class="step-instruction__value">${fullName()} | Grupo Opp+</div>
      </div>
      <div class="card card--accent">
        <div class="card__title">E-mail</div>
        <div class="step-instruction__value">${corpEmail()}</div>
      </div>
      ${btnRow({ nextLabel: 'Preenchido ✓', nextClass: 'btn--done', feedback: 'step' })}
    </div>
  `,

  'smtp-5': () => smtpStep(5, 'Atenção 🛑',
    `Se aparecer a opção "<strong>Tratar como um alias</strong>", <strong>DESMARQUE-A</strong>. <em>(Se não aparecer, é só avançar).</em>`,
    'Desmarcado ✓', SMTP_ILLUSTRATIONS[5]()),

  'smtp-6': () => `
    <div class="screen">
      <span class="phase-badge phase-badge--3">Passo 6 de 9</span>
      <div class="step-instruction">
        <div class="step-instruction__number">6</div>
        <div class="step-instruction__action">Dados do Servidor</div>
      </div>
      <div class="card card--accent">
        <div class="card__title">Servidor SMTP</div>
        <div class="step-instruction__value">smtp.gmail.com</div>
      </div>
      <div class="card card--accent">
        <div class="card__title">Porta</div>
        <div class="step-instruction__value">465</div>
      </div>
      <div class="card card--accent">
        <div class="card__title">Segurança</div>
        <div class="card__text">Marque "<strong>Conexão segura usando SSL</strong>"</div>
      </div>
      <div class="smtp-illustration">${SMTP_ILLUSTRATIONS[6]()}</div>
      ${btnRow({ nextLabel: 'Copiado ✓', nextClass: 'btn--done', feedback: 'step' })}
    </div>
  `,

  'smtp-7': () => `
    <div class="screen">
      <span class="phase-badge phase-badge--3">Passo 7 de 9</span>
      <div class="step-instruction">
        <div class="step-instruction__number">7</div>
        <div class="step-instruction__action">Usuário</div>
        <div class="step-instruction__detail">Em "Nome de usuário", <strong>NÃO</strong> use seu e-mail. Digite:</div>
        <div class="step-instruction__value">opp@grupooppmais.com.br</div>
      </div>
      ${btnRow({ nextLabel: 'Feito ✓', nextClass: 'btn--done', feedback: 'step' })}
    </div>
  `,

  'smtp-8': () => `
    <div class="screen">
      <span class="phase-badge phase-badge--3">Passo 8 de 9</span>
      <div class="step-instruction">
        <div class="step-instruction__number">8</div>
        <div class="step-instruction__action">A Senha de 16 letras</div>
        <div class="step-instruction__detail">
          No campo "Senha", cole a senha de aplicativo de 16 letras que a TI te enviou (tudo junto, sem espaços). Toque em "<strong>Adicionar</strong>".
        </div>
      </div>
      ${btnRow({ nextLabel: 'Adicionado ✓', nextClass: 'btn--done', feedback: 'step' })}
    </div>
  `,

  'smtp-9': () => `
    <div class="screen">
      <span class="phase-badge phase-badge--3">Passo 9 de 9</span>
      <div class="step-instruction">
        <div class="step-instruction__number">9</div>
        <div class="step-instruction__action">Confirmação Final</div>
      </div>
      <div class="card card--accent">
        <div class="card__title">1. Código de confirmação</div>
        <div class="card__text">
          O Google enviou um código para <strong>${state.emailInput}</strong>. Copie lá e cole aqui.
        </div>
      </div>
      <div class="card card--accent">
        <div class="card__title">2. Responder pelo mesmo endereço</div>
        <div class="card__text">
          Nas configurações, marque: "<strong>Responder pelo mesmo endereço para o qual a mensagem foi enviada</strong>".
        </div>
      </div>
      <div class="smtp-illustration">${SMTP_ILLUSTRATIONS[9]()}</div>
      ${btnRow({ nextLabel: 'Concluir! 🎉', nextClass: 'btn--done', feedback: 'celebration' })}
    </div>
  `,

  // ─── MISSÃO 4: FINALIZAÇÃO ──────────────────────────────

  'celebration': () => `
    <div class="screen screen--center">
      <div class="celebration">
        <div class="celebration__icon">🏆</div>
        <h2 class="celebration__title">Parabéns, ${firstName()}!</h2>
        <p class="celebration__text">
          Tudo pronto! Seus acessos aos Drives (Nexo e Exclusivo) e ao Grupo Ágora estão totalmente liberados.
        </p>
        <div class="divider divider--center"></div>
      </div>
      ${btnRow({ nextLabel: 'Compartilhar sua opinião', showBack: false, feedback: 'tap' })}
    </div>
  `,

  'feedback': () => {
    const fb = state.feedback;
    function scaleHtml(qKey, label, leftHint, rightHint) {
      return `
        <div class="feedback-question">
          <label class="feedback-question__label">${label}</label>
          <div class="feedback-scale" data-question="${qKey}">
            ${[1,2,3,4,5].map(n => `
              <button class="feedback-scale__btn ${fb[qKey] === n ? 'feedback-scale__btn--selected' : ''}"
                onclick="setFeedback('${qKey}', ${n})">${n}</button>
            `).join('')}
          </div>
          <div class="feedback-scale__labels">
            <span class="feedback-scale__hint">${leftHint}</span>
            <span class="feedback-scale__hint">${rightHint}</span>
          </div>
        </div>
      `;
    }
    const allAnswered = fb.q1 && fb.q2 && fb.q3 && fb.q4 && fb.q5;
    return `
      <div class="screen">
        <span class="phase-badge phase-badge--4">Sua Opinião</span>
        <h2 class="screen__title">Queremos te ouvir!</h2>
        <p class="screen__lead">Ajude a gente a melhorar. Suas respostas são anônimas e levam menos de 1 minuto.</p>

        ${scaleHtml('q1', '1. Antes da Opp+, você já usava ferramentas Google (Gmail, Drive, Docs) no dia a dia?', 'Nunca usei', 'Uso diariamente')}
        ${scaleHtml('q2', '2. Como você avalia a aparência e a facilidade de uso deste aplicativo?', 'Muito ruim', 'Excelente')}
        ${scaleHtml('q3', '3. A diferença entre seu email de acesso e seu email corporativo ficou clara?', 'Nada claro', 'Totalmente claro')}
        ${scaleHtml('q4', '4. A configuração do SMTP foi...', 'Muito difícil', 'Muito fácil')}
        ${scaleHtml('q5', '5. Depois deste processo, você se sente preparado(a) para usar suas ferramentas digitais?', 'Nada preparado', 'Totalmente preparado')}

        <div class="feedback-question">
          <label class="feedback-question__label">6. Tem algo que ficou confuso ou que poderia ser explicado melhor? Qual modo visual preferiu?</label>
          <textarea id="feedback-text" class="feedback-textarea"
            placeholder="Opcional — escreva aqui..."
            oninput="setFeedbackText(this.value)">${fb.q6}</textarea>
        </div>

        ${state.feedbackSent ? `
          <div class="feedback-sent">
            <div class="feedback-sent__icon">✅</div>
            <div class="feedback-sent__text">Obrigado pelo seu feedback!</div>
          </div>
        ` : ''}

        ${btnRow({
          nextLabel: state.feedbackSent ? 'Ver meu painel' : 'Enviar e continuar',
          nextDisabled: !allAnswered,
          nextAction: 'submitFeedback()',
          feedback: '',
        })}
      </div>
    `;
  },

  'summary': () => `
    <div class="screen">
      <span class="phase-badge phase-badge--4">Ativo</span>
      <h2 class="screen__title">Resumo de Acessos</h2>

      <div class="card card--accent">
        <div class="card__title">${logoImg('summary__logo-img', 'diamante')}</div>
      </div>

      <div class="summary-table">
        <div class="summary-row">
          <span class="summary-row__label">Tripulante</span>
          <span class="summary-row__value">${fullName()}</span>
        </div>
        <div class="summary-row">
          <span class="summary-row__label">Login</span>
          <span class="summary-row__value">${accessEmail()}</span>
        </div>
        <div class="summary-row">
          <span class="summary-row__label">E-mail</span>
          <span class="summary-row__value" style="color:var(--color-primary)">${corpEmail()}</span>
        </div>
        <div class="summary-row">
          <span class="summary-row__label">Status</span>
          <span class="summary-row__value" style="color:var(--color-success)">Ativo ✓</span>
        </div>
      </div>

      <h3 class="screen__title" style="font-size:var(--font-size-lg);margin-top:var(--space-5);">Atalhos Rápidos</h3>
      <ul class="feature-list">
        <li class="feature-list__item">
          <a href="https://drive.google.com" target="_blank" rel="noopener" class="feature-list__link">
            <span class="feature-list__icon">📁</span>
            <div class="feature-list__content">
              <div class="feature-list__name">Google Drive</div>
              <div class="feature-list__desc">Abrir no navegador →</div>
            </div>
          </a>
        </li>
        <li class="feature-list__item">
          <a href="https://chat.google.com" target="_blank" rel="noopener" class="feature-list__link">
            <span class="feature-list__icon">💬</span>
            <div class="feature-list__content">
              <div class="feature-list__name">Google Chat</div>
              <div class="feature-list__desc">Abrir no navegador →</div>
            </div>
          </a>
        </li>
        <li class="feature-list__item">
          <a href="https://groups.google.com" target="_blank" rel="noopener" class="feature-list__link">
            <span class="feature-list__icon">📧</span>
            <div class="feature-list__content">
              <div class="feature-list__name">Grupo Ágora</div>
              <div class="feature-list__desc">Abrir no navegador →</div>
            </div>
          </a>
        </li>
        <li class="feature-list__item">
          <a href="mailto:agora@grupooppmais.com.br" class="feature-list__link">
            <span class="feature-list__icon">✉️</span>
            <div class="feature-list__content">
              <div class="feature-list__name">E-mail do Grupo Ágora</div>
              <div class="feature-list__desc">agora@grupooppmais.com.br →</div>
            </div>
          </a>
        </li>
      </ul>

      <div class="card card--info" style="margin-top:var(--space-4)">
        <div class="card__title">Dúvidas?</div>
        <div class="card__text">Fale com a TI pelo Chat ou envie para agora@grupooppmais.com.br</div>
      </div>

      <div class="btn-row">
        <button class="btn btn--secondary" onclick="restart()">Voltar ao Início</button>
      </div>
    </div>
  `,
};

// ═══════════════════════════════════════════════════════════════
// CONFETTI
// ═══════════════════════════════════════════════════════════════

function launchConfetti() {
  const canvas = document.createElement('canvas');
  canvas.className = 'confetti-canvas';
  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const COLORS = ['#219653', '#6FCF97', '#F2C94C', '#2F80ED', '#A5D6A7', '#00D26A'];
  const pieces = Array.from({ length: 80 }, () => ({
    x: Math.random() * canvas.width,
    y: -10 - Math.random() * canvas.height * 0.5,
    w: 6 + Math.random() * 6,
    h: 4 + Math.random() * 4,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    vx: (Math.random() - 0.5) * 3,
    vy: 2 + Math.random() * 4,
    rot: Math.random() * Math.PI * 2,
    vr: (Math.random() - 0.5) * 0.2,
  }));

  let frame = 0;
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let alive = false;
    for (const p of pieces) {
      p.x += p.vx;
      p.y += p.vy;
      p.rot += p.vr;
      p.vy += 0.05;
      if (p.y < canvas.height + 20) alive = true;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
    }
    frame++;
    if (alive && frame < 180) {
      requestAnimationFrame(draw);
    } else {
      canvas.remove();
    }
  }
  requestAnimationFrame(draw);
}

// ═══════════════════════════════════════════════════════════════
// RENDER
// ═══════════════════════════════════════════════════════════════

function render() {
  const screen = SCREENS[state.currentScreen];
  const renderer = screenRenderers[screen.id];

  if (!renderer) {
    app.innerHTML = `<div class="screen screen--center"><p>Tela não encontrada: ${screen.id}</p></div>`;
    return;
  }

  app.innerHTML = renderHeader() + renderer();
  bindScreenEvents(screen.id);

  if (screen.id === 'celebration') {
    launchConfetti();
    feedbackCelebration();
  }

  window.scrollTo(0, 0);
}

// ═══════════════════════════════════════════════════════════════
// EVENT BINDINGS
// ═══════════════════════════════════════════════════════════════

function bindScreenEvents(screenId) {

  if (screenId === 'email-input') {
    const input = document.getElementById('user-email');
    const btn = document.getElementById('btn-next');
    if (input) {
      input.focus();
      input.addEventListener('input', (e) => {
        state.emailInput = e.target.value.trim();
        state.lookupError = '';
        if (btn) btn.disabled = !state.emailInput;
      });
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && state.emailInput) handleEmailSubmit();
      });
    }
  }

  if (screenId === 'terms') {
    const checkbox = document.getElementById('terms-check');
    const btn = document.getElementById('btn-next');
    if (checkbox) {
      checkbox.addEventListener('change', (e) => {
        state.termsAccepted = e.target.checked;
        saveState();
        if (btn) btn.disabled = !state.termsAccepted;
        if (state.termsAccepted) feedbackSuccess();
      });
    }
  }

  const copyValues = document.querySelectorAll('.step-instruction__value');
  copyValues.forEach(el => {
    el.addEventListener('click', () => {
      const text = el.textContent.trim();
      navigator.clipboard.writeText(text).then(() => {
        const original = el.textContent;
        el.textContent = 'Copiado! ✓';
        el.style.color = 'var(--color-success)';
        haptic.tap();
        audio.step();
        setTimeout(() => {
          el.textContent = original;
          el.style.color = '';
        }, 1500);
      }).catch(() => {});
    });
  });
}

// ═══════════════════════════════════════════════════════════════
// EXPOSE GLOBALS
// ═══════════════════════════════════════════════════════════════

function setFeedback(key, value) {
  state.feedback[key] = value;
  saveState();
  haptic.tap();
  render();
}

function setFeedbackText(value) {
  state.feedback.q6 = value;
  saveState();
}

function submitFeedback() {
  if (state.feedbackSent) { next(); return; }
  const payload = {
    timestamp: new Date().toISOString(),
    userName: fullName(),
    userEmail: u().personalEmail || '',
    corporateEmail: corpEmail(),
    q1: state.feedback.q1 || '',
    q2: state.feedback.q2 || '',
    q3: state.feedback.q3 || '',
    q4: state.feedback.q4 || '',
    q5: state.feedback.q5 || '',
    q6: state.feedback.q6 || '',
  };
  fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain' },
    body: JSON.stringify(payload),
  }).catch(() => {});
  state.feedbackSent = true;
  saveState();
  feedbackSuccess();
  render();
}

window.next = next;
window.back = back;
window.restart = restart;
window.goTo = goTo;
window.handleEmailSubmit = handleEmailSubmit;
window.nextWithFeedback = nextWithFeedback;
window.setFeedback = setFeedback;
window.setFeedbackText = setFeedbackText;
window.submitFeedback = submitFeedback;
window.setTheme = setTheme;
window.toggleTheme = toggleTheme;

// ═══════════════════════════════════════════════════════════════
// PWA INSTALL
// ═══════════════════════════════════════════════════════════════

let deferredInstallPrompt = null;

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredInstallPrompt = e;
  showInstallBanner();
});

function showInstallBanner() {
  if (document.getElementById('install-banner')) return;
  const banner = document.createElement('div');
  banner.id = 'install-banner';
  banner.className = 'install-banner';
  banner.innerHTML = `
    <div class="install-banner__content">
      <img src="img/icon-192.png" alt="" class="install-banner__icon">
      <div class="install-banner__text">
        <strong>Instalar Minha Opp+</strong>
        <span>Acesse direto da tela inicial</span>
      </div>
    </div>
    <div class="install-banner__actions">
      <button class="install-banner__btn install-banner__btn--install" onclick="installPwa()">Instalar</button>
      <button class="install-banner__btn install-banner__btn--dismiss" onclick="dismissInstall()">Agora não</button>
    </div>
  `;
  document.body.appendChild(banner);
  requestAnimationFrame(() => banner.classList.add('install-banner--visible'));
}

function installPwa() {
  if (!deferredInstallPrompt) return;
  deferredInstallPrompt.prompt();
  deferredInstallPrompt.userChoice.then((result) => {
    deferredInstallPrompt = null;
    dismissInstall();
  });
}

function dismissInstall() {
  const banner = document.getElementById('install-banner');
  if (banner) {
    banner.classList.remove('install-banner--visible');
    setTimeout(() => banner.remove(), 300);
  }
}

window.installPwa = installPwa;
window.dismissInstall = dismissInstall;

// ═══════════════════════════════════════════════════════════════
// SERVICE WORKER
// ═══════════════════════════════════════════════════════════════

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js').catch(() => {});
}

// ═══════════════════════════════════════════════════════════════
// INIT
// ═══════════════════════════════════════════════════════════════

loadState();
loadUsers().then(() => render());
