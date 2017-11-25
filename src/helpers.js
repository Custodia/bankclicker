export function randomNumBetween(min, max) {
  return Math.random() * (max - min) + min;
};

export function randomNumBetweenExcluding(min, max, exMin, exMax) {
  let random = randomNumBetween(min, max);
  while (random > exMin && random < exMax) {
    random = randomNumBetween(min, max);
  }
  return random;
};
