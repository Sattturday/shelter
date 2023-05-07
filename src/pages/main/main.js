import './main.css';
import Card from '../shared/Card.js';
import PopupCard from '../shared/PopupCard.js';
import BurgerMenu from '../shared/BurgerMenu.js';
import getRandomNumbers from '../../utils/getRandomNumbers';

import { dataPets } from '../../data/dataPets';

import {
  containerSelectorSlider,
  burgerData,
  btnLeftSlider,
  btnRightSlider,
  carousel,
  itemLeftSelector,
  itemRightSelector,
  itemActiveSelector,
} from '../../data/constants.js';

window.onload = function () {
  // render cards for main
  if (dataPets && containerSelectorSlider) {
    renderCardsToDomMain(containerSelectorSlider);
  }
};

// burger
const burgerMenu = new BurgerMenu(burgerData);
burgerMenu.setEventListeners();

// load cards
const getCardsContainer = (containerSelector) => {
  let containerCards = document.querySelector(containerSelector);
  if (containerCards) {
    containerCards.innerHTML = '';
    return containerCards;
  }
};

const generateCards = (data, length) => {
  const cards = [];
  data.forEach((cardData) => cards.push(new Card(cardData)));
  data.forEach((cardData) => cards.push(new Card(cardData)));

  const cardsElements = cards.slice(0, length);
  return cardsElements;
};

const generateElementSlider = (cards, className, id, indexes) => {
  const elementSlider = document.createElement('div');
  elementSlider.className = className;
  elementSlider.setAttribute('id', id);

  indexes.forEach((i) => {
    elementSlider.append(cards[i].generateCard());
  });

  return elementSlider;
};

// cards for main
const renderCardsToDomMain = (containerSelector) => {
  if (containerSelector) {
    let cardsContainer = getCardsContainer(containerSelector);

    if (cardsContainer) {
      const cards = generateCards(dataPets, 9);
      const arrIndexes = getRandomNumbers();
      const elementEnd = arrIndexes[0];
      arrIndexes.push(elementEnd);

      const elementsSliderLeft = generateElementSlider(
        cards,
        'slider__item',
        'item-left',
        arrIndexes.slice(0, 3)
      );
      cardsContainer.append(elementsSliderLeft);

      const elementsSliderActive = generateElementSlider(
        cards,
        'slider__item',
        'item-active',
        arrIndexes.slice(3, 6)
      );
      cardsContainer.append(elementsSliderActive);

      const elementsSliderRight = generateElementSlider(
        cards,
        'slider__item',
        'item-right',
        arrIndexes.slice(6)
      );
      cardsContainer.append(elementsSliderRight);

      addCardClickHandler(cardsContainer);
    }
  }
};

// popup for cards
const addCardClickHandler = (cardsContainer) => {
  cardsContainer.addEventListener('click', (e) => {
    if (e.target.closest('.card')) {
      let clickedCardId = e.target.closest('.card').getAttribute('data-id');
      let clickedCardData = getClickedData(clickedCardId);

      renderCardPopupWindow(clickedCardData);
    }
  });
};

const getClickedData = (id) => {
  return dataPets.find((card) => card.id == id);
};

const renderCardPopupWindow = (cardData) => {
  let popupCard = new PopupCard('card-popup', cardData);
  popupCard.renderPopupCard();
};

// slider
const moveLeft = () => {
  carousel.classList.add('transition-left');
  btnLeftSlider.removeEventListener('click', moveLeft);
  btnRightSlider.removeEventListener('click', moveRight);
};

const moveRight = () => {
  carousel.classList.add('transition-right');
  btnLeftSlider.removeEventListener('click', moveLeft);
  btnRightSlider.removeEventListener('click', moveRight);
};

const fillChangedItem = (changedItem, arrNewIndexes) => {
  changedItem.innerHTML = '';
  for (let i = 0; i < 3; i++) {
    const card = new Card(dataPets.find((card) => card.id == arrNewIndexes[i]));
    changedItem.append(card.generateCard());
  }
};

const createNewIndexes = (arrOldIndexes) => {
  const arrNewIndexes = [];
  while (arrNewIndexes.length < 3) {
    let randomIndex = Math.floor(Math.random() * 8);
    if (
      !arrOldIndexes.includes(String(randomIndex)) &&
      !arrNewIndexes.includes(String(randomIndex))
    ) {
      arrNewIndexes.push(String(randomIndex));
    }
  }
  return arrNewIndexes;
};

const beforeAnimation = (animation) => {
  let changedItem;
  const leftItemContainer = document.querySelector(itemLeftSelector);
  const rightItemContainer = document.querySelector(itemRightSelector);
  const activeItemContainer = document.querySelector(itemActiveSelector);

  if (animation.animationName === 'move-left') {
    carousel.classList.remove('transition-left');
    changedItem = leftItemContainer;
    rightItemContainer.innerHTML = activeItemContainer.innerHTML;
    activeItemContainer.innerHTML = leftItemContainer.innerHTML;
  } else {
    carousel.classList.remove('transition-right');
    changedItem = rightItemContainer;
    leftItemContainer.innerHTML = activeItemContainer.innerHTML;
    activeItemContainer.innerHTML = rightItemContainer.innerHTML;
  }

  const indexesOldItem = Array.from(changedItem.querySelectorAll('.card'));
  const arrOldIndexes = indexesOldItem.map((i) => i.getAttribute('data-id'));
  const arrNewIndexes = createNewIndexes(arrOldIndexes);

  fillChangedItem(changedItem, arrNewIndexes);

  btnLeftSlider.addEventListener('click', moveLeft);
  btnRightSlider.addEventListener('click', moveRight);
};

if (btnLeftSlider) {
  btnLeftSlider.addEventListener('click', moveLeft);
}
if (btnRightSlider) {
  btnRightSlider.addEventListener('click', moveRight);
}

if (carousel) {
  carousel.addEventListener('animationend', beforeAnimation);
}
