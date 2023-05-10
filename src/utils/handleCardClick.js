import PopupCard from '../pages/shared/PopupCard';
import { dataPets } from '../data/dataPets';

export default function handleCardClick(e) {
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
