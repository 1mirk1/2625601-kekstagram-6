// Функция для генерации случайного числа в диапазоне
const getRandomInteger = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// Функция для получения случайного элемента массива
const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

// Функция для генерации комментариев
const generateComments = () => {
  const commentsCount = getRandomInteger(0, 30);
  const comments = [];

  const messages = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];

  const names = ['Артём', 'Мария', 'Дмитрий', 'Анна', 'Сергей', 'Ольга', 'Иван', 'Елена'];
  for (let i = 0; i < commentsCount; i++) {
    const messageCount = getRandomInteger(1, 2);
    let message = '';
    for (let j = 0; j < messageCount; j++) {
      message += getRandomArrayElement(messages);
      if (j < messageCount - 1) {
        message += ' ';
      }
    }
    comments.push({
      id: getRandomInteger(1, 1000),
      avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
      message: message,
      name: getRandomArrayElement(names)
    });
  }
  return comments;
};

// Функция для генерации массива фотографий
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

generatePhotos();
