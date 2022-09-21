const search = document.querySelector('form');
const spinner = document.querySelector('#spinner');
const errorPrompt = document.querySelector('#error-prompt');
const closeError = document.querySelector('#close');
const appDisplay = document.querySelector('#weather-data');
const city = document.querySelector('#city');
const displayDate = document.querySelector('#days-date');
const currentForecast = document.querySelector('#current-forecast');
const toggle = document.querySelector('#toggle');
const body = document.querySelector('body');
const inp = document.querySelector('#text-inp');
let tempUnit = 'metric';
let windUnit = 'km/h';
let tempSymbol = '° C';
const daysOfTheWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const dateToday = new Date().getDay();

const toDay = daysOfTheWeek[dateToday];

const emptySearchBox = (inp) => {
  inp.value = '';
};

const checkUnitBeforeLoad = () => {
  if (localStorage.getItem('unit') === 'imperial') {
    toggle.click();
    tempUnit = 'imperial';
    windUnit = 'm/h';
    tempSymbol = '° F';
  }
};

const weatherForYouUi = (data, cityName, countryName, weatherForBg) => {
  city.textContent = `${cityName}, ${countryName}`;
  displayDate.textContent = `${toDay},   ${data[0].date}`;

  appDisplay.innerHTML = '';

  data.forEach(item => {
    const { maxTemp, mainTemp, minTemp, feelsLike, date, weatherDesc } = item;
    const weatherForecast = document.createElement('div');
    weatherForecast.className = 'weather-forecast';

    const weatherUl = document.createElement('ul');
    weatherUl.className = 'weather';

    const dateEl = document.createElement('li');
    dateEl.className = 'card-date';
    dateEl.textContent = date;

    const weatherDescEl = document.createElement('li');
    weatherDescEl.className = 'weather-description';
    weatherDescEl.textContent = weatherDesc;

    const mainTempEl = document.createElement('li');
    mainTempEl.className = 'temp';
    const mainTempVal = document.createElement('p');
    mainTempVal.textContent = `Main-Temperature (Feels-Like): ${mainTemp} ${tempSymbol} - ${feelsLike} ${tempSymbol}`;
    mainTempEl.append(mainTempVal);

    const maxMinTempEl = document.createElement('li');
    maxMinTempEl.className = 'temp';
    const maxMinTempVal = document.createElement('p');
    maxMinTempVal.textContent = `Max-Min Temperature: ${maxTemp} ${tempSymbol} - ${minTemp} ${tempSymbol}`;
    maxMinTempEl.append(maxMinTempVal);

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

  const weatherTempData = document.createElement('ul');
  weatherTempData.className = 'current-weather';

  const mainTemp = document.createElement('li');
  mainTemp.className = 'current-temp';
  mainTemp.textContent = `${data[0].mainTemp} ${tempSymbol}`;

  const feelsLike = document.createElement('li');
  feelsLike.className = 'current-feels-like';
  const feelsLikeVal = document.createElement('p');
  feelsLikeVal.textContent = `Feels Like ${data[0].feelsLike} ${tempSymbol}`;
  feelsLike.append(feelsLikeVal);

  const maxMinTemp = document.createElement('li');
  maxMinTemp.className = 'current-max-min';
  const maxMinTempVal = document.createElement('p');
  maxMinTempVal.textContent = `Max-Min Temperature: ${data[0].maxTemp} ${tempSymbol} - ${data[0].minTemp} ${tempSymbol} `;
  maxMinTemp.append(maxMinTempVal);

  const ico = document.createElement('img');
  ico.className = 'current-icon';

  const weatherUl = document.createElement('ul');

  const weatherDesc = document.createElement('li');
  weatherDesc.className = 'current-weather-desc';
  weatherDesc.textContent = data[0].weatherDesc;

  weatherUl.className = 'current-weather';
  const humidity = document.createElement('li');
  humidity.className = 'humidity';
  const humidityVal = document.createElement('p');
  humidityVal.textContent = `Humidity: ${data[0].humid}%`;
  humidity.append(humidityVal);

  const windSpeed = document.createElement('li');
  windSpeed.className = 'wind-speed';
  const windSpeedVal = document.createElement('p');
  windSpeedVal.textContent = `Wind Speed: ${data[0].windSpeed} ${windUnit}`;
  windSpeed.append(windSpeedVal);

  weatherTempData.append(mainTemp, feelsLike, maxMinTemp);
  weatherUl.append(weatherDesc, humidity, windSpeed);
  weatherForecast.append(weatherTempData, ico, weatherUl);

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

const fetchWeatherData = async (cityLocation = localStorage.getItem('city')) => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${cityLocation}&APPID=194095d7d7f3bbd8e788854eb49fa87b&units=${tempUnit}`,
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
          humidity,
        },
      dt_txt: dateText, wind: { speed },
      } = day;
      const weatherItem = {
        weather: day.weather[0].main,
        weatherDesc: day.weather[0].description,
        mainTemp: temp,
        maxTemp: tempMax,
        minTemp: tempMin,
        feelsLike: feels,
        date: dateText,
        humid: humidity,
        windSpeed: speed,
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
  localStorage.setItem('city', location);
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
  const cityToSearch = inp.value;
  localStorage.setItem('city', cityToSearch);
  currentForecast.classList.add('none');
  fetchWeatherData(cityToSearch);
  emptySearchBox(inp);
};

const startApp = () => {
  checkUnitBeforeLoad();
  spinner.classList.remove('none');
  fetchUserLocation();
  search.addEventListener('submit', clickToSearchWeather);
  closeError.addEventListener('click', () => { errorPrompt.classList.add('none'); });
  toggle.addEventListener('click', toggleUnits);
};

startApp();