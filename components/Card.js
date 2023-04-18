export default class Card {
  constructor({ name, img, type, id, ...rest }) {
    this._name = name
    this._img = img
    this._type = type
    this._id = id
  }

  // card generator
  generateCard() {
    let template = ''
    let card = document.createElement('div')
    card.className = 'card'
    card.setAttribute('data-id', this._id)

    template += `<img class="card__image" src="${this._img}" alt="${this._type} ${this._name}">`
    template += `<h3 class="card__title">${this._name}</h3>`
    template += `<button class="card__button">Learn more</button>`

    card.innerHTML = template
    return card
  }
}
