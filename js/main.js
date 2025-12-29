import { renderMiniatures } from './drawing-miniature.js';
import { initForm } from './form.js';

// Инициализация при загрузке DOM
document.addEventListener('DOMContentLoaded', () => {
  renderMiniatures();
  initForm();
});
