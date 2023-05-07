export default class Showcase {
  constructor(cardIndexes, containerSelector, handleClick) {
    this._cardIndexes = cardIndexes;
    this._container = document.querySelector(containerSelector);
    this._handleClick = handleClick;
    this._width = 0;
    this._cardsCount = 0;
    this._indexesPage;
  }

  getCardsCount() {
    this._width = this._container.offsetWidth;

    if (this._width === 1240) {
      this._cardsCount = 8;
    }
    if (this._width === 930 || this._width === 610) {
      this._cardsCount = 6;
    }
    if (this._width === 310) {
      this._cardsCount = 3;
    }

    return this._cardsCount;
  }

  getIndexesPage(count) {
    this._indexesPage = this._cardIndexes.slice(
      (count - 1) * this.getCardsCount(),
      count * this.getCardsCount()
    );
    return this._indexesPage;
  }

  setEventListener() {
    this._container.addEventListener('click', this._handleClick);
  }
}
