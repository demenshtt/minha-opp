// O Norte — botão flutuante de download genérico. Irmão do print-button e do word-button.
// Uso: <x-import component-from-global-scope="arquivo-button" from="./arquivo-button.js"
//         href="entregas/downloads/x.pptx" filename="X.pptx" rotulo="Baixar PowerPoint (.pptx)">
customElements.get('arquivo-button') || customElements.define('arquivo-button', class extends HTMLElement {
  static get observedAttributes() { return ['href', 'filename', 'rotulo', 'bottom']; }
  connectedCallback() { this.render(); }
  attributeChangedCallback() { if (this.isConnected) this.render(); }
  render() {
    const href = this.getAttribute('href') || '#';
    const fname = this.getAttribute('filename') || 'arquivo';
    const rotulo = this.getAttribute('rotulo') || 'Baixar arquivo';
    const bottom = this.getAttribute('bottom') || '22px';
    this.innerHTML = `
      <style>
        .om-file-fab { position:fixed; right:22px; bottom:${bottom}; z-index:9999; display:inline-flex; align-items:center; gap:9px;
          background:#219653; color:#FFFFFF; border:none; border-radius:12px; padding:13px 22px;
          font-family:'Montserrat',sans-serif; font-size:13.5px; font-weight:600; cursor:pointer; text-decoration:none;
          box-shadow:0 10px 28px rgba(33,150,83,.38); transition:transform .15s, background .15s; }
        .om-file-fab:hover { background:#1B7A44; transform:translateY(-1px); }
        @media print { .om-file-fab { display:none !important; } }
      </style>
      <a class="om-file-fab" href="${href}" download="${fname}">
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 15V3"/><path d="m7 10 5 5 5-5"/><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/></svg>
        ${rotulo}
      </a>`;
  }
});
