const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const scaleControlValue = document.querySelector('.scale__control--value');
const previewImage = document.querySelector('.img-upload__preview img');

const effectLevelSlider = document.querySelector('.effect-level__slider');
const effectLevelValue = document.querySelector('.effect-level__value');
const effectsList = document.querySelectorAll('.effects__radio');
const previewContainer = document.querySelector('.img-upload__preview');

let currentScale = 100;
let currentEffect = 'none';

const sliderConfig = {
  none: { min: 0, max: 1, step: 0.1, start: 1 },
  chrome: { min: 0, max: 1, step: 0.1, start: 1 },
  sepia: { min: 0, max: 1, step: 0.1, start: 1 },
  marvin: { min: 0, max: 100, step: 1, start: 100 },
  phobos: { min: 0, max: 3, step: 0.1, start: 3 },
  heat: { min: 1, max: 3, step: 0.1, start: 3 },
};

let sliderInstance = null;

const updateScale = () => {
  previewImage.style.transform = `scale(${currentScale / 100})`;
  scaleControlValue.value = `${currentScale}%`;
};

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
      filter = '';
  }
  previewContainer.style.filter = filter;
  effectLevelValue.value = effect === 'none' ? '' : String(value);
};

export const resetScale = () => {
  currentScale = 100;
  updateScale();
};

export const resetSlider = () => {
  if (sliderInstance) {
    sliderInstance.destroy();
    sliderInstance = null;
  }

  const effectLevelContainer = effectLevelSlider.closest('.img-upload__effect-level');

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
      range: { min: config.min, max: config.max },
      step: config.step,
    });

    sliderInstance = effectLevelSlider.noUiSlider;
    sliderInstance.on('update', (values) => {
      const currentValue = parseFloat(values[0]);
      updateFilter(currentEffect, currentValue);
    });
    sliderInstance.set(config.start);
  }
};

export const resetEffectSelection = () => {
  const originalRadio = document.querySelector('#effect-none');
  if (originalRadio) {
    originalRadio.checked = true;
  }
};

// Обновлённая функция сброса
export const resetFiltersState = () => {
  currentScale = 100;
  currentEffect = 'none';
  resetScale();
  resetSlider();
  resetEffectSelection();
};

export const initFilters = () => {
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

  effectsList.forEach((radio) => {
    radio.addEventListener('change', () => {
      currentEffect = radio.value;
      resetSlider();
    });
  });

  resetScale();
};
