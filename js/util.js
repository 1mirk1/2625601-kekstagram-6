const getRandomInteger = (min, max) => {
  const minValue = Math.ceil(Math.min(min, max));
  const maxValue = Math.floor(Math.max(min, max));
  return Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
};

const getUniqueIdGenerator = (min, max) => {
  const usedIds = [];

  return () => {
    if (usedIds.length >= (max - min + 1)) {
      return null;
    }

    let id = getRandomInteger(min, max);
    while (usedIds.includes(id)) {
      id = getRandomInteger(min, max);
    }

    usedIds.push(id);
    return id;
  };
};

const getRandomArrayElement = (elements) => {
  const randomIndex = getRandomInteger(0, elements.length - 1);
  return elements[randomIndex];
};

export { getRandomInteger, getUniqueIdGenerator, getRandomArrayElement };
