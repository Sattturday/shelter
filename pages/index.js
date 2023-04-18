import Card from '../components/Card.js'
import PopupCard from '../components/PopupCard.js'

import {
  initialCards,
  containerSelectorSlider,
  containerSelectorPets,
  overlay,
  hamburger,
  menuHeader,
  menuLinks,
  btnLeftSlider,
  btnRightSlider,
  carousel,
  itemLeftSelector,
  itemRightSelector,
  itemActiveSelector,
  pageLine,
  paginationButtonNext,
  paginationButtonActive,
  paginationButtonEnd,
  paginationButtonStart,
  paginationButtonPrev,
} from '../utils/constants.js'

window.onload = function () {
  // render cards for main
  if (initialCards && containerSelectorSlider) {
    renderCardsToDomMain(containerSelectorSlider)
  }

  // render cards for pets
  if (initialCards && containerSelectorPets) {
    renderCardsToDomPets(containerSelectorPets)
  }

  // pagination
  if (document.querySelector('.our-friends__cards')) {
    init()
    window.addEventListener('resize', init)
    paginationButtonStart.addEventListener('click', rollPageStart)
    paginationButtonNext.addEventListener('click', rollPageNext)
    paginationButtonPrev.addEventListener('click', rollPagePrev)
    paginationButtonEnd.addEventListener('click', rollPageEnd)
  }
}

// burger
function onMenuLinkClick() {
  if (hamburger.classList.contains('hamburger_active')) {
    closeBurgerMenu()
  }
}

function closeBurgerMenu() {
  document.body.classList.remove('_lock')
  hamburger.classList.remove('hamburger_active')
  menuHeader.classList.remove('header__menu_active')
  overlay.classList.remove('background_active')
}

// open burger menu
if (hamburger) {
  hamburger.addEventListener('click', () => {
    document.body.classList.toggle('_lock')
    hamburger.classList.toggle('hamburger_active')
    menuHeader.classList.toggle('header__menu_active')
    overlay.classList.toggle('background_active')
  })
}

// click on menu links
if (menuLinks.length > 0) {
  menuLinks.forEach(menuLink => {
    menuLink.addEventListener('click', onMenuLinkClick)
  })
}

// click overlay menu
menuHeader.addEventListener('click', evt => {
  if (evt.target.classList.contains('header__menu_active')) {
    closeBurgerMenu()
  }
})

// load cards
const getArrRandomIndexes = () => {
  const arr = []
  while (arr.length < 8) {
    let r = Math.floor(Math.random() * 8)
    if (arr.indexOf(r) === -1) arr.push(r)
  }

  return arr
}

const getCardsContainer = containerSelector => {
  let containerCards = document.querySelector(containerSelector)
  if (containerCards) {
    containerCards.innerHTML = ''
    return containerCards
  }
}

const generateCards = (data, length) => {
  const cards = []
  data.forEach(cardData => cards.push(new Card(cardData)))
  data.forEach(cardData => cards.push(new Card(cardData)))

  const cardsElements = cards.slice(0, length)
  return cardsElements
}

const generateElementSlider = (cards, className, id, indexes) => {
  const elementSlider = document.createElement('div')
  elementSlider.className = className
  elementSlider.setAttribute('id', id)

  indexes.forEach(i => {
    elementSlider.append(cards[i].generateCard())
  })

  return elementSlider
}

// cards for main
const renderCardsToDomMain = containerSelector => {
  if (containerSelector) {
    let cardsContainer = getCardsContainer(containerSelector)

    if (cardsContainer) {
      const cards = generateCards(initialCards, 9)
      const arrIndexes = getArrRandomIndexes()
      const elementEnd = arrIndexes[0]
      arrIndexes.push(elementEnd)

      const elementsSliderLeft = generateElementSlider(
        cards,
        'slider__item',
        'item-left',
        arrIndexes.slice(0, 3)
      )
      cardsContainer.append(elementsSliderLeft)

      const elementsSliderActive = generateElementSlider(
        cards,
        'slider__item',
        'item-active',
        arrIndexes.slice(3, 6)
      )
      cardsContainer.append(elementsSliderActive)

      const elementsSliderRight = generateElementSlider(
        cards,
        'slider__item',
        'item-right',
        arrIndexes.slice(6)
      )
      cardsContainer.append(elementsSliderRight)

      addCardClickHandler(cardsContainer)
    }
  }
}

// cards for pets
const renderCardsToDomPets = containerSelector => {
  if (containerSelector) {
    let cardsContainer = getCardsContainer(containerSelector)

    if (cardsContainer) {
      for (let i = 1; i < 7; i++) {
        const cards = generateCards(initialCards, 8)
        const cardsPage = generateElementSlider(
          cards,
          'pagination__page',
          `${i}`,
          getArrRandomIndexes()
        )
        cardsContainer.append(cardsPage)
      }

      addCardClickHandler(cardsContainer)
    }
  }
}

// popup for cards
const addCardClickHandler = cardsContainer => {
  cardsContainer.addEventListener('click', e => {
    if (e.target.closest('.card')) {
      let clickedCardId = e.target.closest('.card').getAttribute('data-id')
      let clickedCardData = getClickedData(clickedCardId)

      renderCardPopupWindow(clickedCardData)
    }
  })
}

