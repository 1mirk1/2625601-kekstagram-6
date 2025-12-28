const getPrice = (time, isUrgent) => {
  let rate = 1500;
  let projectTime = time;

  if (isUrgent) {
    projectTime = time / 2;
    rate *= 2.5;
  }

  if (projectTime > 150) {
    rate -= 250;
  }

  return projectTime * rate;
};

export { getPrice };
