export default class Counter {
  constructor(
    btnStart,
    btnPrev,
    btnActive,
    btnNext,
    btnEnd,
    renderCurrentPage,
    toggleButtons,
    getCountCards
  ) {
    this._btnStart = btnStart;
    this._btnPrev = btnPrev;
    this._btnActive = btnActive;
    this._btnNext = btnNext;
    this._btnEnd = btnEnd;
    this._btnActiveText = '';
    this._counter = btnActive.textContent;
    this._renderCurrentPage = renderCurrentPage;
    this._toggleButtons = toggleButtons;
    this._cardCount = getCountCards;
  }

  _handleClickStart() {
    this._counter = 1;
    this._updatePagination();
  }

  _handleClickNext() {
    this._counter++;
    this._updatePagination();
  }

  _handleClickPrev() {
    this._counter--;
    this._updatePagination();
  }

  _handleClickEnd() {
    this._counter = 48 / this._cardCount();
    this._updatePagination();
  }

  _updatePagination() {
    this._btnActive.textContent = this._counter;
    this._renderCurrentPage(this._counter);
    this._memoCardCount = this._cardCount();

    if (this._counter === 1) {
      this._toggleButtons([this._btnStart, this._btnPrev], true);
    }
    if (this._counter > 1) {
      this._toggleButtons([this._btnStart, this._btnPrev], false);
    }
    if (this._counter === 48 / this._cardCount()) {
      this._toggleButtons([this._btnNext, this._btnEnd], true);
    }
    if (this._counter < 48 / this._cardCount()) {
      this._toggleButtons([this._btnNext, this._btnEnd], false);
    }
  }

  setEventListeners() {
    window.addEventListener('resize', () => {
      if (this._memoCardCount !== this._cardCount()) {
        this._handleClickStart();
      }
    });
    this._btnStart.addEventListener('click', () => this._handleClickStart());
    this._btnNext.addEventListener('click', () => this._handleClickNext());
    this._btnPrev.addEventListener('click', () => this._handleClickPrev());
    this._btnEnd.addEventListener('click', () => this._handleClickEnd());
  }
}
