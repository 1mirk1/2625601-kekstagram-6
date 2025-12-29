import { generatePhotos } from './post.js';

const renderMiniatures = () => {
  const picturesContainer = document.querySelector('.pictures');
  // Проверяем существование контейнера
  if (!picturesContainer) {
    return;
  }
  const pictureTemplate = document.querySelector('#picture');
  // Проверяем существование шаблона
  if (!pictureTemplate) {
    return;
  }
  const photos = generatePhotos();
  const fragment = document.createDocumentFragment();

  photos.forEach(({ url, description, likes, comments }) => {
    const pictureElement = pictureTemplate.content.querySelector('.picture').cloneNode(true);
    const imageElement = pictureElement.querySelector('.picture__img');
    imageElement.src = url;
    imageElement.alt = description;
    pictureElement.querySelector('.picture__likes').textContent = likes;
    pictureElement.querySelector('.picture__comments').textContent = comments.length;
    fragment.appendChild(pictureElement);
  });
  picturesContainer.appendChild(fragment);
};

export { renderMiniatures };
