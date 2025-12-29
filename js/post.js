import { getRandomInteger, getUniqueIdGenerator, getRandomArrayElement } from './util.js';

const NAMES = ['Артём', 'Дарья', 'Лука', 'Александр', 'Матвей', 'Лилия', 'Мария', 'Иван'];
const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const PHOTO_COUNT = 25;
const generatePhotoId = getUniqueIdGenerator(1, PHOTO_COUNT);
const generateCommentId = getUniqueIdGenerator(1, 1000);

const createComment = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES),
});

const createPhoto = () => {
  const photoId = generatePhotoId();

  return {
    id: photoId,
    url: `photos/${photoId}.jpg`, // Ссылка на существующие файлы в папке photos/
    description: `Описание фотографии ${photoId}`,
    likes: getRandomInteger(15, 200),
    comments: Array.from({ length: getRandomInteger(0, 30) }, createComment),
  };
};

const generatePhotos = () => Array.from({ length: PHOTO_COUNT }, createPhoto);

export { generatePhotos };
