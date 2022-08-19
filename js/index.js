const search = document.querySelector('form');
const spinner = document.querySelector('#spinner');
const errorPrompt = document.querySelector('#error-prompt');
const closeError = document.querySelector('#close');
const appDisplay = document.querySelector('#weather-data');
const city = document.querySelector('#city');
const displayDate = document.querySelector('#days-date');
const currentForecast = document.querySelector('#current-forecast');
const body = document.querySelector('body');
const daysOfTheWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const dateToday = new Date().getDay();
const toDay = daysOfTheWeek[dateToday];

const weatherForYouUi = (data, cityName, countryName, weatherForBg) => {
  city.textContent = `${cityName}, ${countryName}`;
  displayDate.textContent = `${toDay}, ${data[0].date}`;
  appDisplay.innerHTML = '';

  data.forEach(item => {
    const weatherForecast = document.createElement('div');
    weatherForecast.className = 'weather-forecast';

    const weatherUl = document.createElement('ul');
    weatherUl.className = 'weather';

    const date = document.createElement('li');
    date.textContent = item.date;

    const weather = document.createElement('li');
    weather.textContent = item.weather;

    const weatherDesc = document.createElement('li');
    weatherDesc.textContent = item.weatherDesc;

    const mainDeg = document.createElement('sup');
    mainDeg.textContent = 'o';
    const mainTemp = document.createElement('li');
    mainTemp.className = 'temp';
    const mainTempVal = document.createElement('p');
    mainTempVal.textContent = `Temp: ${item.mainTemp} `;
    mainTemp.append(mainTempVal, mainDeg);

    const maxDeg = document.createElement('sup');
    maxDeg.textContent = 'o';
    const maxTemp = document.createElement('li');
    maxTemp.className = 'temp';
    const maxTempVal = document.createElement('p');
    maxTempVal.textContent = `Max Temp: ${item.mainTemp} `;
    maxTemp.append(maxTempVal, maxDeg);

    const minDeg = document.createElement('sup');
    minDeg.textContent = 'o';
    const minTemp = document.createElement('li');
    minTemp.className = 'temp';
    const minTempVal = document.createElement('p');
    minTempVal.textContent = `Min Temp: ${item.minTemp} `;
    minTemp.append(minTempVal, minDeg);

    const feelsDeg = document.createElement('sup');
    feelsDeg.textContent = 'o';
    const feelsLike = document.createElement('li');
    feelsLike.className = 'temp';
    const feelsLikeVal = document.createElement('p');
    feelsLikeVal.textContent = `Feels like: ${item.feelsLike} `;
    feelsLike.append(feelsLikeVal, feelsDeg);

    const ico = document.createElement('img');
    ico.src = (`http://openweathermap.org/img/wn/${item.icon}@2x.png`);
    ico.className = 'api-icon';

    weatherUl.append(date, weather, weatherDesc, mainTemp, maxTemp, minTemp, feelsLike);
    weatherForecast.append(weatherUl, ico);
    appDisplay.appendChild(weatherForecast);
    spinner.classList.add('none');
    appDisplay.classList.remove('none');
  });

  switch (weatherForBg) {
    case 'Rain':
      body.classList.add('rainy');
      body.classList.remove('cloudy', 'sunny', 'snowy');
      break;
    case 'Clouds':
      body.classList.add('cloudy');
      body.classList.remove('rainy', 'sunny', 'snowy');
      break;
    case 'Clear':
      body.classList.add('sunny');
      body.classList.remove('cloudy', 'rainy', 'snowy');
      break;
    case 'Snow':
      body.classList.add('snowy');
      body.classList.remove('cloudy', 'sunny', 'snowy');
      break;
    default:
      body.classList.remove('cloudy', 'sunny', 'rainy', 'snowy');
  }
};

