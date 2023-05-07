export default function createElement({
  tagName,
  className,
  textContent,
  onClickHandler,
}) {
  const element = document.createElement(tagName);
  className.split(' ').forEach((name) => {
    element.classList.add(name);
  });
  if (textContent) {
    element.textContent = textContent.toString();
  }
  if (onClickHandler) {
    element.addEventListener('click', onClickHandler);
  }
  return element;
}
