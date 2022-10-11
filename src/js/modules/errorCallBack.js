import errorPromptMessage from './errorPromptMessage';

const errorCallBack = ({ code }) => {
  const { emptyInputPrompt } = window;
  window.spinner.classList.add('none');

  // Display error based on the error code.
  switch (code) {
    case 3:
      errorPromptMessage('Timeout Please try again!');
      emptyInputPrompt.classList.remove('none');
      // Handle timeout.
      break;

    case 2:
      errorPromptMessage('Location unavailable, enter location in search box!');
      emptyInputPrompt.classList.remove('none');
      // Location Unavailable.
      break;

    case 1:
      errorPromptMessage('Location access denied, enter location in search box');
      emptyInputPrompt.classList.remove('none');
      // User denied the request.
      break;

    default:
      // No default case
      break;
  }
};

export default errorCallBack;