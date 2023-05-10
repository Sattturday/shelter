export const burgerData = {
  overlayClass: 'background',
  hamburgerClass: 'hamburger',
  menuHeaderClass: 'header__menu',
  menuLinkClass: 'link',
};

// pagination
export const cardsSectionContainerSelector = '.pagination';
export const cardsSectionSelector = '.pagination__page';

export const paginationButtonStart = document.querySelector(
  '.pagination__nav-btn-start'
);
export const paginationButtonActive = document.querySelector(
  '.pagination__nav-btn_active'
);
export const paginationButtonNext = document.querySelector(
  '.pagination__nav-btn-next'
);
export const paginationButtonPrev = document.querySelector(
  '.pagination__nav-btn-prev'
);
export const paginationButtonEnd = document.querySelector(
  '.pagination__nav-btn-end'
);

// slider
export const containerSliderSelector = '.slider__track';
export const btnLeftSlider = document.querySelector('.slider__btn_left');
export const btnRightSlider = document.querySelector('.slider__btn_right');
export const itemLeftSelector = '#item-left';
export const itemRightSelector = '#item-right';
export const itemActiveSelector = '#item-active';
