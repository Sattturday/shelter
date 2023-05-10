export default class Slider {
  constructor(
    containerSelector,
    btnLeftSlider,
    btnRightSlider,
    toggleDisableButtons,
    handleCardClick,
    renderSliderItem
  ) {
    this._container = document.querySelector(containerSelector);
    this._btnLeft = btnLeftSlider;
    this._btnRight = btnRightSlider;
    this._toggleDisableButtons = toggleDisableButtons;
    this._handleCardClick = handleCardClick;
    this._renderItem = renderSliderItem;
  }

  _getNewIndexes() {
    this._activeIndexes = Array.from(
      this._itemActive.querySelectorAll('.card')
    ).map((item) => item.getAttribute('data-id'));

    this._newIndexes = [];

    while (this._newIndexes.length < 3) {
      this._randomNumber = String(Math.floor(Math.random() * 8));
      if (
        !this._activeIndexes.includes(this._randomNumber) &&
        !this._newIndexes.includes(this._randomNumber)
      ) {
        this._newIndexes.push(this._randomNumber);
      }
    }

    return this._newIndexes;
  }

  _handleClickButtons(e) {
    this._toggleDisableButtons([this._btnLeft, this._btnRight], true);

    if (e.target.closest('.slider__btn_right')) {
      if (!this._itemRight.innerHTML) {
        this._renderItem('right', this._getNewIndexes());
      }
      this._container.classList.add('transition-right');
    } else {
      if (!this._itemLeft.innerHTML) {
        this._renderItem('left', this._getNewIndexes());
      }
      this._container.classList.add('transition-left');
    }
  }

  _endAnimation(a) {
    this._toggleDisableButtons([this._btnLeft, this._btnRight], false);
    if (a.animationName === 'move-right') {
      this._container.classList.remove('transition-right');
      this._itemLeft.innerHTML = this._itemActive.innerHTML;
      this._itemActive.innerHTML = this._itemRight.innerHTML;
      this._itemRight.innerHTML = '';
    } else {
      this._container.classList.remove('transition-left');
      this._itemRight.innerHTML = this._itemActive.innerHTML;
      this._itemActive.innerHTML = this._itemLeft.innerHTML;
      this._itemLeft.innerHTML = '';
    }
  }

  renderSliderItems() {
    this._itemLeft = document.createElement('div');
    this._itemLeft.classList.add('slider__item');
    this._itemLeft.setAttribute('id', 'item-left');
    this._container.append(this._itemLeft);

    this._itemActive = document.createElement('div');
    this._itemActive.classList.add('slider__item');
    this._itemActive.setAttribute('id', 'item-active');
    this._container.append(this._itemActive);

    this._itemRight = document.createElement('div');
    this._itemRight.classList.add('slider__item');
    this._itemRight.setAttribute('id', 'item-right');
    this._container.append(this._itemRight);
  }

  setEventListeners() {
    this._container.addEventListener('animationend', (a) =>
      this._endAnimation(a)
    );
    this._container.addEventListener('click', this._handleCardClick);
    this._btnLeft.addEventListener('click', (e) => this._handleClickButtons(e));
    this._btnRight.addEventListener('click', (e) =>
      this._handleClickButtons(e)
    );
  }
}
