import emptySearchBox from './emptySearchBox';
import errorPromptMessage from './errorPromptMessage';
import clickToSearchWeather from './clickToSearchWeather';

const validateUserInp = event => {
  const { inp, emptyInputPrompt } = window;
  event.preventDefault();
  const typedLocation = inp.value;
  if (typedLocation.trim() === '') {
    emptySearchBox(inp);
    errorPromptMessage('Please enter a location in the search box!');
    emptyInputPrompt.classList.remove('none');
  } else {
    emptyInputPrompt.classList.add('none');
    clickToSearchWeather(typedLocation);
  }
};

export default validateUserInp;