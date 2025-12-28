import { getRandomInteger, getRandomArrayElement } from './util.js';

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const NAMES = ['Артём', 'Мария', 'Дмитрий', 'Анна', 'Сергей', 'Ольга', 'Иван', 'Елена'];

const generateComments = () => {
  const commentsCount = getRandomInteger(0, 30);
  const comments = [];

  for (let i = 0; i < commentsCount; i++) {
    const messageCount = getRandomInteger(1, 2);
    let message = '';

    for (let j = 0; j < messageCount; j++) {
      message += getRandomArrayElement(MESSAGES);
      if (j < messageCount - 1) {
        message += ' ';
      }
    }

    comments.push({
      id: getRandomInteger(1, 1000),
      avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
      message: message,
      name: getRandomArrayElement(NAMES)
    });
  }

  return comments;
};

const generatePhotos = () => {
  const photos = [];

  for (let i = 1; i <= 25; i++) {
    photos.push({
      id: i,
      url: `photos/${i}.jpg`,
      description: `Описание фотографии ${i}`,
      likes: getRandomInteger(15, 200),
      comments: generateComments()
    });
  }

  return photos;
};

export { generatePhotos };
