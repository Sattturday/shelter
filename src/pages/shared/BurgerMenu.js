export default class BurgerMenu {
  constructor({
    overlayClass,
    hamburgerClass,
    menuHeaderClass,
    menuLinkClass,
  }) {
    this._overlay = document.querySelector(`.${overlayClass}`);
    this._hamburger = document.querySelector(`.${hamburgerClass}`);
    this._menuHeader = document.querySelector(`.${menuHeaderClass}`);
    this._menuLinks = document.querySelectorAll(`.${menuLinkClass}`);
    this._toggleVisibility = this._toggleVisibility.bind(this);
    this._handleClickLink = this._handleClickLink.bind(this);
    this._hamburgerActiveClass = `${hamburgerClass}_active`;
    this._menuHeaderActiveClass = `${menuHeaderClass}_active`;
    this._overlayActiveClass = `${overlayClass}_active`;
  }

  _toggleVisibility() {
    this._hamburger.classList.toggle(this._hamburgerActiveClass);
    this._menuHeader.classList.toggle(this._menuHeaderActiveClass);
    this._overlay.classList.toggle(this._overlayActiveClass);
    document.body.classList.toggle('_lock');
  }

  _handleClickLink() {
    if (this._hamburger.classList.contains(this._hamburgerActiveClass)) {
      this._toggleVisibility();
    }
  }

  setEventListeners() {
    this._hamburger.addEventListener('click', this._toggleVisibility);

    if (this._menuLinks.length > 0) {
      this._menuLinks.forEach((link) => {
        link.addEventListener('click', this._handleClickLink);
      });
    }

    this._menuHeader.addEventListener('click', (evt) => {
      if (evt.target.classList.contains(this._menuHeaderActiveClass)) {
        this._toggleVisibility();
      }
    });
  }
}
