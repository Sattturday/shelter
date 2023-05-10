export default class Section {
  constructor(dataCards, renderer, containerSelector) {
    this._data = dataCards;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  _clear() {
    this._container.innerHTML = '';
  }

  renderItems(indexes) {
    this._clear();

    indexes.forEach((index) => {
      this._renderer(this._data[index]);
    });
  }

  setItem(element) {
    this._container.append(element);
  }
}
