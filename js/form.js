// form.js

import { isEscapeKey } from './util.js';

// ==== DOM-элементы ====
const uploadFormElement = document.querySelector('.img-upload__form');
const uploadInputElement = uploadFormElement.querySelector('.img-upload__input');
const uploadOverlayElement = uploadFormElement.querySelector('.img-upload__overlay');
const uploadCancelElement = uploadFormElement.querySelector('.img-upload__cancel');
const hashtagsInputElement = uploadFormElement.querySelector('.text__hashtags');
const descriptionInputElement = uploadFormElement.querySelector('.text__description');
const uploadSubmitElement = uploadFormElement.querySelector('.img-upload__submit');

// Масштаб
const scaleControlSmaller = uploadFormElement.querySelector('.scale__control--smaller');
const scaleControlBigger = uploadFormElement.querySelector('.scale__control--bigger');
const scaleControlValue = uploadFormElement.querySelector('.scale__control--value');
const previewImage = uploadFormElement.querySelector('.img-upload__preview img');

// Эффекты
const effectLevelSlider = uploadFormElement.querySelector('.effect-level__slider');
const effectLevelValue = uploadFormElement.querySelector('.effect-level__value');
const effectsList = uploadFormElement.querySelectorAll('.effects__radio');
const previewContainer = uploadFormElement.querySelector('.img-upload__preview');

// ==== Состояние ====
let pristine;
let currentScale = 100;
let currentEffect = 'none'; // По умолчанию "Оригинал"

// ==== Конфигурация слайдера ====
const sliderConfig = {
  none: { min: 0, max: 1, step: 0.1, start: 1 },
  chrome: { min: 0, max: 1, step: 0.1, start: 1 },
  sepia: { min: 0, max: 1, step: 0.1, start: 1 },
  marvin: { min: 0, max: 100, step: 1, start: 100 },
  phobos: { min: 0, max: 3, step: 0.1, start: 3 },
  heat: { min: 1, max: 3, step: 0.1, start: 3 },
};

let sliderInstance = null;

// ==== Функции ====

// Обновление масштаба
const updateScale = () => {
  previewImage.style.transform = `scale(${currentScale / 100})`;
  scaleControlValue.value = `${currentScale}%`;
};

const resetScale = () => {
  currentScale = 100;
  updateScale();
};

// Обновление фильтра
const updateFilter = (effect, value) => {
  let filter = '';
  switch (effect) {
    case 'chrome':
      filter = `grayscale(${value})`;
      break;
    case 'sepia':
      filter = `sepia(${value})`;
      break;
    case 'marvin':
      filter = `invert(${value}%)`;
      break;
    case 'phobos':
      filter = `blur(${value}px)`;
      break;
    case 'heat':
      filter = `brightness(${value})`;
      break;
    default:
      filter = 'none';
  }
  previewContainer.style.filter = filter === 'none' ? '' : filter;
  effectLevelValue.value = effect === 'none' ? '' : String(value);
};

// Сброс и инициализация слайдера
const resetSlider = () => {
  if (sliderInstance) {
    sliderInstance.destroy();
    sliderInstance = null;
  }

  const effectLevelContainer = effectLevelSlider.closest('.effect-level');

  if (currentEffect === 'none') {
    effectLevelContainer.classList.add('hidden');
    previewContainer.style.filter = '';
    effectLevelValue.value = '';
  } else {
    effectLevelContainer.classList.remove('hidden');
    const config = sliderConfig[currentEffect];
    noUiSlider.create(effectLevelSlider, {
      start: config.start,
      connect: 'lower',
      range: {
        min: config.min,
        max: config.max,
      },
      step: config.step,
    });

    sliderInstance = effectLevelSlider.noUiSlider;

    // Обновляем фильтр при изменении слайдера
    sliderInstance.on('update', (values) => {
      const currentValue = parseFloat(values[0]);
      updateFilter(currentEffect, currentValue);
    });

    // Устанавливаем начальное значение
    sliderInstance.set(config.start);
  }
};

