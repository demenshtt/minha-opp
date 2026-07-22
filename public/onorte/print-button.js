// O Norte — botão flutuante "Baixar PDF" para páginas doc-page (print-based).
customElements.get('print-pdf-button') || customElements.define('print-pdf-button', class extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <style>
        .om-print-fab { position:fixed; right:22px; bottom:22px; z-index:9999; display:inline-flex; align-items:center; gap:9px;
          background:#219653; color:#FFFFFF; border:none; border-radius:12px; padding:13px 22px;
          font-family:'Montserrat',sans-serif; font-size:13.5px; font-weight:600; cursor:pointer;
          box-shadow:0 10px 28px rgba(33,150,83,.38); transition:transform .15s, background .15s; }
        .om-print-fab:hover { background:#1B7A44; transform:translateY(-1px); }
        @media print { .om-print-fab { display:none !important; } }
      </style>
      <button class="om-print-fab" type="button">
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 15V3"/><path d="m7 10 5 5 5-5"/><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/></svg>
        Baixar PDF
      </button>`;
    this.querySelector('button').addEventListener('click', () => window.print());
  }
});
