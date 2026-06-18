/**
 * Minha Opp+ — Entry point
 * PWA de onboarding gamificado para colaboradores do Grupo Opp+.
 */

const app = document.getElementById('app');
app.innerHTML = `
  <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:100vh;padding:var(--space-6);text-align:center;">
    <h1 style="font-family:var(--font-display);font-size:var(--font-size-2xl);color:var(--color-primary);margin-bottom:var(--space-4);">
      Minha Opp+
    </h1>
    <p style="color:var(--color-text-secondary);margin-bottom:var(--space-6);">
      Em breve: seu guia para configurar o email corporativo.
    </p>
    <div style="width:60px;height:4px;background:var(--color-action-primary);border-radius:var(--radius-full);"></div>
  </div>
`;