// ==== Валидация ====
const validateHashtags = (value) => {
  if (value.trim() === '') {
    return true;
  }

  const hashtags = value.trim().split(' ').filter((tag) => tag !== '');

  if (hashtags.length > 5) {
    return false;
  }

  for (const hashtag of hashtags) {
    if (!hashtag.startsWith('#') || hashtag === '#') {
      return false;
    }
    const hashtagRegex = /^#[a-zа-яё0-9]{1,19}$/iu;
    if (!hashtagRegex.test(hashtag) || hashtag.length > 20) {
      return false;
    }
  }

  const uniqueHashtags = new Set(hashtags.map((tag) => tag.toLowerCase()));
  return uniqueHashtags.size === hashtags.length;
};

const validateDescription = (value) => value.length <= 140;

const updateSubmitButtonState = () => {
  const isValid = pristine.validate();
  uploadSubmitElement.disabled = !isValid;
};

// ==== Обработчики ====
function closeUploadForm() {
  uploadOverlayElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);

  uploadFormElement.reset();
  resetScale();
  currentEffect = 'none';
  resetSlider(); // Сбрасываем слайдер
  pristine.reset();
}

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    const isTextInputFocused = document.activeElement === hashtagsInputElement || document.activeElement === descriptionInputElement;
    if (!isTextInputFocused) {
      closeUploadForm();
    }
  }
}

const openUploadForm = () => {
  uploadOverlayElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);

  // Инициализируем слайдер при открытии формы
  resetSlider();
};

const onFileInputChange = () => {
  const file = uploadInputElement.files[0];
  if (file) {
    const url = URL.createObjectURL(file);
    previewImage.src = url;
  }
  openUploadForm();
};

const onCancelButtonClick = () => {
  closeUploadForm();
};

const onFormSubmit = (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();
  if (isValid) {
    uploadSubmitElement.disabled = true;
    uploadSubmitElement.textContent = 'Отправляется...';

    setTimeout(() => {
      uploadSubmitElement.disabled = false;
      uploadSubmitElement.textContent = 'Опубликовать';
      closeUploadForm();
    }, 1000);
  }
};

const stopPropagationOnEscape = (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
};

// ==== Инициализация ====
const initForm = () => {
  // Pristine
  pristine = new Pristine(uploadFormElement, {
    classTo: 'img-upload__field-wrapper',
    errorTextParent: 'img-upload__field-wrapper',
    errorTextClass: 'img-upload__field-wrapper--error',
  });

  pristine.addValidator(hashtagsInputElement, validateHashtags, 'Хэш-теги: до 5 шт., не повторяются, формат #тег (до 20 символов)');
  pristine.addValidator(descriptionInputElement, validateDescription, 'Комментарий не должен превышать 140 символов');

  // Масштаб
  scaleControlSmaller.addEventListener('click', () => {
    if (currentScale > 25) {
      currentScale -= 25;
      updateScale();
    }
  });

  scaleControlBigger.addEventListener('click', () => {
    if (currentScale < 100) {
      currentScale += 25;
      updateScale();
    }
  });

  // Эффекты
  effectsList.forEach((radio) => {
    radio.addEventListener('change', () => {
      currentEffect = radio.value;
      resetSlider(); // Сбрасываем и переинициализируем слайдер
    });
  });

  // Обработчики формы
  uploadInputElement.addEventListener('change', onFileInputChange);
  uploadCancelElement.addEventListener('click', onCancelButtonClick);
  uploadFormElement.addEventListener('submit', onFormSubmit);

  hashtagsInputElement.addEventListener('keydown', stopPropagationOnEscape);
  descriptionInputElement.addEventListener('keydown', stopPropagationOnEscape);
  hashtagsInputElement.addEventListener('input', updateSubmitButtonState);
  descriptionInputElement.addEventListener('input', updateSubmitButtonState);

  // Начальный сброс
  resetScale();
};

export { initForm };
