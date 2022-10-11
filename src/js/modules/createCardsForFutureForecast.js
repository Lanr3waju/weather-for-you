const createCardsForFutureForecast = apiData => {
  const { appDisplay, spinner } = window;
  appDisplay.innerHTML = '';
  apiData.forEach(item => {
    const { date, weatherDesc } = item;
    const weatherForecast = document.createElement('div');
    weatherForecast.className = 'weather-forecast';

    const weatherUl = document.createElement('ul');
    weatherUl.className = 'weather';

    const dateEl = document.createElement('li');
    dateEl.className = 'card-date';
    const forecastDay = window.daysOfTheWeek[new Date(date).getDay()];
    dateEl.textContent = forecastDay;

    const weatherDescEl = document.createElement('li');
    weatherDescEl.className = 'weather-description';
    weatherDescEl.textContent = weatherDesc;

    const mainTempEl = document.createElement('li');
    mainTempEl.className = 'temp main-feels';

    const maxMinTempEl = document.createElement('li');
    maxMinTempEl.className = 'temp max-min';

    const ico = document.createElement('img');
    ico.src = (`http://openweathermap.org/img/wn/${item.icon}@2x.png`);
    ico.className = 'api-icon';

    weatherUl.append(
      dateEl,
      weatherDescEl,
      mainTempEl,
      maxMinTempEl,
    );

    weatherForecast.append(weatherUl, ico);
    appDisplay.appendChild(weatherForecast);
    spinner.classList.add('none');
    appDisplay.classList.remove('none');
  });
};

export default createCardsForFutureForecast;