import './pets.css';
import Card from '../shared/Card.js';
import BurgerMenu from '../shared/BurgerMenu.js';
import Showcase from './components/Showcase.js';
import Counter from './components/Counter';
import Section from '../shared/Section.js';
import getArrIndexes from '../../utils/getArrIndexes.js';
import toggleButtons from '../../utils/toggleButtons';
import handleCardClick from '../../utils/handleCardClick';
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
  if (dataPets) {
    renderCards(1);
  }
};

// данные идентификаторов и экземпляры карточек
const cardIndexes = getArrIndexes();
const cards = [];
dataPets.forEach((cardData) => cards.push(new Card(cardData)));

// burger
const burgerMenu = new BurgerMenu(burgerData);

// отрисовка карточек
const cardsSection = new Section(
  cards,
  (cardItem) => cardsSection.setItem(cardItem.generateCard()),
  cardsSectionSelector
);

// витрина
const showcase = new Showcase(
  cardIndexes,
  cardsSectionContainerSelector,
  handleCardClick,
  getCountCards
);

// pagination
const counter = new Counter(
  paginationButtonStart,
  paginationButtonPrev,
  paginationButtonActive,
  paginationButtonNext,
  paginationButtonEnd,
  (count) => renderCards(count),
  toggleButtons,
  getCountCards
);

// отрисовка карточек
function renderCards(indexPage) {
  cardsSection.renderItems(showcase.getIndexesPage(indexPage));
}

// получение ширины страницы и количества карточек для отрисовки
let screenWidth = function getWidth() {
  return window.innerWidth;
};

function getCountCards() {
  let quantity = 0;
  if (screenWidth() > 1280) {
    quantity = 8;
  } else if (screenWidth() > 767 && screenWidth() < 1280) {
    quantity = 6;
  } else {
    quantity = 3;
  }

  return quantity;
}

// слушатели
burgerMenu.setEventListeners(); //бургер меню
showcase.setEventListener(); // попапы для карточек
counter.setEventListeners(); // pagination
