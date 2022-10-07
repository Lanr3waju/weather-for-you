import handleWeatherBackground from '../handleWeatherBackground';

const createCardForCurrentForecast = apiData => {
  const { currentForecast, weatherForBg } = window;
  currentForecast.innerHTML = '';

  const weatherForecast = document.createElement('div');
  weatherForecast.className = 'current';

  const weatherTempData = document.createElement('ul');
  weatherTempData.className = 'current-weather';

  const mainTemp = document.createElement('li');
  mainTemp.className = 'current-temp';

  const feelsLike = document.createElement('li');
  feelsLike.className = 'current-feels-like';

  const maxMinTemp = document.createElement('li');
  maxMinTemp.className = 'current-max-min';

  const ico = document.createElement('img');
  ico.className = 'current-icon';

  const weatherUl = document.createElement('ul');

  const weatherDesc = document.createElement('li');
  weatherDesc.className = 'current-weather-desc';
  weatherDesc.textContent = apiData[0].weatherDesc;

  weatherUl.className = 'current-weather';
  const humidity = document.createElement('li');
  humidity.className = 'humidity';
  humidity.textContent = `Humidity: ${apiData[0].humid}%`;

  const windSpeed = document.createElement('li');
  windSpeed.className = 'wind-speed';

  weatherTempData.append(mainTemp, feelsLike, maxMinTemp);
  weatherUl.append(weatherDesc, humidity, windSpeed);
  weatherForecast.append(weatherTempData, ico, weatherUl);

  currentForecast.classList.remove('none');
  currentForecast.append(weatherForecast);
  handleWeatherBackground(weatherForBg, ico);
};

export default createCardForCurrentForecast;