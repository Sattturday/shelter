export default class Counter {
  constructor(
    createElement,
    btnStart,
    btnPrev,
    btnActive,
    btnNext,
    btnEnd,
    renderCurrentPage,
    toggleButtons
  ) {
    this._createElement = createElement;
    this._btnStart = btnStart;
    this._btnPrev = btnPrev;
    this._btnActive = btnActive;
    this._btnNext = btnNext;
    this._btnEnd = btnEnd;
    this._btnActiveText = '';
    this._counter = btnActive.textContent;
    this._renderCurrentPage = renderCurrentPage;
    this._toggleButtons = toggleButtons;
  }

  _handleClickStart() {
    this._counter = 1;
    this._btnActive.textContent = this._counter;
    this._toggleButtons([this._btnNext, this._btnEnd], false);
    this._toggleButtons([this._btnStart, this._btnPrev], true);
  }

  _handleClickNext(cardsCount) {
    this._counter++;
    this._btnActive.textContent = this._counter;
    this._renderCurrentPage(this._counter);

    if (this._counter > 1) {
      this._toggleButtons([this._btnStart, this._btnPrev], false);
    }
    if (this._counter === 48 / cardsCount) {
      this._toggleButtons([this._btnNext, this._btnEnd], true);
    }
  }

  _handleClickPrev(cardsCount) {
    this._counter--;
    this._btnActive.textContent = this._counter;
    this._renderCurrentPage(this._counter);

    if (this._counter < 48 / cardsCount) {
      this._toggleButtons([this._btnNext, this._btnEnd], false);
    }
    if (this._counter === 1) {
      this._toggleButtons([this._btnStart, this._btnPrev], true);
    }
  }

  _handleClickEnd(cardsCount) {
    this._counter = 48 / cardsCount;
    this._btnActive.textContent = this._counter;
    this._toggleButtons([this._btnNext, this._btnEnd], true);
    this._toggleButtons([this._btnStart, this._btnPrev], false);
  }

  setEventListeners(cardsCount) {
    this._btnStart.addEventListener('click', () => this._handleClickStart());
    this._btnNext.addEventListener('click', () =>
      this._handleClickNext(cardsCount)
    );
    this._btnPrev.addEventListener('click', () =>
      this._handleClickPrev(cardsCount)
    );
    this._btnEnd.addEventListener('click', () =>
      this._handleClickEnd(cardsCount)
    );
  }

  renderCounter() {}
}
