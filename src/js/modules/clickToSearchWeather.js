import emptySearchBox from './emptySearchBox';
import fetchWeatherData from './fetchWeatherData';

const clickToSearchWeather = (typedLocation) => {
  const { appDisplay, currentForecast } = window;
  emptySearchBox(window.inp);
  window.spinner.classList.remove('none');
  appDisplay.classList.add('none');
  currentForecast.classList.add('none');
  localStorage.setItem('city', typedLocation);
  fetchWeatherData(typedLocation);
};

export default clickToSearchWeather;