export default class BurgerMenu {
  constructor({
    overlaySelector,
    hamburgerSelector,
    menuHeaderSelector,
    menuLinkSelector,
  }) {
    this._overlay = document.querySelector(overlaySelector);
    this._hamburger = document.querySelector(hamburgerSelector);
    this._menuHeader = document.querySelector(menuHeaderSelector);
    this._menuLinks = document.querySelectorAll(menuLinkSelector);
    this._toggleVisibility = this._toggleVisibility.bind(this);
    this._handleClickLink = this._handleClickLink.bind(this);
  }

  _toggleVisibility() {
    console.log(this._hamburger);
    this._hamburger.classList.toggle('hamburger_active');
    this._menuHeader.classList.toggle('header__menu_active');
    this._overlay.classList.toggle('background_active');
    document.body.classList.toggle('_lock');
  }

  _handleClickLink() {
    if (this._hamburger.classList.contains('hamburger_active')) {
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
      if (evt.target.classList.contains('header__menu_active')) {
        this._toggleVisibility();
      }
    });
  }
}
