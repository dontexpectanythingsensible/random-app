export function getRandomInt (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// custom sort otherwise you'll get 1, 10, 2, 20
export function compareNumbers (a, b) {
  return a - b;
}
