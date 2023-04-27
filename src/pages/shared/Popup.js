export default class Popup {
  constructor(classes) {
    this._class = classes
    this._popup = ''
    this._popupContent = ''
    this._popupCloseBtn = ''
    this._overlay = ''
  }

  buildPopup(content) {
    //overlay
    this._overlay = this._createDomNode(this._overlay, 'div', 'overlay')

    //popup
    this._popup = this._createDomNode(this._popup, 'div', 'popup', this._class)

    //popup content
    this._popupContent = this._createDomNode(
      this._popupContent,
      'div',
      'popup__content'
    )

    //popup close button
    this._popupCloseBtn = this._createDomNode(
      this._popupCloseBtn,
      'span',
      'popup__close-btn'
    )
    this._popupCloseBtn.innerHTML = `<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M7.42618 6.00003L11.7046 1.72158C12.0985 1.32775 12.0985 0.689213 11.7046 0.295433C11.3108 -0.0984027 10.6723 -0.0984027 10.2785 0.295433L5.99998 4.57394L1.72148 0.295377C1.32765 -0.098459 0.68917 -0.098459 0.295334 0.295377C-0.0984448 0.689213 -0.0984448 1.32775 0.295334 1.72153L4.57383 5.99997L0.295334 10.2785C-0.0984448 10.6723 -0.0984448 11.3108 0.295334 11.7046C0.68917 12.0985 1.32765 12.0985 1.72148 11.7046L5.99998 7.42612L10.2785 11.7046C10.6723 12.0985 11.3108 12.0985 11.7046 11.7046C12.0985 11.3108 12.0985 10.6723 11.7046 10.2785L7.42618 6.00003Z" fill="#292929"/>
    </svg>`

    this._setContent(content)

    this._appendModalElements()

    // bind events
    this._bindEvents()

    //open popup
    this._openPopup()
  }

  _createDomNode(node, element, ...classes) {
    node = document.createElement(element)
    node.classList.add(...classes)
    return node
  }

  _setContent(content) {
    if (typeof content === 'string') {
      this._popupContent.innerHTML = content
    } else {
      this._popupContent.innerHTML = ''
      this._popupContent.appendChild(content)
    }
  }

  _appendModalElements() {
    this._popup.append(this._popupCloseBtn)
    this._popup.append(this._popupContent)
    this._overlay.append(this._popup)
  }

  _bindEvents() {
    this._overlay.addEventListener('mousedown', this._closePopup)
  }

  _openPopup() {
    document.body.append(this._overlay)
    document.body.classList.add('_lock')
  }

  _closePopup(e) {
    let classes = e.target.classList

    if (classes.contains('overlay') || classes.contains('popup__close-btn')) {
      document.querySelector('.overlay').remove()
      document.body.classList.remove('_lock')
    }
  }
}
