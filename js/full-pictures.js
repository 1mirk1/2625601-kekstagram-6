// Константы для элементов DOM
const bigPictureElement = document.querySelector('.big-picture');
const bigPictureImgElement = bigPictureElement.querySelector('.big-picture__img img');
const socialCaptionElement = bigPictureElement.querySelector('.social__caption');
const likesCountElement = bigPictureElement.querySelector('.likes-count');
const socialCommentsElement = bigPictureElement.querySelector('.social__comments');
const socialCommentCountElement = bigPictureElement.querySelector('.social__comment-count');
const commentsLoaderElement = bigPictureElement.querySelector('.comments-loader');
const cancelButtonElement = bigPictureElement.querySelector('.big-picture__cancel');

let currentComments = [];
let shownCommentsCount = 0;
const COMMENTS_PER_PAGE = 5;

function createCommentElement(comment) {
  const commentElement = document.createElement('li');
  commentElement.classList.add('social__comment');
  const avatarElement = document.createElement('img');
  avatarElement.classList.add('social__picture');
  avatarElement.src = comment.avatar;
  avatarElement.alt = comment.name;
  avatarElement.width = 35;
  avatarElement.height = 35;
  const textElement = document.createElement('p');
  textElement.classList.add('social__text');
  textElement.textContent = comment.message;
  commentElement.appendChild(avatarElement);
  commentElement.appendChild(textElement);
  return commentElement;
}

function renderCommentsPortion(comments) {
  const fragment = document.createDocumentFragment();
  comments.forEach((comment) => {
    const commentElement = createCommentElement(comment);
    fragment.appendChild(commentElement);
  });
  socialCommentsElement.appendChild(fragment);
}

function updateCommentsCounter() {
  const shownText = `${Math.min(shownCommentsCount, currentComments.length)} из `;
  const totalText = `${currentComments.length} комментариев`;
  socialCommentCountElement.textContent = shownText + totalText;
  if (shownCommentsCount >= currentComments.length) {
    commentsLoaderElement.classList.add('hidden');
  } else {
    commentsLoaderElement.classList.remove('hidden');
  }
}

function renderInitialComments() {
  socialCommentsElement.innerHTML = '';
  const initialCount = Math.min(COMMENTS_PER_PAGE, currentComments.length);
  const initialComments = currentComments.slice(0, initialCount);
  shownCommentsCount = initialComments.length;

  renderCommentsPortion(initialComments);
  updateCommentsCounter();
}

function loadMoreComments() {
  const remainingComments = currentComments.length - shownCommentsCount;
  const nextCount = Math.min(COMMENTS_PER_PAGE, remainingComments);
  const nextComments = currentComments.slice(
    shownCommentsCount,
    shownCommentsCount + nextCount
  );

  renderCommentsPortion(nextComments);
  shownCommentsCount += nextComments.length;
  updateCommentsCounter();
}

function onCommentsLoaderClick() {
  loadMoreComments();
}

function onDocumentKeydown(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeFullSizePhoto();
  }
}

function closeFullSizePhoto() {
  bigPictureElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  currentComments = [];
  shownCommentsCount = 0;
  commentsLoaderElement.removeEventListener('click', onCommentsLoaderClick);
}

function openFullSizePhoto(photo) {
  bigPictureImgElement.src = photo.url;
  bigPictureImgElement.alt = photo.description;
  socialCaptionElement.textContent = photo.description;
  likesCountElement.textContent = photo.likes;
  currentComments = photo.comments;
  shownCommentsCount = 0;
  renderInitialComments();
  socialCommentCountElement.classList.remove('hidden');
  commentsLoaderElement.classList.remove('hidden');
  bigPictureElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  commentsLoaderElement.addEventListener('click', onCommentsLoaderClick);
}

cancelButtonElement.addEventListener('click', () => {
  closeFullSizePhoto();
});

export { openFullSizePhoto };
