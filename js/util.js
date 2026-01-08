const getRandomInteger = (min, max) => {
  const minValue = Math.ceil(Math.min(min, max));
  const maxValue = Math.floor(Math.max(min, max));
  return Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
};

const getRandomArrayElement = (elements) => {
  const randomIndex = getRandomInteger(0, elements.length - 1);
  return elements[randomIndex];
};

const isEscapeKey = (evt) => evt.key === 'Escape';

export { getRandomInteger, getRandomArrayElement, isEscapeKey };
