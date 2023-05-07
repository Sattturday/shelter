export default function getRandomNumbers() {
  const arr = [];
  while (arr.length < 8) {
    let r = Math.floor(Math.random() * 8);
    if (arr.indexOf(r) === -1) arr.push(r);
  }

  return arr;
}
