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
  const base = variant || 'padrao';
  if (base === 'padrao' && currentTheme() === 'dark') return 'img/logo/logo-gopp-padrao-branca.png';
  return `img/logo/logo-gopp-${base}.png`;
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
  { id: 'smtp-10', mission: 3 },
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
  celebration: () => vibrate([100, 50, 100, 50, 150, 50, 100, 50, 300]),
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
  celebration: () => { playTone(523, 0.2); setTimeout(() => playTone(659, 0.2), 150); setTimeout(() => playTone(784, 0.2), 300); setTimeout(() => playTone(1047, 0.25, 'triangle'), 480); setTimeout(() => playTone(1319, 0.3, 'triangle'), 650); setTimeout(() => playTone(1568, 0.5, 'triangle'), 850); },
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
    const res = await fetch(`${API_URL}?t=${Date.now()}`);
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
const fullName = () => u().name || 'Colaborador';
const userRole = () => u().role || '';

function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    const toast = document.createElement('div');
    toast.className = 'copy-toast';
    toast.textContent = 'Copiado!';
    document.body.appendChild(toast);
    vibrate(30);
    setTimeout(() => toast.remove(), 1600);
  }).catch(() => {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    ta.remove();
    const toast = document.createElement('div');
    toast.className = 'copy-toast';
    toast.textContent = 'Copiado!';
    document.body.appendChild(toast);
    vibrate(30);
    setTimeout(() => toast.remove(), 1600);
  });
}

