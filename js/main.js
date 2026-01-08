import { renderMiniatures } from './drawing-miniature.js';
import { initForm } from './form.js';
import { loadData } from './api.js';
import { showDataLoadErrorMessage } from './message.js';

let photos = [];

const onSuccess = (data) => {
  photos = data;
  renderMiniatures(photos);
  document.querySelector('.img-filters').classList.remove('img-filters--inactive');
};

const onFail = () => {
  showDataLoadErrorMessage();
};

document.addEventListener('DOMContentLoaded', () => {
  loadData(onSuccess, onFail);
  initForm();
});
