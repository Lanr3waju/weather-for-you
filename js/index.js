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

const emptySearchBox = (inp) => {
  inp.value = '';
};

const weatherForYouUi = (data, cityName, countryName, weatherForBg) => {
  city.textContent = `${cityName}, ${countryName}`;
  displayDate.textContent = `${toDay}, ${data[0].date}`;
  appDisplay.innerHTML = '';

  data.forEach(item => {
    const { maxTemp, mainTemp, minTemp, feelsLike, date, weather, weatherDesc } = item;
    const weatherForecast = document.createElement('div');
    weatherForecast.className = 'weather-forecast';

    const weatherUl = document.createElement('ul');
    weatherUl.className = 'weather';

    const dateEl = document.createElement('li');
    dateEl.textContent = date;

    const weatherEl = document.createElement('li');
    weatherEl.textContent = weather;

    const weatherDescEl = document.createElement('li');
    weatherDescEl.textContent = weatherDesc;

    const mainDeg = document.createElement('sup');
    mainDeg.textContent = 'o';
    const mainTempEl = document.createElement('li');
    mainTempEl.className = 'temp';
    const mainTempVal = document.createElement('p');
    mainTempVal.textContent = `Temp: ${mainTemp} `;
    mainTempEl.append(mainTempVal, mainDeg);

    const maxDeg = document.createElement('sup');
    maxDeg.textContent = 'o';
    const maxTempEl = document.createElement('li');
    maxTempEl.className = 'temp';
    const maxTempVal = document.createElement('p');
    maxTempVal.textContent = `Max Temp: ${maxTemp} `;
    maxTempEl.append(maxTempVal, maxDeg);

    const minDeg = document.createElement('sup');
    minDeg.textContent = 'o';
    const minTempEl = document.createElement('li');
    minTempEl.className = 'temp';
    const minTempVal = document.createElement('p');
    minTempVal.textContent = `Min Temp: ${minTemp} `;
    minTempEl.append(minTempVal, minDeg);

    const feelsDeg = document.createElement('sup');
    feelsDeg.textContent = 'o';
    const feelsLikeEl = document.createElement('li');
    feelsLikeEl.className = 'temp';
    const feelsLikeVal = document.createElement('p');
    feelsLikeVal.textContent = `Feels like: ${feelsLike} `;
    feelsLikeEl.append(feelsLikeVal, feelsDeg);

    const ico = document.createElement('img');
    ico.src = (`http://openweathermap.org/img/wn/${item.icon}@2x.png`);
    ico.className = 'api-icon';

    weatherUl.append(
      dateEl,
      weatherEl,
      weatherDescEl,
      mainTempEl,
      maxTempEl,
      minTempEl,
      feelsLikeEl,
    );
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

  currentForecast.innerHTML = '';

  const weatherForecast = document.createElement('div');
  weatherForecast.className = 'current';

  const weatherUl = document.createElement('ul');
  weatherUl.className = 'current-weather';

  const date = document.createElement('li');
  date.textContent = data[0].date;

  const weather = document.createElement('li');
  weather.textContent = data[0].weather;

  const weatherDesc = document.createElement('li');
  weatherDesc.textContent = data[0].weatherDesc;

  const mainDeg = document.createElement('sup');
  mainDeg.textContent = 'o';
  const mainTemp = document.createElement('li');
  mainTemp.className = 'temp';
  const mainTempVal = document.createElement('p');
  mainTempVal.textContent = `Temp: ${data[0].mainTemp} `;
  mainTemp.append(mainTempVal, mainDeg);

  const maxDeg = document.createElement('sup');
  maxDeg.textContent = 'o';
  const maxTemp = document.createElement('li');
  maxTemp.className = 'temp';
  const maxTempVal = document.createElement('p');
  maxTempVal.textContent = `Max Temp: ${data[0].mainTemp} `;
  maxTemp.append(maxTempVal, maxDeg);

  const minDeg = document.createElement('sup');
  minDeg.textContent = 'o';
  const minTemp = document.createElement('li');
  minTemp.className = 'temp';
  const minTempVal = document.createElement('p');
  minTempVal.textContent = `Min Temp: ${data[0].minTemp} `;
  minTemp.append(minTempVal, minDeg);

  const feelsDeg = document.createElement('sup');
  feelsDeg.textContent = 'o';
  const feelsLike = document.createElement('li');
  feelsLike.className = 'temp';
  const feelsLikeVal = document.createElement('p');
  feelsLikeVal.textContent = `Feels like: ${data[0].feelsLike} `;
  feelsLike.append(feelsLikeVal, feelsDeg);

  const ico = document.createElement('img');
  ico.className = 'current-icon';

  weatherUl.append(date, weather, weatherDesc, mainTemp, maxTemp, minTemp, feelsLike);
  weatherForecast.append(weatherUl, ico);

  currentForecast.classList.remove('none');
  currentForecast.append(weatherForecast);

  switch (weatherForBg) {
    case 'Rain':
      ico.src = ('../img/animated/rainy-5.svg');
      break;
    case 'Drizzle':
      ico.src = ('../img/animated/rainy-2.svg');
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
    case 'Thunderstorm':
      ico.src = ('../img/animated/thunder.svg');
      break;
    default:
      ico.src = ('../img/animated/weather.svg');
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
  } catch (e) {
    errorPrompt.classList.remove('none');
    spinner.classList.add('none');
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
  spinner.classList.add('none');
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
  emptySearchBox(inp);
};

const startApp = () => {
  spinner.classList.remove('none');
  fetchUserLocation();
  search.addEventListener('submit', clickToSearchWeather);
  closeError.addEventListener('click', () => { errorPrompt.classList.add('none'); });
};

startApp();