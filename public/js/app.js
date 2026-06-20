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
  { from: 7,  variant: 'prata-envelhecida' },
  { from: 9,  variant: 'ouro-envelhecido' },
  { from: 15, variant: 'ouro-brilhante' },
  { from: 19, variant: 'diamante' },
];

function currentLogoVariant() {
  let variant = LOGO_VARIANTS[0].variant;
  for (const m of LOGO_VARIANTS) {
    if (state.currentScreen >= m.from) variant = m.variant;
  }
  return variant;
}

function logoSrc(variant) {
  const v = variant || currentLogoVariant();
  const ext = (v === 'diamante' && currentTheme() === 'light') ? 'png' : 'svg';
  return `img/logo-rebrand-gopp-${v}.${ext}`;
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

async function loadUsers() {
  try {
    const res = await fetch('data/users.json');
    usersDb = await res.json();
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
  return currentTheme() === 'light' ? 'padrao' : currentLogoVariant();
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
        ${logoImg('wizard-header__logo', headerLogoVariant())}
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

function smtpStep(num, action, detail, btnLabel) {
  return `
    <div class="screen">
      <span class="phase-badge phase-badge--3">Passo ${num} de 9</span>
      <div class="step-instruction">
        <div class="step-instruction__number">${num}</div>
        <div class="step-instruction__action">${action}</div>
        <div class="step-instruction__detail">${detail}</div>
      </div>
      ${btnRow({ nextLabel: btnLabel || 'Feito ✓', nextClass: 'btn--done', feedback: 'step' })}
    </div>
  `;
}

// ═══════════════════════════════════════════════════════════════
// SCREEN RENDERERS
// ═══════════════════════════════════════════════════════════════

const screenRenderers = {

  // ─── MISSÃO 1: PREPARAÇÃO ────────────────────────────────

  'splash': () => `
    <div class="splash">
      <div class="splash__logo">${logoImg('splash__logo-img', currentTheme() === 'light' ? 'padrao' : 'fonte-branca')}</div>
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
    'Já abri ✓'),

  'smtp-2': () => smtpStep(2, 'Vá em Configurações',
    `Toque no menu (três linhas) > "<strong>Configurações</strong>" > Toque na sua conta pessoal (<strong>${state.emailInput}</strong>).`,
    'Feito ✓'),

  'smtp-3': () => smtpStep(3, 'Adicionar conta',
    `Procure e toque na opção "<strong>Adicionar outro endereço de e-mail</strong>" ou "<strong>Enviar e-mail como</strong>".`,
    'Achei ✓'),

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
    'Desmarcado ✓'),

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
          <span class="feature-list__icon">📁</span>
          <div class="feature-list__content">
            <div class="feature-list__name">Google Drive</div>
            <div class="feature-list__desc">drive.google.com</div>
          </div>
        </li>
        <li class="feature-list__item">
          <span class="feature-list__icon">💬</span>
          <div class="feature-list__content">
            <div class="feature-list__name">Google Chat</div>
            <div class="feature-list__desc">chat.google.com</div>
          </div>
        </li>
        <li class="feature-list__item">
          <span class="feature-list__icon">📧</span>
          <div class="feature-list__content">
            <div class="feature-list__name">Grupo Ágora</div>
            <div class="feature-list__desc">groups.google.com</div>
          </div>
        </li>
      </ul>

      <div class="card card--info" style="margin-top:var(--space-4)">
        <div class="card__title">Dúvidas?</div>
        <div class="card__text">Nossa equipe de TI está à disposição!</div>
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
// INIT
// ═══════════════════════════════════════════════════════════════

loadState();
loadUsers().then(() => render());
