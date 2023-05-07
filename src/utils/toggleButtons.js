export default function toggleButtons(buttons, isDisabled) {
  buttons.forEach((button) => {
    if (isDisabled) {
      button.classList.add('pagination__nav-btn_inactive');
    } else {
      button.classList.remove('pagination__nav-btn_inactive');
    }
  });
}
