import getRandomNumbers from './getRandomNumbers';

export default function getArrIndexes() {
  const cardIndexes = [];
  for (let i = 0; i < 6; i++) {
    getRandomNumbers().forEach((index) => {
      cardIndexes.push(index);
    });
  }
  return cardIndexes;
}
