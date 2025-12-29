import { generatePhotos } from './post.js';
import { openFullSizePhoto } from './full-pictures.js';

const renderMiniatures = () => {
  const picturesContainer = document.querySelector('.pictures');
  if (!picturesContainer) {
    return;
  }
  const pictureTemplate = document.querySelector('#picture');
  if (!pictureTemplate) {
    return;
  }
  const photos = generatePhotos();
  const fragment = document.createDocumentFragment();

  photos.forEach((photo) => {
    const pictureElement = pictureTemplate.content.querySelector('.picture').cloneNode(true);
    const imageElement = pictureElement.querySelector('.picture__img');
    imageElement.src = photo.url;
    imageElement.alt = photo.description;
    pictureElement.querySelector('.picture__likes').textContent = photo.likes;
    pictureElement.querySelector('.picture__comments').textContent = photo.comments.length;
    // Добавляем обработчик клика для открытия полноразмерного изображения
    pictureElement.addEventListener('click', (evt) => {
      evt.preventDefault();
      openFullSizePhoto(photo);
    });
    fragment.appendChild(pictureElement);
  });
  picturesContainer.appendChild(fragment);
};

export { renderMiniatures };