const fetchWeatherData = async cityLocation => {
  const unit = 'metric';
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${cityLocation}&APPID=194095d7d7f3bbd8e788854eb49fa87b&units=${unit}`,
      { mode: 'cors' },
    );
    const data = await response.json();
    let { list: forecast } = data;
    forecast = [...forecast.slice(0, 28)];
    const { city: { name: cityName } } = data;
    const { city: { country: countryName } } = data;

    let apiCall = [];
    for (let f = 0; f < forecast.length; f += 7) {
      const day = forecast[f];
      const { main:
        {
          temp, temp_max: tempMax,
          temp_min: tempMin,
          feels_like: feels,
        },
      dt_txt: dateText,
      } = day;
      const weatherItem = {
        weather: day.weather[0].main,
        weatherDesc: day.weather[0].description,
        mainTemp: temp,
        maxTemp: tempMax,
        minTemp: tempMin,
        feelsLike: feels,
        date: dateText,
        icon: day.weather[0].icon,
      };
      apiCall = [...apiCall, weatherItem];
    }

    const weatherForBg = apiCall[0].weather;
    weatherForYouUi(apiCall, cityName, countryName, weatherForBg);

    currentForecast.innerHTML = '';

    const weatherForecast = document.createElement('div');
    weatherForecast.className = 'current';

    const weatherUl = document.createElement('ul');
    weatherUl.className = 'current-weather';

    const date = document.createElement('li');
    date.textContent = apiCall[0].date;

    const weather = document.createElement('li');
    weather.textContent = apiCall[0].weather;

    const weatherDesc = document.createElement('li');
    weatherDesc.textContent = apiCall[0].weatherDesc;

    const mainDeg = document.createElement('sup');
    mainDeg.textContent = 'o';
    const mainTemp = document.createElement('li');
    mainTemp.className = 'temp';
    const mainTempVal = document.createElement('p');
    mainTempVal.textContent = `Temp: ${apiCall[0].mainTemp} `;
    mainTemp.append(mainTempVal, mainDeg);

    const maxDeg = document.createElement('sup');
    maxDeg.textContent = 'o';
    const maxTemp = document.createElement('li');
    maxTemp.className = 'temp';
    const maxTempVal = document.createElement('p');
    maxTempVal.textContent = `Max Temp: ${apiCall[0].mainTemp} `;
    maxTemp.append(maxTempVal, maxDeg);

    const minDeg = document.createElement('sup');
    minDeg.textContent = 'o';
    const minTemp = document.createElement('li');
    minTemp.className = 'temp';
    const minTempVal = document.createElement('p');
    minTempVal.textContent = `Min Temp: ${apiCall[0].minTemp} `;
    minTemp.append(minTempVal, minDeg);

    const feelsDeg = document.createElement('sup');
    feelsDeg.textContent = 'o';
    const feelsLike = document.createElement('li');
    feelsLike.className = 'temp';
    const feelsLikeVal = document.createElement('p');
    feelsLikeVal.textContent = `Feels like: ${apiCall[0].feelsLike} `;
    feelsLike.append(feelsLikeVal, feelsDeg);

    const ico = document.createElement('img');
    ico.className = 'current-icon';

    weatherUl.append(date, weather, weatherDesc, mainTemp, maxTemp, minTemp, feelsLike);
    weatherForecast.append(weatherUl, ico);

    currentForecast.classList.remove('none');
    currentForecast.append(weatherForecast);

    const curr = apiCall[0].weather;
    switch (curr) {
      case 'Rain':
        ico.src = ('../img/animated/rainy-5.svg');
        break;
      case 'Clouds':
        ico.src = ('../img/animated/cloudy.svg');
        break;
      case 'Clear':
        ico.src = ('../img/animated/day.svg');
        break;
      case 'Snow':
        ico.src = ('../img/animated/snowy-6.svg');
        break;
      case 'Thunder':
        ico.src = ('../img/animated/thunder.svg');
        break;
      default:
        ico.src = ('../img/animated/weather.svg');
    }
  } catch (e) {
    errorPrompt.classList.remove('none');
  }
};

const successCallBack = async position => {
  const { latitude, longitude } = position.coords;
  const response = await fetch(`
    https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=638bda15a7104f78984174b3cfba1ef1`);
  const data = await response.json();
  const location = data.results[0].components.state;
  fetchWeatherData(location);
};

const errorCallBack = () => {
  errorPrompt.classList.remove('none');
};

const fetchUserLocation = () => {
  navigator.geolocation.getCurrentPosition(successCallBack, errorCallBack);
};

const clickToSearchWeather = event => {
  event.preventDefault();
  spinner.classList.remove('none');
  appDisplay.classList.add('none');
  currentForecast.classList.add('none');
  const inp = document.querySelector('#text-inp');
  const cityToSearch = inp.value;
  fetchWeatherData(cityToSearch);
  inp.value = '';
};

const startApp = () => {
  spinner.classList.remove('none');
  fetchUserLocation();
  search.addEventListener('submit', clickToSearchWeather);
  closeError.addEventListener('click', errorPrompt.classList.add('none'));
};

startApp();