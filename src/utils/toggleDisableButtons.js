export default function toggleDisableButtons(buttons, isDisabled) {
  buttons.forEach((button) => {
    if (isDisabled) {
      button.setAttribute('disabled', 'true');
    } else {
      button.removeAttribute('disabled');
    }
  });
}
