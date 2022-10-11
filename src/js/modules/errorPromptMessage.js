const emptyInputMessage = document.querySelector('#empty-input-message');

const errorPromptMessage = message => {
  emptyInputMessage.textContent = message;
};

export default errorPromptMessage;