/* Carimbo de versão do Norte — fonte única da versão publicada.
   A cada publicação, mude APENAS a linha VERSAO abaixo e o versao.json.
   Uso: <script src="carimbo.js"></script> no <helmet> da página.
   Se a página tiver um <span data-carimbo></span>, o selo é montado ali;
   caso contrário é injetado discretamente no fim do documento. */
(function () {
  var VERSAO = '2026.08.23-2';

  var ESTADOS = {
    conferindo: ['conferindo…', '#C9CEC7'],
    ok: ['em dia', '#219653'],
    velha: ['desatualizada — recarregue', '#C08A2E'],
    offline: ['offline', '#9AA097'],
    semIndice: ['sem índice', '#C0564C'],
  };

  function montar(alvo) {
    var wrap = document.createElement('span');
    wrap.setAttribute('data-carimbo-selo', '');
    wrap.style.cssText =
      'display:inline-flex;align-items:center;gap:7px;background:#F4F6F3;' +
      'border:1px solid #E6E7E4;border-radius:999px;padding:5px 12px;' +
      "font-family:'Montserrat',system-ui,sans-serif;vertical-align:middle;";

    var ponto = document.createElement('span');
    ponto.style.cssText = 'width:7px;height:7px;border-radius:50%;background:#C9CEC7;flex:none;';

    var num = document.createElement('span');
    num.style.cssText = 'font-family:ui-monospace,monospace;font-size:10.5px;color:#5A615A;';
    num.textContent = 'Norte v' + VERSAO;

    var est = document.createElement('span');
    est.style.cssText = 'font-size:10.5px;color:#9AA097;';
    est.textContent = ESTADOS.conferindo[0];

    wrap.appendChild(ponto);
    wrap.appendChild(num);
    wrap.appendChild(est);
    alvo.appendChild(wrap);
    return { ponto: ponto, est: est };
  }

  function pintar(refs, estado) {
    refs.est.textContent = estado[0];
    refs.ponto.style.background = estado[1];
  }

  var ESTADO_ATUAL = ESTADOS.conferindo;

  fetch('versao.json?cb=' + Date.now(), { cache: 'no-store' })
    .then(function (r) { return r.ok ? r.json() : null; })
    .then(function (d) {
      ESTADO_ATUAL = !d ? ESTADOS.semIndice : (d.versao === VERSAO ? ESTADOS.ok : ESTADOS.velha);
    })
    .catch(function () { ESTADO_ATUAL = ESTADOS.offline; })
    .then(function () { aplicar(); });

  var refsAtuais = null;

  function aplicar() {
    if (refsAtuais && refsAtuais.est.isConnected) pintar(refsAtuais, ESTADO_ATUAL);
  }

  /* o selo é remontado sempre que sumir: o DC re-renderiza o rodapé */
  function garantir(permitirSolto) {
    if (document.querySelector('[data-carimbo-selo]')) return true;
    if (!document.body) return false;

    var alvo = document.querySelector('[data-carimbo]');
    var solto = false;
    if (!alvo) {
      if (!permitirSolto) return false;
      alvo = document.createElement('div');
      alvo.setAttribute('data-carimbo-solto', '');
      alvo.style.cssText =
        'display:flex;justify-content:center;padding:0 24px 26px;background:transparent;';
      document.body.appendChild(alvo);
      solto = true;
    }

    refsAtuais = montar(alvo);
    if (solto) refsAtuais.ponto.parentNode.style.boxShadow = '0 1px 3px rgba(57,69,58,.10)';
    aplicar();
    return true;
  }

  function vigiar() {
    if (!window.MutationObserver || !document.body) return;
    var pendente = false;
    new MutationObserver(function () {
      if (pendente) return;
      pendente = true;
      setTimeout(function () { pendente = false; garantir(true); }, 60);
    }).observe(document.body, { childList: true, subtree: true });
  }

  /* o DC monta o template depois do helmet: espera o span aparecer
     por até 12s antes de recorrer à injeção solta no fim do documento */
  function esperar(tentativas) {
    if (garantir(tentativas > 120)) return vigiar();
    setTimeout(function () { esperar(tentativas + 1); }, 100);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { esperar(0); });
  } else {
    esperar(0);
  }
})();
