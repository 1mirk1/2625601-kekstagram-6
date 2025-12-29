// Импорт необходимых модулей
import { isEscapeKey } from './util.js';

// Константы для элементов DOM
const uploadFormElement = document.querySelector('.img-upload__form');
const uploadInputElement = uploadFormElement.querySelector('.img-upload__input');
const uploadOverlayElement = uploadFormElement.querySelector('.img-upload__overlay');
const uploadCancelElement = uploadFormElement.querySelector('.img-upload__cancel');
const hashtagsInputElement = uploadFormElement.querySelector('.text__hashtags');
const descriptionInputElement = uploadFormElement.querySelector('.text__description');
const uploadSubmitElement = uploadFormElement.querySelector('.img-upload__submit');

// Переменная для хранения экземпляра Pristine
let pristine;

// Функция для проверки хэш-тегов
const validateHashtags = (value) => {
  if (value.trim() === '') {
    return true;
  }

  const hashtags = value.trim().split(' ').filter((tag) => tag !== '');

  if (hashtags.length > 5) {
    return false;
  }

  for (const hashtag of hashtags) {
    if (!hashtag.startsWith('#')) {
      return false;
    }

    if (hashtag === '#') {
      return false;
    }

    const hashtagRegex = /^#[a-zа-яё0-9]{1,19}$/iu;
    if (!hashtagRegex.test(hashtag)) {
      return false;
    }

    if (hashtag.length > 20) {
      return false;
    }
  }

  const uniqueHashtags = new Set(hashtags.map((tag) => tag.toLowerCase()));
  if (uniqueHashtags.size !== hashtags.length) {
    return false;
  }

  return true;
};

// Функция для проверки комментария
const validateDescription = (value) => value.length <= 140;

// Функция для блокировки/разблокировки кнопки отправки
const updateSubmitButtonState = () => {
  const isValid = pristine.validate();
  uploadSubmitElement.disabled = !isValid;
};

// Функция для закрытия формы редактирования
function closeUploadForm() {
  uploadOverlayElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);

  uploadFormElement.reset();
  pristine.reset();
}

// Обработчик нажатия клавиши Esc
function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();

    const isTextInputFocused = document.activeElement === hashtagsInputElement || document.activeElement === descriptionInputElement;

    if (!isTextInputFocused) {
      closeUploadForm();
    }
  }
}

// Функция для открытия формы редактирования
const openUploadForm = () => {
  uploadOverlayElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

// Обработчик изменения поля выбора файла
const onFileInputChange = () => {
  openUploadForm();
};

// Обработчик клика по кнопке закрытия
const onCancelButtonClick = () => {
  closeUploadForm();
};

// Обработчик отправки формы
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

// Функция для остановки всплытия события при фокусе в поле ввода
const stopPropagationOnEscape = (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
};

// Инициализация обработчиков событий И Pristine
const initForm = () => {
  // Создаём Pristine только здесь, когда DOM готов и скрипт точно загружен
  pristine = new Pristine(uploadFormElement, {
    classTo: 'img-upload__field-wrapper',
    errorTextParent: 'img-upload__field-wrapper',
    errorTextClass: 'img-upload__field-wrapper--error'
  });

  // Добавляем валидаторы
  pristine.addValidator(
    hashtagsInputElement,
    validateHashtags,
    'Хэш-теги должны начинаться с #, содержать только буквы и цифры, быть уникальными (не более 5) и не превышать 20 символов'
  );

  pristine.addValidator(
    descriptionInputElement,
    validateDescription,
    'Комментарий не должен превышать 140 символов'
  );

  // Назначаем обработчики
  uploadInputElement.addEventListener('change', onFileInputChange);
  uploadCancelElement.addEventListener('click', onCancelButtonClick);
  uploadFormElement.addEventListener('submit', onFormSubmit);

  hashtagsInputElement.addEventListener('keydown', stopPropagationOnEscape);
  descriptionInputElement.addEventListener('keydown', stopPropagationOnEscape);

  hashtagsInputElement.addEventListener('input', updateSubmitButtonState);
  descriptionInputElement.addEventListener('input', updateSubmitButtonState);
};

export { initForm };
