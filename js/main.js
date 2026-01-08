import { renderMiniatures } from './drawing-miniature.js';
import { initForm } from './form.js';
import { loadData } from './api.js';
import { showDataLoadErrorMessage } from './message.js';
import { debounce } from './util.js';

let photos = [];

const getFilteredPhotos = (filterType) => {
  switch (filterType) {
    case 'random': {
      const shuffled = [...photos].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, 10);
    }
    case 'discussed': {
      return [...photos].sort((a, b) => b.comments.length - a.comments.length);
    }
    default: {
      return photos;
    }
  }
};

const updatePictures = (filterType = 'default') => {
  const filtered = getFilteredPhotos(filterType);
  renderMiniatures(filtered);
};

const debouncedUpdatePictures = debounce(updatePictures, 500);

const initFilters = () => {
  const defaultBtn = document.querySelector('#filter-default');
  const randomBtn = document.querySelector('#filter-random');
  const discussedBtn = document.querySelector('#filter-discussed');

  const activateButton = (btn) => {
    defaultBtn.classList.remove('img-filters__button--active');
    randomBtn.classList.remove('img-filters__button--active');
    discussedBtn.classList.remove('img-filters__button--active');
    btn.classList.add('img-filters__button--active');
  };

  defaultBtn.addEventListener('click', () => {
    activateButton(defaultBtn);
    debouncedUpdatePictures('default');
  });

  randomBtn.addEventListener('click', () => {
    activateButton(randomBtn);
    debouncedUpdatePictures('random');
  });

  discussedBtn.addEventListener('click', () => {
    activateButton(discussedBtn);
    debouncedUpdatePictures('discussed');
  });
};

const onSuccess = (data) => {
  photos = data;
  renderMiniatures(photos);

  const filtersBlock = document.querySelector('.img-filters');
  if (filtersBlock) {
    filtersBlock.classList.remove('img-filters--inactive');
    initFilters();
  }
};

const onFail = () => {
  showDataLoadErrorMessage();
};

document.addEventListener('DOMContentLoaded', () => {
  loadData(onSuccess, onFail);
  initForm();
});
