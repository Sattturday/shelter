export default class Section {
  constructor(renderer, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  _clear() {
    this._container.innerHTML = '';
  }

  renderItems(items, indexes) {
    this._clear();

    indexes.forEach((index) => {
      this._renderer(items[index]);
    });
  }

  setItem(element) {
    this._container.append(element);
  }
}
