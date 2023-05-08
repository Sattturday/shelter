export default class Showcase {
  constructor(cardIndexes, containerSelector, handleClick, getCountCards) {
    this._cardIndexes = cardIndexes;
    this._container = document.querySelector(containerSelector);
    this._handleClick = handleClick;
    this._cardsCount = getCountCards;
  }

  getIndexesPage(count) {
    this._indexesPage = this._cardIndexes.slice(
      (count - 1) * this._cardsCount(),
      count * this._cardsCount()
    );
    return this._indexesPage;
  }

  setEventListener() {
    this._container.addEventListener('click', this._handleClick);
  }
}
