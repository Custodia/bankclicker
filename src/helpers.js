export function randomNumBetween(min, max) {
  return Math.random() * (max - min + 1) + min;
};

export function randomNumBetweenExcluding(min, max, exMin, exMax) {
  let random = randomNumBetween(min, max);
  while (random > exMin && random < exMax) {
    random = Math.random() * (max - min + 1) + min;
  }
  return random;
};