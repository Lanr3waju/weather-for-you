import handleToggleUnits from './handleToggleUnits';
import createCardForCurrentForecast from './createCardForCurrentForecast';
import createCardsForFutureForecast from './createCardsForFutureForecast';

const renderWeatherData = () => {
  const dateToday = new Date().getDay();
  const toDay = window.daysOfTheWeek[dateToday];
  const city = document.querySelector('#city');
  const displayDate = document.querySelector('#days-date');
  city.textContent = `${window.uiCity}, ${window.uiCountry}`;
  displayDate.textContent = toDay;
  const data = handleToggleUnits();
  createCardsForFutureForecast(data);
  createCardForCurrentForecast(data);
  document.querySelector('#toggle-form').classList.remove('none');
  document.querySelector('#toggle-form').classList.add('toggle');
  handleToggleUnits();
};

export default renderWeatherData;