const getClickedData = id => {
  return initialCards.find(card => card.id == id)
}

const renderCardPopupWindow = cardData => {
  let popupCard = new PopupCard('card-popup', cardData)
  popupCard.renderPopupCard()
}

// slider
const moveLeft = () => {
  carousel.classList.add('transition-left')
  btnLeftSlider.removeEventListener('click', moveLeft)
  btnRightSlider.removeEventListener('click', moveRight)
}

const moveRight = () => {
  carousel.classList.add('transition-right')
  btnLeftSlider.removeEventListener('click', moveLeft)
  btnRightSlider.removeEventListener('click', moveRight)
}

const fillChangedItem = (changedItem, arrNewIndexes) => {
  changedItem.innerHTML = ''
  for (let i = 0; i < 3; i++) {
    const card = new Card(
      initialCards.find(card => card.id == arrNewIndexes[i])
    )
    changedItem.append(card.generateCard())
  }
}

const createNewIndexes = arrOldIndexes => {
  const arrNewIndexes = []
  while (arrNewIndexes.length < 3) {
    let randomIndex = Math.floor(Math.random() * 8)
    if (
      !arrOldIndexes.includes(String(randomIndex)) &&
      !arrNewIndexes.includes(String(randomIndex))
    ) {
      arrNewIndexes.push(String(randomIndex))
    }
  }
  return arrNewIndexes
}

const beforeAnimation = animation => {
  let changedItem
  const leftItemContainer = document.querySelector(itemLeftSelector)
  const rightItemContainer = document.querySelector(itemRightSelector)
  const activeItemContainer = document.querySelector(itemActiveSelector)

  if (animation.animationName === 'move-left') {
    carousel.classList.remove('transition-left')
    changedItem = leftItemContainer
    rightItemContainer.innerHTML = activeItemContainer.innerHTML
    activeItemContainer.innerHTML = leftItemContainer.innerHTML
  } else {
    carousel.classList.remove('transition-right')
    changedItem = rightItemContainer
    leftItemContainer.innerHTML = activeItemContainer.innerHTML
    activeItemContainer.innerHTML = rightItemContainer.innerHTML
  }

  const indexesOldItem = Array.from(changedItem.querySelectorAll('.card'))
  const arrOldIndexes = indexesOldItem.map(i => i.getAttribute('data-id'))
  const arrNewIndexes = createNewIndexes(arrOldIndexes)

  fillChangedItem(changedItem, arrNewIndexes)

  btnLeftSlider.addEventListener('click', moveLeft)
  btnRightSlider.addEventListener('click', moveRight)
}

if (btnLeftSlider) {
  btnLeftSlider.addEventListener('click', moveLeft)
}
if (btnRightSlider) {
  btnRightSlider.addEventListener('click', moveRight)
}

if (carousel) {
  carousel.addEventListener('animationend', beforeAnimation)
}

// pagination
let count = 0
let width

const init = () => {
  const pages = document.querySelectorAll('.pagination__page')
  width = document.querySelector('.our-friends__cards').offsetWidth
  pageLine.style.width = width * pages.length + 'px'

  pages.forEach(item => {
    item.style.width = width + 'px'
    item.style.height = 'auto'
  })
  rollPage()
}

const rollPageNext = () => {
  const pages = document.querySelectorAll('.pagination__page')
  if (count + 1 < pages.length) {
    if (count === 0) {
      paginationButtonStart.classList.remove('pagination__nav-btn_inactive')
      paginationButtonPrev.classList.remove('pagination__nav-btn_inactive')
    }

    count++
    paginationButtonActive.textContent = `${count + 1}`
    rollPage()

    if (count + 1 === pages.length) {
      paginationButtonNext.classList.add('pagination__nav-btn_inactive')
      paginationButtonEnd.classList.add('pagination__nav-btn_inactive')
    }
  }
}

function rollPage() {
  pageLine.style.transform = 'translate(-' + count * width + 'px)'
}

const rollPagePrev = () => {
  if (count > 0) {
    if (count === 5) {
      paginationButtonNext.classList.remove('pagination__nav-btn_inactive')
      paginationButtonEnd.classList.remove('pagination__nav-btn_inactive')
    }

    count--
    paginationButtonActive.textContent = `${count + 1}`
    rollPage()

    if (count === 0) {
      paginationButtonStart.classList.add('pagination__nav-btn_inactive')
      paginationButtonPrev.classList.add('pagination__nav-btn_inactive')
    }
  }
}

const rollPageStart = () => {
  count = 1
  rollPagePrev()
  paginationButtonNext.classList.remove('pagination__nav-btn_inactive')
  paginationButtonEnd.classList.remove('pagination__nav-btn_inactive')
}

const rollPageEnd = () => {
  const pages = document.querySelectorAll('.pagination__page')
  count = pages.length - 2
  rollPageNext()
  paginationButtonStart.classList.remove('pagination__nav-btn_inactive')
  paginationButtonPrev.classList.remove('pagination__nav-btn_inactive')
}