function copyableValue(text) {
  return `<div class="step-instruction__value copyable" onclick="copyToClipboard('${text}')">${text}</div><div class="copy-hint">toque para copiar</div>`;
}

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
      <span class="phase-badge phase-badge--3">Passo ${num} de 10</span>
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
    height: 160,
    render: (c) => `
      <rect x="0" y="0" width="320" height="40" fill="${c.cardBg}" stroke="${c.border}"/>
      <circle cx="18" cy="20" r="8" fill="#4285f4"/>
      <circle cx="18" cy="20" r="5" fill="#ea4335"/>
      <circle cx="18" cy="20" r="2" fill="#fbbc05"/>
      <rect x="36" y="10" width="230" height="20" rx="10" fill="${c.highlight}" stroke="${c.highlightBorder}" stroke-width="1.5"/>
      <text x="46" y="24" font-size="11" fill="${c.accent}" font-weight="600" font-family="monospace">mail.google.com</text>
      <circle cx="290" cy="20" r="3" fill="${c.textSec}"/>
      <circle cx="290" cy="14" r="3" fill="${c.textSec}"/>
      <circle cx="290" cy="26" r="3" fill="${c.textSec}"/>
      <rect x="0" y="40" width="320" height="120" fill="${c.cardBg}"/>
      <text x="20" y="70" font-size="14" fill="${c.textPri}" font-weight="700" font-family="sans-serif">Gmail</text>
      <text x="20" y="90" font-size="11" fill="${c.textSec}" font-family="sans-serif">Logado como: ${c.textSec === '#b0b0b0' ? 'seu.email' : 'seu.email'}@gmail.com</text>
      <rect x="20" y="105" width="280" height="36" rx="6" fill="${c.highlight}" stroke="${c.highlightBorder}" stroke-width="1.5"/>
      <text x="85" y="128" font-size="11" fill="${c.accent}" font-weight="600" font-family="sans-serif">👆 Acesse este endereço</text>
    `
  }),

  2: () => gmailMockup({
    height: 260,
    render: (c) => `
      <rect x="0" y="0" width="320" height="40" fill="${c.cardBg}" stroke="${c.border}"/>
      <text x="14" y="25" font-size="11" fill="${c.textSec}" font-family="monospace">mail.google.com</text>
      <rect x="275" y="10" width="30" height="20" rx="4" fill="${c.highlight}" stroke="${c.highlightBorder}" stroke-width="2"/>
      <circle cx="290" cy="16" r="2" fill="${c.accent}"/>
      <circle cx="290" cy="20" r="2" fill="${c.accent}"/>
      <circle cx="290" cy="24" r="2" fill="${c.accent}"/>
      <line x1="290" y1="30" x2="250" y2="55" stroke="${c.highlightBorder}" stroke-width="2" stroke-dasharray="4"/>
      <text x="195" y="52" font-size="10" fill="${c.accent}" font-weight="600" font-family="sans-serif">👆 Toque aqui</text>
      <rect x="160" y="60" width="150" height="180" rx="8" fill="${c.cardBg}" stroke="${c.border}" stroke-width="1.5"/>
      <text x="175" y="82" font-size="11" fill="${c.textSec}" font-family="sans-serif">Nova guia</text>
      <text x="175" y="102" font-size="11" fill="${c.textSec}" font-family="sans-serif">Nova guia anônima</text>
      <text x="175" y="122" font-size="11" fill="${c.textSec}" font-family="sans-serif">Favoritos</text>
      <text x="175" y="142" font-size="11" fill="${c.textSec}" font-family="sans-serif">Downloads</text>
      <rect x="165" y="152" width="140" height="1" fill="${c.border}"/>
      <rect x="168" y="160" width="138" height="28" rx="4" fill="${c.highlight}" stroke="${c.highlightBorder}" stroke-width="2"/>
      <rect x="178" y="169" width="14" height="14" rx="2" fill="${c.cardBg}" stroke="${c.accent}" stroke-width="1.5"/>
      <text x="181" y="180" font-size="8" fill="${c.accent}" font-family="sans-serif">✓</text>
      <text x="198" y="179" font-size="11" fill="${c.accent}" font-weight="700" font-family="sans-serif">Site p/ computador</text>
      <text x="175" y="210" font-size="11" fill="${c.textSec}" font-family="sans-serif">Configurações</text>
      <text x="175" y="230" font-size="11" fill="${c.textSec}" font-family="sans-serif">Ajuda</text>
    `
  }),

  3: () => gmailMockup({
    height: 200,
    render: (c) => `
      <rect x="0" y="0" width="320" height="40" fill="${c.cardBg}" stroke="${c.border}"/>
      <text x="14" y="25" font-size="11" fill="${c.textSec}" font-family="sans-serif">Gmail — Caixa de entrada</text>
      <rect x="250" y="8" width="28" height="28" rx="14" fill="${c.highlight}" stroke="${c.highlightBorder}" stroke-width="2"/>
      <text x="258" y="27" font-size="14" fill="${c.accent}" font-family="sans-serif">⚙</text>
      <line x1="264" y1="36" x2="264" y2="60" stroke="${c.highlightBorder}" stroke-width="2" stroke-dasharray="4"/>
      <text x="210" y="56" font-size="10" fill="${c.accent}" font-weight="600" font-family="sans-serif">👆 Primeiro aqui</text>
      <rect x="0" y="70" width="320" height="44" fill="${c.cardBg}" stroke="${c.border}"/>
      <text x="20" y="88" font-size="11" fill="${c.textSec}" font-family="sans-serif">Configurações rápidas</text>
      <rect x="20" y="100" width="280" height="30" rx="6" fill="${c.highlight}" stroke="${c.highlightBorder}" stroke-width="2"/>
      <text x="55" y="120" font-size="12" fill="${c.accent}" font-weight="700" font-family="sans-serif">Ver todas as configurações</text>
      <line x1="160" y1="130" x2="160" y2="155" stroke="${c.highlightBorder}" stroke-width="2" stroke-dasharray="4"/>
      <text x="105" y="170" font-size="11" fill="${c.accent}" font-weight="600" font-family="sans-serif">👆 Depois aqui</text>
    `
  }),

  4: () => gmailMockup({
    height: 250,
    render: (c) => `
      <rect x="0" y="0" width="320" height="36" fill="${c.cardBg}" stroke="${c.border}"/>
      <text x="10" y="24" font-size="10" fill="${c.textSec}" font-family="sans-serif">Geral</text>
      <text x="50" y="24" font-size="10" fill="${c.textSec}" font-family="sans-serif">Marcadores</text>
      <rect x="112" y="2" width="110" height="32" rx="4" fill="${c.highlight}" stroke="${c.highlightBorder}" stroke-width="2"/>
      <text x="118" y="24" font-size="10" fill="${c.accent}" font-weight="700" font-family="sans-serif">Contas e importação</text>
      <text x="230" y="24" font-size="10" fill="${c.textSec}" font-family="sans-serif">Filtros</text>
      <rect x="0" y="36" width="320" height="214" fill="${c.cardBg}"/>
      <text x="16" y="62" font-size="11" fill="${c.textSec}" font-weight="600" font-family="sans-serif">Enviar e-mail como:</text>
      <rect x="16" y="72" width="290" height="30" rx="4" fill="${c.cardBg}" stroke="${c.border}"/>
      <text x="26" y="92" font-size="11" fill="${c.textSec}" font-family="sans-serif">seu.email@gmail.com</text>
      <text x="200" y="92" font-size="10" fill="${c.textSec}" font-family="sans-serif">editar | excluir</text>
      <rect x="16" y="112" width="290" height="36" rx="6" fill="${c.highlight}" stroke="${c.highlightBorder}" stroke-width="2"/>
      <text x="30" y="135" font-size="12" fill="${c.accent}" font-weight="700" font-family="sans-serif">Adicionar outro endereço de e-mail</text>
      <line x1="160" y1="148" x2="160" y2="175" stroke="${c.highlightBorder}" stroke-width="2" stroke-dasharray="4"/>
      <text x="110" y="190" font-size="11" fill="${c.accent}" font-weight="600" font-family="sans-serif">👆 Clique aqui</text>
      <rect x="16" y="200" width="290" height="1" fill="${c.border}"/>
      <text x="16" y="220" font-size="11" fill="${c.textSec}" font-weight="600" font-family="sans-serif">Conceder acesso à sua conta:</text>
      <text x="16" y="240" font-size="10" fill="${c.textSec}" font-family="sans-serif">Ninguém tem acesso à sua conta no momento</text>
    `
  }),

  5: () => gmailMockup({
    height: 240,
    render: (c) => `
      <rect x="20" y="10" width="280" height="220" rx="8" fill="#FFF9C4" stroke="#F9A825" stroke-width="2"/>
      <rect x="20" y="10" width="280" height="36" rx="8" fill="#F9A825"/>
      <rect x="20" y="30" width="280" height="16" fill="#F9A825"/>
      <text x="40" y="34" font-size="13" fill="white" font-weight="700" font-family="sans-serif">Adicionar outro endereço de e-mail</text>
      <text x="30" y="68" font-size="11" fill="#5D4037" font-family="sans-serif">Endereço de e-mail:</text>
      <rect x="30" y="76" width="260" height="28" rx="4" fill="white" stroke="${c.highlightBorder}" stroke-width="2"/>
      <text x="40" y="95" font-size="11" fill="${c.accent}" font-weight="600" font-family="monospace">seu-email@grupooppmais.com.br</text>
      <text x="30" y="124" font-size="11" fill="#5D4037" font-family="sans-serif">Nome:</text>
      <rect x="30" y="132" width="260" height="28" rx="4" fill="white" stroke="${c.highlightBorder}" stroke-width="2"/>
      <text x="40" y="151" font-size="11" fill="${c.accent}" font-weight="600" font-family="sans-serif">Seu Nome | Grupo Opp+</text>
      <rect x="30" y="180" width="120" height="32" rx="6" fill="${c.accent}"/>
      <text x="48" y="201" font-size="12" fill="white" font-weight="600" font-family="sans-serif">Próxima etapa</text>
    `
  }),

  6: () => gmailMockup({
    height: 200,
    render: (c) => `
      <rect x="20" y="10" width="280" height="180" rx="8" fill="#FFF9C4" stroke="#F9A825" stroke-width="2"/>
      <rect x="20" y="10" width="280" height="36" rx="8" fill="#F9A825"/>
      <rect x="20" y="30" width="280" height="16" fill="#F9A825"/>
      <text x="80" y="34" font-size="13" fill="white" font-weight="700" font-family="sans-serif">Próxima etapa</text>
      <rect x="35" y="60" width="250" height="48" rx="6" fill="#ff6b6b22" stroke="#FF6B6B" stroke-width="2"/>
      <rect x="50" y="72" width="16" height="16" rx="3" fill="white" stroke="#FF6B6B" stroke-width="2"/>
      <text x="53" y="84" font-size="9" fill="#FF6B6B" font-family="sans-serif">✗</text>
      <text x="74" y="82" font-size="11" fill="#5D4037" font-family="sans-serif">Tratar como um alias</text>
      <text x="74" y="98" font-size="9" fill="#FF6B6B" font-weight="600" font-family="sans-serif">⚠ DESMARQUE esta opção!</text>
      <rect x="35" y="124" width="120" height="32" rx="6" fill="${c.accent}"/>
      <text x="53" y="145" font-size="12" fill="white" font-weight="600" font-family="sans-serif">Próxima etapa</text>
      <text x="60" y="175" font-size="10" fill="${c.textSec}" font-style="italic" font-family="sans-serif">Se não aparecer, apenas avance</text>
    `
  }),

  7: () => gmailMockup({
    height: 260,
    render: (c) => `
      <rect x="20" y="10" width="280" height="240" rx="8" fill="#FFF9C4" stroke="#F9A825" stroke-width="2"/>
      <rect x="20" y="10" width="280" height="36" rx="8" fill="#F9A825"/>
      <rect x="20" y="30" width="280" height="16" fill="#F9A825"/>
      <text x="65" y="34" font-size="13" fill="white" font-weight="700" font-family="sans-serif">Servidor SMTP</text>
      <text x="35" y="68" font-size="10" fill="#5D4037" font-weight="600" font-family="sans-serif">Servidor SMTP</text>
      <rect x="35" y="76" width="250" height="26" rx="4" fill="white" stroke="${c.highlightBorder}" stroke-width="1.5"/>
      <text x="45" y="94" font-size="11" fill="${c.accent}" font-weight="700" font-family="monospace">smtp.gmail.com</text>
      <text x="35" y="120" font-size="10" fill="#5D4037" font-weight="600" font-family="sans-serif">Porta</text>
      <rect x="35" y="128" width="80" height="26" rx="4" fill="white" stroke="${c.highlightBorder}" stroke-width="1.5"/>
      <text x="45" y="146" font-size="11" fill="${c.accent}" font-weight="700" font-family="monospace">465</text>
      <text x="35" y="172" font-size="10" fill="#5D4037" font-weight="600" font-family="sans-serif">Conexão</text>
      <rect x="35" y="180" width="250" height="26" rx="4" fill="${c.highlight}" stroke="${c.highlightBorder}" stroke-width="1.5"/>
      <rect x="45" y="187" width="14" height="14" rx="7" fill="${c.accent}"/>
      <circle cx="52" cy="194" r="3" fill="white"/>
      <text x="66" y="198" font-size="10" fill="${c.accent}" font-weight="600" font-family="sans-serif">Conexão protegida usando SSL</text>
      <rect x="35" y="218" width="120" height="24" rx="6" fill="${c.accent}"/>
      <text x="55" y="235" font-size="11" fill="white" font-weight="600" font-family="sans-serif">Adicionar conta</text>
    `
  }),

  8: () => gmailMockup({
    height: 230,
    render: (c) => `
      <rect x="20" y="10" width="280" height="210" rx="8" fill="#FFF9C4" stroke="#F9A825" stroke-width="2"/>
      <rect x="20" y="10" width="280" height="36" rx="8" fill="#F9A825"/>
      <rect x="20" y="30" width="280" height="16" fill="#F9A825"/>
      <text x="55" y="34" font-size="13" fill="white" font-weight="700" font-family="sans-serif">Autenticação SMTP</text>
      <text x="35" y="68" font-size="10" fill="#5D4037" font-weight="600" font-family="sans-serif">Nome de usuário</text>
      <rect x="35" y="76" width="250" height="26" rx="4" fill="white" stroke="${c.highlightBorder}" stroke-width="1.5"/>
      <text x="45" y="94" font-size="11" fill="${c.accent}" font-weight="600" font-family="monospace">opp@grupooppmais.com.br</text>
      <text x="35" y="120" font-size="10" fill="#5D4037" font-weight="600" font-family="sans-serif">Senha (Chave de Integração)</text>
      <rect x="35" y="128" width="250" height="26" rx="4" fill="white" stroke="${c.highlightBorder}" stroke-width="1.5"/>
      <text x="45" y="146" font-size="11" fill="${c.accent}" font-weight="600" font-family="monospace">●●●● ●●●● ●●●● ●●●●</text>
      <text x="35" y="172" font-size="9" fill="#5D4037" font-style="italic" font-family="sans-serif">Os 16 dígitos que a TI te enviou</text>
      <rect x="35" y="186" width="120" height="24" rx="6" fill="${c.accent}"/>
      <text x="55" y="203" font-size="11" fill="white" font-weight="600" font-family="sans-serif">Adicionar conta</text>
    `
  }),

  9: () => gmailMockup({
    height: 200,
    render: (c) => `
      <rect x="20" y="10" width="280" height="180" rx="8" fill="#FFF9C4" stroke="#F9A825" stroke-width="2"/>
      <rect x="20" y="10" width="280" height="36" rx="8" fill="#F9A825"/>
      <rect x="20" y="30" width="280" height="16" fill="#F9A825"/>
      <text x="80" y="34" font-size="13" fill="white" font-weight="700" font-family="sans-serif">Confirmação</text>
      <text x="35" y="68" font-size="11" fill="#5D4037" font-family="sans-serif">Código de confirmação enviado para</text>
      <text x="35" y="84" font-size="11" fill="${c.accent}" font-weight="600" font-family="sans-serif">seu.email@gmail.com</text>
      <text x="35" y="108" font-size="10" fill="#5D4037" font-weight="600" font-family="sans-serif">Código:</text>
      <rect x="35" y="116" width="180" height="28" rx="4" fill="white" stroke="${c.highlightBorder}" stroke-width="1.5"/>
      <text x="45" y="135" font-size="12" fill="${c.textSec}" font-family="monospace">cole o código aqui</text>
      <rect x="35" y="156" width="100" height="26" rx="6" fill="${c.accent}"/>
      <text x="55" y="174" font-size="11" fill="white" font-weight="600" font-family="sans-serif">Verificar</text>
    `
  }),

  10: () => gmailMockup({
    height: 220,
    render: (c) => `
      <rect x="0" y="0" width="320" height="36" fill="${c.cardBg}" stroke="${c.border}"/>
      <text x="118" y="24" font-size="10" fill="${c.accent}" font-weight="700" font-family="sans-serif">Contas e importação</text>
      <rect x="0" y="36" width="320" height="184" fill="${c.cardBg}"/>
      <text x="16" y="62" font-size="11" fill="${c.textSec}" font-weight="600" font-family="sans-serif">Enviar e-mail como:</text>
      <text x="16" y="82" font-size="10" fill="${c.textSec}" font-family="sans-serif">seu.email@gmail.com</text>
      <text x="16" y="98" font-size="10" fill="${c.accent}" font-weight="600" font-family="sans-serif">seu-email@grupooppmais.com.br</text>
      <rect x="16" y="110" width="290" height="1" fill="${c.border}"/>
      <text x="16" y="132" font-size="11" fill="${c.textSec}" font-weight="600" font-family="sans-serif">Ao responder uma mensagem:</text>
      <rect x="16" y="140" width="290" height="28" rx="4" fill="${c.cardBg}" stroke="${c.border}"/>
      <circle cx="30" cy="154" r="6" fill="${c.cardBg}" stroke="${c.textSec}" stroke-width="1.5"/>
      <text x="42" y="158" font-size="10" fill="${c.textSec}" font-family="sans-serif">Sempre responder do endereço padrão</text>
      <rect x="16" y="172" width="290" height="28" rx="4" fill="${c.highlight}" stroke="${c.highlightBorder}" stroke-width="2"/>
      <circle cx="30" cy="186" r="6" fill="${c.accent}"/>
      <circle cx="30" cy="186" r="3" fill="white"/>
      <text x="42" y="189" font-size="10" fill="${c.accent}" font-weight="600" font-family="sans-serif">Responder do mesmo endereço da mensagem</text>
      <text x="110" y="215" font-size="11" fill="${c.accent}" font-weight="600" font-family="sans-serif">👆 Marque esta opção</text>
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
      <h1 class="splash__title">Bem-vindo(a) à sua Opp Digital!</h1>
      <p class="splash__subtitle">Grupo Opp+ — Sua jornada começa aqui</p>
      <p class="splash__tagline">
        O Grupo Opp+ coloca à sua disposição um <strong>ambiente digital em nuvem</strong>, que poderá ser acessado de onde você estiver. Neste ambiente você terá um e-mail com <strong>@grupooppmais.com.br</strong>, um Drive (armário digital pessoal), acesso ao Drive compartilhado <strong>Nexo</strong> (armário comunitário) e ao grupo <strong>Ágora</strong> para discussões diversas (similar a uma praça pública onde todos se encontram para conversar). Tudo no celular ou computador.
      </p>
      <p class="splash__tagline" style="margin-top:var(--space-3)">
        A seguir, um guia rápido. Leia com muita atenção para que possa:
      </p>
      <ul class="feature-list" style="margin-bottom:var(--space-3)">
        <li class="feature-list__item">
          <span class="feature-list__icon">🔑</span>
          <div class="feature-list__content">
            <div class="feature-list__name">Receber seu acesso à nuvem e e-mail</div>
          </div>
        </li>
        <li class="feature-list__item">
          <span class="feature-list__icon">🧰</span>
          <div class="feature-list__content">
            <div class="feature-list__name">Conhecer ferramentas que agregam valor</div>
          </div>
        </li>
        <li class="feature-list__item">
          <span class="feature-list__icon">📲</span>
          <div class="feature-list__content">
            <div class="feature-list__name">Configurar o e-mail corporativo no celular</div>
          </div>
        </li>
      </ul>
      <p class="splash__tagline">
        <span class="text-warn">Importante:</span> este é um ambiente profissional. Tudo que você faz aqui representa o Grupo Opp+. Use com responsabilidade.
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
      <h2 class="screen__title">Seu e-mail profissional</h2>
      <p class="screen__lead">
        A partir de agora, você tem um e-mail do Grupo Opp+. Ele é a sua <strong>identidade digital</strong> dentro da empresa — é com ele que você faz login, envia mensagens e acessa todas as ferramentas.
      </p>
      <div class="card card--accent">
        <div class="card__title">💼 Seu e-mail corporativo</div>
        <div class="step-instruction__value">${corpEmail()}</div>
        <div class="card__text">
          Use para <strong>tudo</strong>: entrar no sistema, enviar e-mails profissionais, acessar o Drive, o Ágora e o Chat. É o seu endereço oficial.
        </div>
      </div>
      <div class="card card--info">
        <div class="card__title">📱 Seu e-mail pessoal continua seu</div>
        <div class="step-instruction__value">${state.emailInput}</div>
        <div class="card__text">
          A empresa <strong>não tem acesso</strong> ao seu e-mail pessoal. Ele é usado apenas para identificar você no cadastro.
        </div>
      </div>
      <p class="screen__text" style="margin-top:var(--space-3);font-style:italic;color:var(--color-text-secondary)">
        Resumindo: um e-mail para o trabalho, outro para a vida pessoal. Simples assim.
      </p>
      ${btnRow({ nextLabel: 'Entendi!', feedback: 'tap' })}
    </div>
  `,

  'tools': () => `
    <div class="screen">
      <span class="phase-badge phase-badge--2">Missão 2: Ferramentas</span>
      <h2 class="screen__title">O que temos em nosso ambiente digital?</h2>
      <p class="screen__lead">
        Este ambiente é dividido em algumas partes com ferramentas digitais que enriquecem e facilitam a nossa comunicação:
      </p>
      <ul class="feature-list">
        <li class="feature-list__item">
          <span class="feature-list__icon">🏛️</span>
          <div class="feature-list__content">
            <div class="feature-list__name">Ágora — O pátio de conversas</div>
            <div class="feature-list__desc">Como uma praça onde toda a equipe se encontra. Avisos, discussões e novidades ficam aqui. É o nosso mural.</div>
          </div>
        </li>
        <li class="feature-list__item">
          <span class="feature-list__icon">🗄️</span>
          <div class="feature-list__content">
            <div class="feature-list__name">Nexo — Os armários comunitários</div>
            <div class="feature-list__desc">Documentos, manuais e arquivos que todo mundo da equipe pode acessar. Tudo organizado em pastas compartilhadas.</div>
          </div>
        </li>
        <li class="feature-list__item">
          <span class="feature-list__icon">📂</span>
          <div class="feature-list__content">
            <div class="feature-list__name">Seu Drive Exclusivo — Seu armário pessoal</div>
            <div class="feature-list__desc">Uma pasta só sua, onde você e a empresa trocam arquivos de forma privada.</div>
          </div>
        </li>
        <li class="feature-list__item">
          <span class="feature-list__icon">💬</span>
          <div class="feature-list__content">
            <div class="feature-list__name">Google Chat — O WhatsApp do trabalho</div>
            <div class="feature-list__desc">Mensagens rápidas com colegas, sem misturar com seu WhatsApp pessoal.</div>
          </div>
        </li>
        <li class="feature-list__item">
          <span class="feature-list__icon">📝</span>
          <div class="feature-list__content">
            <div class="feature-list__name">Docs, Planilhas e Agenda</div>
            <div class="feature-list__desc">Crie documentos, planilhas e agende reuniões — tudo conectado ao seu e-mail.</div>
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
          Seu e-mail <strong>${corpEmail()}</strong> é da empresa. Pode ser auditado. Use só para trabalhar.
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
            <div class="feature-list__desc">A verificação em duas etapas é obrigatória. <a href="#" onclick="event.preventDefault();document.getElementById('modal-2fa').classList.add('modal--open')" style="color:var(--color-primary);text-decoration:underline;">Saiba mais</a></div>
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
      <div id="modal-2fa" class="modal" onclick="if(event.target===this)this.classList.remove('modal--open')">
        <div class="modal__content">
          <button class="modal__close" onclick="document.getElementById('modal-2fa').classList.remove('modal--open')">✕</button>
          <h3 class="modal__title">O que é 2FA?</h3>
          <p class="modal__text">
            <strong>2FA</strong> (autenticação em duas etapas) é uma camada extra de segurança. Além da senha, você confirma o acesso com um código enviado ao seu celular. Mesmo que alguém descubra sua senha, não conseguirá entrar sem o seu telefone.
          </p>
          <h4 class="modal__subtitle">Como ativar:</h4>
          <ol class="modal__list">
            <li>Acesse <a href="https://myaccount.google.com/security" target="_blank" rel="noopener" style="color:var(--color-primary)">myaccount.google.com/security</a></li>
            <li>Na seção "Como fazer login", clique em "Verificação em duas etapas"</li>
            <li>Siga as instruções na tela (vai pedir seu número de celular)</li>
          </ol>
          <p class="modal__text" style="margin-top:var(--space-3);font-style:italic;color:var(--color-text-secondary)">
            A TI pode ajudar com a ativação caso precise.
          </p>
        </div>
      </div>
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
          Eu, <strong>${fullName()}</strong>, entendi como usar meu e-mail corporativo, conheço minhas ferramentas (Nexo, Drive Exclusivo, Grupo Ágora) e aceito as regras de segurança e privacidade.
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
        Agora vamos fazer o seu Gmail pessoal enviar e-mails com o endereço <strong>${corpEmail()}</strong>. Assim você não precisa de dois apps — tudo sai do mesmo Gmail.
      </p>
      <div class="card card--warning" style="margin-bottom:var(--space-4)">
        <div class="card__text">
          <strong>Atenção:</strong> os próximos passos devem ser feitos no <strong>navegador Chrome</strong> do celular. <em>Não</em> use o aplicativo Gmail — as opções necessárias só aparecem na versão web.
        </div>
      </div>
      <p class="screen__text" style="font-weight:var(--font-weight-semibold);color:var(--color-text-primary);">
        Tenha em mãos:
      </p>
      <ul class="feature-list">
        <li class="feature-list__item">
          <span class="feature-list__icon">1️⃣</span>
          <div class="feature-list__content">
            <div class="feature-list__name">Seu celular com o Chrome instalado</div>
            <div class="feature-list__desc">O navegador (ícone redondo colorido), não o app do Gmail.<br><a href="https://play.google.com/store/apps/details?id=com.android.chrome" target="_blank" rel="noopener" style="color:var(--color-primary)">Android</a> · <a href="https://apps.apple.com/app/google-chrome/id535886823" target="_blank" rel="noopener" style="color:var(--color-primary)">iPhone</a></div>
          </div>
        </li>
        <li class="feature-list__item">
          <span class="feature-list__icon">2️⃣</span>
          <div class="feature-list__content">
            <div class="feature-list__name">A Chave de Integração (16 dígitos)</div>
            <div class="feature-list__desc">Código que a TI enviou por mensagem. Guarde-o por perto.</div>
          </div>
        </li>
      </ul>
      ${btnRow({ nextLabel: 'Tenho tudo, iniciar!', feedback: 'mission' })}
    </div>
  `,

  'smtp-1': () => smtpStep(1, 'Abra o Chrome e acesse o Gmail',
    `No seu celular, abra o <strong>Chrome</strong> (ícone redondo colorido) e acesse o link abaixo. Faça login com sua conta pessoal (<strong>${state.emailInput}</strong>).<br><br><a href="https://mail.google.com" target="_blank" rel="noopener" style="color:var(--color-primary);font-weight:700;font-size:1.1em;">📧 Abrir mail.google.com</a>`,
    'Acessei ✓', SMTP_ILLUSTRATIONS[1]()),

  'smtp-2': () => smtpStep(2, 'Ative o modo computador',
    `Toque nos <strong>três pontinhos (⋮)</strong> no canto superior direito do Chrome. No menu que abrir, marque a opção "<strong>Site para computador</strong>". A página vai recarregar com o visual de PC.<br><br><em style="color:var(--color-text-secondary)">A tela ficará em miniatura — é normal. Use o gesto de pinça (dois dedos) para dar zoom e ampliar o que precisar.</em>`,
    'Ativei ✓', SMTP_ILLUSTRATIONS[2]()),

  'smtp-3': () => smtpStep(3, 'Abra as Configurações',
    `Clique na <strong>engrenagem (⚙)</strong> no canto superior direito da tela do Gmail. Depois clique em "<strong>Ver todas as configurações</strong>".`,
    'Abri ✓', SMTP_ILLUSTRATIONS[3]()),

  'smtp-4': () => smtpStep(4, 'Contas e Importação',
    `Clique na aba "<strong>Contas e importação</strong>". Na seção "<strong>Enviar e-mail como</strong>", clique em "<strong>Adicionar outro endereço de e-mail</strong>".`,
    'Achei ✓', SMTP_ILLUSTRATIONS[4]()),

  'smtp-5': () => `
    <div class="screen">
      <span class="phase-badge phase-badge--3">Passo 5 de 10</span>
      <div class="step-instruction">
        <div class="step-instruction__number">5</div>
        <div class="step-instruction__action">Preencha seus dados</div>
        <div class="step-instruction__detail">Uma janela amarela vai abrir. Preencha exatamente como abaixo:</div>
      </div>
      <div class="card card--accent">
        <div class="card__title">Endereço de e-mail</div>
        ${copyableValue(corpEmail())}
      </div>
      <div class="card card--accent">
        <div class="card__title">Nome</div>
        ${copyableValue(fullName() + ' | Grupo Opp+')}
      </div>
      <div class="smtp-illustration">${SMTP_ILLUSTRATIONS[5]()}</div>
      ${btnRow({ nextLabel: 'Preenchido ✓', nextClass: 'btn--done', feedback: 'step' })}
    </div>
  `,

  'smtp-6': () => smtpStep(6, 'Atenção 🛑',
    `Se aparecer a opção "<strong>Tratar como um alias</strong>", <strong>DESMARQUE-A</strong>. <em>(Se não aparecer, é só avançar).</em>`,
    'Desmarcado ✓', SMTP_ILLUSTRATIONS[6]()),

  'smtp-7': () => `
    <div class="screen">
      <span class="phase-badge phase-badge--3">Passo 7 de 10</span>
      <div class="step-instruction">
        <div class="step-instruction__number">7</div>
        <div class="step-instruction__action">Dados do Servidor</div>
        <div class="step-instruction__detail">Preencha os campos na janela amarela:</div>
      </div>
      <div class="card card--accent">
        <div class="card__title">Servidor SMTP</div>
        ${copyableValue('smtp.gmail.com')}
      </div>
      <div class="card card--accent">
        <div class="card__title">Porta</div>
        ${copyableValue('465')}
      </div>
      <div class="card card--accent">
        <div class="card__title">Segurança</div>
        <div class="card__text">Marque "<strong>Conexão protegida usando SSL</strong>"</div>
      </div>
      <div class="smtp-illustration">${SMTP_ILLUSTRATIONS[7]()}</div>
      ${btnRow({ nextLabel: 'Configurado ✓', nextClass: 'btn--done', feedback: 'step' })}
    </div>
  `,

  'smtp-8': () => `
    <div class="screen">
      <span class="phase-badge phase-badge--3">Passo 8 de 10</span>
      <div class="step-instruction">
        <div class="step-instruction__number">8</div>
        <div class="step-instruction__action">Usuário e Chave de Integração</div>
        <div class="step-instruction__detail">Preencha os dois campos abaixo e clique em "<strong>Adicionar conta</strong>":</div>
      </div>
      <div class="card card--accent">
        <div class="card__title">Nome de usuário</div>
        ${copyableValue('opp@grupooppmais.com.br')}
        <div class="card__text"><strong>Atenção:</strong> NÃO use seu e-mail pessoal aqui.</div>
      </div>
      <div class="card card--accent">
        <div class="card__title">Senha (Chave de Integração)</div>
        <div class="card__text">Vá até a mensagem que a TI te enviou com os <strong>16 dígitos</strong>. Pressione sobre o código até que seja selecionado, escolha <strong>Copiar</strong>. Volte para esta página do Gmail, toque no campo "Senha", mantenha pressionado e escolha <strong>Colar</strong>.</div>
      </div>
      <div class="smtp-illustration">${SMTP_ILLUSTRATIONS[8]()}</div>
      ${btnRow({ nextLabel: 'Adicionado ✓', nextClass: 'btn--done', feedback: 'step' })}
    </div>
  `,

  'smtp-9': () => `
    <div class="screen">
      <span class="phase-badge phase-badge--3">Passo 9 de 10</span>
      <div class="step-instruction">
        <div class="step-instruction__number">9</div>
        <div class="step-instruction__action">Código de confirmação</div>
        <div class="step-instruction__detail">
          O Google enviou um código de verificação para <strong>${state.emailInput}</strong>. Alterne para o seu e-mail pessoal, copie o código e cole no campo de confirmação.
        </div>
      </div>
      <div class="smtp-illustration">${SMTP_ILLUSTRATIONS[9]()}</div>
      ${btnRow({ nextLabel: 'Verificado ✓', nextClass: 'btn--done', feedback: 'step' })}
    </div>
  `,

  'smtp-10': () => `
    <div class="screen">
      <span class="phase-badge phase-badge--3">Passo 10 de 10</span>
      <div class="step-instruction">
        <div class="step-instruction__number">10</div>
        <div class="step-instruction__action">Responder pelo mesmo endereço</div>
        <div class="step-instruction__detail">
          Ainda em <strong>Configurações</strong> > <strong>Contas e importação</strong>. Na seção "Ao responder uma mensagem", marque:<br>
          "<strong>Responder do mesmo endereço para o qual a mensagem foi enviada</strong>".
        </div>
      </div>
      <div class="smtp-illustration">${SMTP_ILLUSTRATIONS[10]()}</div>
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
          Configuração concluída! Agora faltam só alguns passos para você estar 100% operacional:
        </p>
      </div>
      <ul class="feature-list" style="text-align:left;margin-top:var(--space-4)">
        <li class="feature-list__item">
          <span class="feature-list__icon">🔑</span>
          <div class="feature-list__content">
            <div class="feature-list__name"><a href="https://accounts.google.com/signin" target="_blank" rel="noopener" style="color:inherit;text-decoration:underline;">Faça login no Workspace</a></div>
            <div class="feature-list__desc">Use seu e-mail corporativo (<strong>${corpEmail()}</strong>). A senha de primeiro acesso é o seu próprio e-mail pessoal.</div>
          </div>
        </li>
        <li class="feature-list__item">
          <span class="feature-list__icon">🔄</span>
          <div class="feature-list__content">
            <div class="feature-list__name">Troque sua senha</div>
            <div class="feature-list__desc">O sistema vai pedir uma nova senha automaticamente no primeiro login. Escolha uma senha forte.</div>
          </div>
        </li>
        <li class="feature-list__item">
          <span class="feature-list__icon">🏛️</span>
          <div class="feature-list__content">
            <div class="feature-list__name">Explore o Ágora e o Nexo</div>
            <div class="feature-list__desc">Visite o pátio de conversas e os armários da equipe. Seus atalhos estão no painel a seguir.</div>
          </div>
        </li>
        <li class="feature-list__item">
          <span class="feature-list__icon">🆘</span>
          <div class="feature-list__content">
            <div class="feature-list__name">Dúvidas? Fale com a TI</div>
            <div class="feature-list__desc">Pelo Google Chat ou pelo e-mail contato@grupooppmais.com.br</div>
          </div>
        </li>
      </ul>
      ${btnRow({ nextLabel: 'Compartilhar sua opinião', showBack: false, feedback: 'tap' })}
    </div>
  `,

  'feedback': () => {
    if (state.feedbackSent) {
      return `
        <div class="screen screen--center">
          <div class="celebration">
            <div class="celebration__icon">🙏</div>
            <h2 class="celebration__title">Obrigado, ${firstName()}!</h2>
            <p class="celebration__text">
              Sua opinião foi registrada com sucesso. Ela nos ajuda a melhorar esta experiência para todos.
            </p>
          </div>
          ${btnRow({ nextLabel: 'Ver meu painel de acessos', showBack: false, feedback: 'tap' })}
        </div>
      `;
    }
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
        ${scaleHtml('q3', '3. O papel do seu e-mail corporativo e das ferramentas (Ágora, Nexo, Chat) ficou claro?', 'Nada claro', 'Totalmente claro')}
        ${scaleHtml('q4', '4. A configuração do SMTP foi...', 'Muito difícil', 'Muito fácil')}
        ${scaleHtml('q5', '5. Depois deste processo, você se sente preparado(a) para usar suas ferramentas digitais?', 'Nada preparado', 'Totalmente preparado')}

        <div class="feedback-question">
          <label class="feedback-question__label">6. Tem algo que ficou confuso ou que poderia ser explicado melhor? Qual modo visual preferiu?</label>
          <textarea id="feedback-text" class="feedback-textarea"
            placeholder="Opcional — escreva aqui..."
            oninput="setFeedbackText(this.value)">${fb.q6}</textarea>
        </div>

        ${btnRow({
          nextLabel: 'Enviar e continuar',
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
          <span class="summary-row__label">💼 E-mail corporativo</span>
          <span class="summary-row__value" style="color:var(--color-primary)">${corpEmail()}</span>
        </div>
        <div class="summary-row">
          <span class="summary-row__label">Status</span>
          <span class="summary-row__value" style="color:var(--color-success)">Ativo ✓</span>
        </div>
      </div>

      <div class="card card--warning" style="margin-top:var(--space-4)">
        <div class="card__title">🔐 Primeiro login no Workspace</div>
        <div class="card__text">
          <strong>Usuário:</strong> ${corpEmail()}<br>
          <strong>Senha:</strong> seu e-mail pessoal (<em>${state.emailInput}</em>)<br><br>
          O sistema vai pedir para <strong>criar uma nova senha</strong> no primeiro acesso. Escolha algo seguro e que só você saiba.
        </div>
      </div>

      <h3 class="screen__title" style="font-size:var(--font-size-lg);margin-top:var(--space-5);">Atalhos Rápidos</h3>
      <ul class="feature-list">
        <li class="feature-list__item">
          <a href="https://drive.google.com" target="_blank" rel="noopener" class="feature-list__link">
            <span class="feature-list__icon">🗄️</span>
            <div class="feature-list__content">
              <div class="feature-list__name">Nexo — Armários da equipe</div>
              <div class="feature-list__desc">Abrir Google Drive →</div>
            </div>
          </a>
        </li>
        <li class="feature-list__item">
          <a href="https://groups.google.com" target="_blank" rel="noopener" class="feature-list__link">
            <span class="feature-list__icon">🏛️</span>
            <div class="feature-list__content">
              <div class="feature-list__name">Ágora — Pátio de conversas</div>
              <div class="feature-list__desc">Abrir Grupo Ágora →</div>
            </div>
          </a>
        </li>
        <li class="feature-list__item">
          <a href="https://chat.google.com" target="_blank" rel="noopener" class="feature-list__link">
            <span class="feature-list__icon">💬</span>
            <div class="feature-list__content">
              <div class="feature-list__name">Google Chat</div>
              <div class="feature-list__desc">WhatsApp do trabalho →</div>
            </div>
          </a>
        </li>
        <li class="feature-list__item">
          <a href="mailto:contato@grupooppmais.com.br" class="feature-list__link">
            <span class="feature-list__icon">✉️</span>
            <div class="feature-list__content">
              <div class="feature-list__name">Suporte / Contato</div>
              <div class="feature-list__desc">contato@grupooppmais.com.br →</div>
            </div>
          </a>
        </li>
      </ul>

      <div class="card card--info" style="margin-top:var(--space-4)">
        <div class="card__title">Dúvidas?</div>
        <div class="card__text">Fale com a TI pelo Chat ou envie para <a href="mailto:contato@grupooppmais.com.br" style="color:var(--color-primary)">contato@grupooppmais.com.br</a></div>
      </div>

      <div class="btn-row">
        <button class="btn btn--secondary" onclick="restart()">Refazer onboarding</button>
      </div>

      <div class="credits">
        <div class="credits__text">Desenvolvido por ΣΘ Sistere Stabilis<br>com assistência de IA Claude (Anthropic)</div>
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

  const isSameScreen = app.dataset.currentScreen === screen.id;
  app.dataset.currentScreen = screen.id;
  app.innerHTML = renderHeader() + renderer();
  bindScreenEvents(screen.id);

  if (screen.id === 'celebration') {
    launchConfetti();
    feedbackCelebration();
  }

  if (!isSameScreen) window.scrollTo(0, 0);
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
  if (!state.user && state.emailInput) {
    state.user = lookupUser(state.emailInput);
    if (state.user) saveState();
  }
  const payload = {
    name: fullName(),
    email: u().personalEmail || '',
    role: userRole(),
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
