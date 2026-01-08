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
    document.removeEventListener('keydown', onEscKeydown);
    document.removeEventListener('click', onOverlayClick);
  }

  if (button) {
    button.addEventListener('click', removeMessage);
  }
  document.addEventListener('keydown', onEscKeydown);
  document.addEventListener('click', onOverlayClick);

  return removeMessage;
};

const showSuccessMessage = () => showMessage('success', 'Круто!');
const showErrorMessage = () => showMessage('error', 'Загрузить другой файл');
const showDataLoadErrorMessage = () => showMessage('error', 'Не удалось загрузить фотографии');

export { showSuccessMessage, showErrorMessage, showDataLoadErrorMessage };
