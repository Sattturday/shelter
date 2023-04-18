import Popup from './Popup.js'

export default class PopupCard extends Popup {
  constructor(
    classes,
    {
      name,
      img,
      type,
      breed,
      description,
      age,
      inoculations,
      diseases,
      parasites,
    }
  ) {
    super(classes)
    this._name = name
    this._img = img
    this._type = type
    this._breed = breed
    this._description = description
    this._age = age
    this._inoculations = inoculations
    this._diseases = diseases
    this._parasites = parasites
  }

  _generateContent() {
    let template = ''
    let cardPopupContent = document.createElement('div')
    cardPopupContent.className = 'card-popup'

    this._img &&
      (template += `<img class="card-popup__image" src="${this._img}" alt="${this._type} ${this._name}">`)

    if (
      this._name ||
      this._type ||
      this._breed ||
      this._description ||
      this._age ||
      this._inoculations ||
      this._diseases ||
      this._parasites
    ) {
      template += `<div class="card-popup__content">`
      template += `<h2 class="card-popup__title">${this._name}</h2>`
      template += `<h3 class="card-popup__type-breed">${this._type} - ${this._breed}</h3>`
      template += `<p class="card-popup__description">${this._description}</p>`
      template += `<ul class="card-popup__list">`
      template += `<li class="card-popup__list-item"><span class="card-popup__list-item card-popup__list-item_bold">Age:&nbsp;</span>${this._age}</li>`
      template += `<li class="card-popup__list-item"><span class="card-popup__list-item card-popup__list-item_bold">Inoculations:&nbsp;</span>${this._inoculations}</li>`
      template += `<li class="card-popup__list-item"><span class="card-popup__list-item card-popup__list-item_bold">Diseases:&nbsp;</span>${this._diseases}</li>`
      template += `<li class="card-popup__list-item"><span class="card-popup__list-item card-popup__list-item_bold">Parasites:&nbsp;</span>${this._parasites}</li>`
      template += `</ul>`
      template += `</div>`
    }
    cardPopupContent.innerHTML = template
    return cardPopupContent
  }

  renderPopupCard() {
    let content = this._generateContent()
    super.buildPopup(content)
  }
}
