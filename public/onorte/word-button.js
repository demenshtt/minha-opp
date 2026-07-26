// O Norte — botão flutuante "Baixar Word (.docx)" — irmão do print-button.
customElements.get('word-docx-button') || customElements.define('word-docx-button', class extends HTMLElement {
  static get observedAttributes() { return ['href', 'filename']; }
  connectedCallback() { this.render(); }
  attributeChangedCallback() { if (this.isConnected) this.render(); }
  render() {
    const href = this.getAttribute('href') || '#';
    const fname = this.getAttribute('filename') || 'documento.docx';
    this.innerHTML = `
      <style>
        .om-word-fab { position:fixed; right:22px; bottom:78px; z-index:9999; display:inline-flex; align-items:center; gap:9px;
          background:#FFFFFF; color:#219653; border:1.5px solid #219653; border-radius:12px; padding:12px 22px;
          font-family:'Montserrat',sans-serif; font-size:13.5px; font-weight:600; cursor:pointer; text-decoration:none;
          box-shadow:0 10px 28px rgba(57,69,58,.18); transition:transform .15s, background .15s; }
        .om-word-fab:hover { background:#EEF3EF; transform:translateY(-1px); }
        @media print { .om-word-fab { display:none !important; } }
      </style>
      <a class="om-word-fab" href="${href}" download="${fname}">
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="m9 13 1.5 5L12 14l1.5 4L15 13"/></svg>
        Baixar Word (.docx)
      </a>`;
  }
});
