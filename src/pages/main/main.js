import './main.css';
import Card from '../shared/Card.js';
import BurgerMenu from '../shared/BurgerMenu.js';
import Slider from './components/Slider';
import Section from '../shared/Section';
import getRandomNumbers from '../../utils/getRandomNumbers';
import toggleDisableButtons from '../../utils/toggleDisableButtons';
import handleCardClick from '../../utils/handleCardClick';
import { dataPets } from '../../data/dataPets';

import {
  burgerData,
  containerSliderSelector,
  btnLeftSlider,
  btnRightSlider,
  itemLeftSelector,
  itemRightSelector,
  itemActiveSelector,
} from '../../data/constants.js';

window.onload = function () {
  // render cards
  if (dataPets) {
    cardsSectionActive.renderItems(getRandomNumbers().slice(0, 3));
  }
};

// экземпляры карточек
const cards = [];
dataPets.forEach((cardData) => cards.push(new Card(cardData)));

// burger
const burgerMenu = new BurgerMenu(burgerData);

// слайдер
const slider = new Slider(
  containerSliderSelector,
  btnLeftSlider,
  btnRightSlider,
  toggleDisableButtons,
  handleCardClick,
  renderSliderItem
);
slider.renderSliderItems();

// секции слайдера
const cardsSectionLeft = new Section(
  cards,
  (cardItem) => cardsSectionLeft.setItem(cardItem.generateCard()),
  itemLeftSelector
);

const cardsSectionActive = new Section(
  cards,
  (cardItem) => cardsSectionActive.setItem(cardItem.generateCard()),
  itemActiveSelector
);

const cardsSectionRight = new Section(
  cards,
  (cardItem) => cardsSectionRight.setItem(cardItem.generateCard()),
  itemRightSelector
);

// добавление новых карточек при листании слайдера
function renderSliderItem(nameSection, indexes) {
  if (nameSection === 'right') {
    cardsSectionRight.renderItems(indexes);
  } else {
    cardsSectionLeft.renderItems(indexes);
  }
}

// слушатели
burgerMenu.setEventListeners();
slider.setEventListeners();
