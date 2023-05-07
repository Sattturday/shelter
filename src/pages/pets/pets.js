import './pets.css';
import Card from '../shared/Card.js';
import PopupCard from '../shared/PopupCard.js';
import BurgerMenu from '../shared/BurgerMenu.js';
import Showcase from './components/Showcase.js';
import Counter from './components/Counter';
import Section from '../shared/Section.js';
import getArrIndexes from '../../utils/getArrIndexes.js';
import toggleButtons from '../../utils/toggleButtons';
import createElement from '../../utils/createElement';
import { dataPets } from '../../data/dataPets';

import {
  cardsSectionContainerSelector,
  cardsSectionSelector,
  burgerData,
  paginationButtonNext,
  paginationButtonActive,
  paginationButtonEnd,
  paginationButtonStart,
  paginationButtonPrev,
} from '../../data/constants.js';

window.onload = function () {
  // рендер карточек при закрузке
  renderCards(1);
};

const cardIndexes = getArrIndexes(); // иидентификаторы (48шт)
const cards = []; // экземпляры карточек(8шт)
dataPets.forEach((cardData) => cards.push(new Card(cardData)));

// burger
const burgerMenu = new BurgerMenu(burgerData);

// витрина
const showcase = new Showcase(
  cardIndexes,
  cardsSectionContainerSelector,
  handleCardClick
);

// отрисовка карточек
const cardsSection = new Section(
  (cardItem) => cardsSection.setItem(cardItem.generateCard()),
  cardsSectionSelector
);

// pagination
const counter = new Counter(
  createElement,
  paginationButtonStart,
  paginationButtonPrev,
  paginationButtonActive,
  paginationButtonNext,
  paginationButtonEnd,
  (count) => renderCards(count),
  toggleButtons
);

// отрисовка карточек
function renderCards(indexPage) {
  cardsSection.renderItems(cards, showcase.getIndexesPage(indexPage));
}

// popup for cards
function handleCardClick(e) {
  if (e.target.closest('.card')) {
    let clickedCardId = e.target.closest('.card').getAttribute('data-id');
    let clickedCardData = getClickedData(clickedCardId);

    renderCardPopupWindow(clickedCardData);
  }
}

const getClickedData = (id) => {
  return dataPets.find((card) => card.id == id);
};

const renderCardPopupWindow = (cardData) => {
  let popupCard = new PopupCard('card-popup', cardData);
  popupCard.renderPopupCard();
};

// слушатели
burgerMenu.setEventListeners(); //бургер меню
window.addEventListener('resize', () => renderCards(1)); // рендер карточек при изменении ширины страницы
showcase.setEventListener(); // попапы для карточек
counter.setEventListeners(showcase.getCardsCount()); // pagination
