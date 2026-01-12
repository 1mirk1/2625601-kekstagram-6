const showMessage = (templateId, buttonText = 'Закрыть') => {
  const template = document.querySelector(`#${templateId}`);
  if (!template) {
    return null;
  }

  const message = template.content.cloneNode(true).firstElementChild;
  document.body.append(message);

  const button = message.querySelector('button');
  if (button) {
    button.textContent = buttonText;
  }

  const onEscKeydown = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      evt.stopPropagation();
      removeMessage();
    }
  };

  const onOverlayClick = (evt) => {
    if (evt.target === message) {
      removeMessage();
    }
  };

  function removeMessage() {
    message.remove();
    document.removeEventListener('keydown', onEscKeydown, true);
    document.removeEventListener('click', onOverlayClick);
  }

  if (button) {
    button.addEventListener('click', removeMessage);
  }
  document.addEventListener('keydown', onEscKeydown, true);
  document.addEventListener('click', onOverlayClick);

  return removeMessage;
};

const showSuccessMessage = () => showMessage('success', 'Круто!');
const showErrorMessage = () => showMessage('error', 'Загрузить другой файл');

const showDataLoadErrorMessage = () => {
  const message = document.createElement('section');
  message.classList.add('data-error');
  message.textContent = 'Не удалось загрузить фотографии';
  document.body.append(message);

  setTimeout(() => {
    message.remove();
  }, 5000);
};

export { showSuccessMessage, showErrorMessage, showDataLoadErrorMessage };
