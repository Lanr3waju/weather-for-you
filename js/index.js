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
const emptyInputMessage = document.querySelector('#empty-input-message');
const closeEmptyPrompt = document.querySelector('#close-empty-input');
const emptyInputPrompt = document.querySelector('#empty-input-prompt');
const inp = document.querySelector('#text-inp');
let windUnit = 'km/h';
let tempSymbol = '° C';
let dataMetric;
let dataImperial;
let uiCity;
let uiCountry;
let weatherForBg;
const daysOfTheWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const dateToday = new Date().getDay();

const toDay = daysOfTheWeek[dateToday];

const emptySearchBox = (inp) => {
  inp.value = '';
};

const errorPromptMessage = message => {
  emptyInputMessage.textContent = message;
};

const roundToTwo = (num) => +(`${Math.round(`${num}e+2`)}e-2`);

const convertToF = (celsius) => roundToTwo(celsius * (9 / 5) + 32);

const convertToMph = (kmh) => roundToTwo(kmh / 1.609);

const checkUnitBeforeLoad = () => {
  if (localStorage.getItem('unit') === 'imperial') {
    toggle.click();
    windUnit = 'm/h';
    tempSymbol = '° F';
  }
};

const weatherForYouUi = (data, cityName, countryName, weatherForBg) => {
  city.textContent = `${cityName}, ${countryName}`;
  displayDate.textContent = toDay;

  appDisplay.innerHTML = '';

  data.forEach(item => {
    const { maxTemp, mainTemp, minTemp, feelsLike, date, weatherDesc } = item;
    const weatherForecast = document.createElement('div');
    weatherForecast.className = 'weather-forecast';

    const weatherUl = document.createElement('ul');
    weatherUl.className = 'weather';

    const dateEl = document.createElement('li');
    dateEl.className = 'card-date';
    const forecastDay = daysOfTheWeek[new Date(date).getDay()];
    dateEl.textContent = forecastDay;

    const weatherDescEl = document.createElement('li');
    weatherDescEl.className = 'weather-description';
    weatherDescEl.textContent = weatherDesc;

    const mainTempEl = document.createElement('li');
    mainTempEl.className = 'temp';
    const mainTempVal = document.createElement('p');
    mainTempVal.textContent = `Main-Temp (Feels-Like): ${mainTemp} ${tempSymbol} - ${feelsLike} ${tempSymbol}`;
    mainTempEl.append(mainTempVal);

    const maxMinTempEl = document.createElement('li');
    maxMinTempEl.className = 'temp';
    const maxMinTempVal = document.createElement('p');
    maxMinTempVal.textContent = `Max-Min Temp: ${maxTemp} ${tempSymbol} - ${minTemp} ${tempSymbol}`;
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
  maxMinTempVal.textContent = `Max-Min Temp: ${data[0].maxTemp} ${tempSymbol} - ${data[0].minTemp} ${tempSymbol} `;
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
      body.classList.add('rainy');
      body.classList.remove('cloudy', 'sunny', 'snowy');
      ico.src = ('../img/animated/rainy-5.svg');
      break;
    case 'Drizzle':
      ico.src = ('../img/animated/rainy-2.svg');
      break;
    case 'Clouds':
      body.classList.add('cloudy');
      body.classList.remove('rainy', 'sunny', 'snowy');
      ico.src = ('../img/animated/cloudy.svg');
      break;
    case 'Clear':
      body.classList.add('sunny');
      body.classList.remove('cloudy', 'rainy', 'snowy');
      ico.src = ('../img/animated/day.svg');
      break;
    case 'Snow':
      body.classList.add('snowy');
      body.classList.remove('cloudy', 'sunny', 'snowy');
      ico.src = ('../img/animated/snowy-6.svg');
      break;
    case 'Thunderstorm':
      ico.src = ('../img/animated/thunder.svg');
      break;
    default:
      body.classList.remove('cloudy', 'sunny', 'rainy', 'snowy');
      ico.src = ('../img/animated/weather.svg');
  }
};

const fetchWeatherData = async (cityLocation = 'Lagos') => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${cityLocation}&APPID=194095d7d7f3bbd8e788854eb49fa87b&units=metric`,
      { mode: 'cors' },
    );
    const data = await response.json();
    if (data.cod !== '200') {
      const errorMessage = `${data.cod}, ${data.message}`;
      throw new Error(errorMessage);
    }
    let { list: forecast } = data;
    forecast = [...forecast.slice(0, 28)];

    const { city: { name: cityName } } = data;
    const { city: { country: countryName } } = data;
    dataMetric = [];
    dataImperial = [];

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
      const weatherItemMetric = {
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

      const weatherItemImperial = {
        weather: day.weather[0].main,
        weatherDesc: day.weather[0].description,
        mainTemp: convertToF(temp),
        maxTemp: convertToF(tempMax),
        minTemp: convertToF(tempMin),
        feelsLike: convertToF(feels),
        date: dateText,
        humid: humidity,
        windSpeed: convertToMph(speed),
        icon: day.weather[0].icon,
      };

      dataMetric = [...dataMetric, weatherItemMetric];
      dataImperial = [...dataImperial, weatherItemImperial];

      uiCity = cityName;
      uiCountry = countryName;
    }
    weatherForBg = dataMetric[0].weather;
    if (toggle.checked) {
      weatherForYouUi(dataImperial, uiCity, uiCountry, weatherForBg);
    } else {
      weatherForYouUi(dataMetric, uiCity, uiCountry, weatherForBg);
    }
    document.querySelector('#toggle-form').classList.remove('none');
    document.querySelector('#toggle-form').classList.add('toggle');
  } catch (e) {
    errorPromptMessage(e.message);
    emptyInputPrompt.classList.remove('none');
    spinner.classList.add('none');
  }
};

const toggleUnits = () => {
  if (toggle.checked) {
    windUnit = 'm/h';
    tempSymbol = '° F';
    localStorage.setItem('unit', 'imperial');
    weatherForYouUi(dataImperial, uiCity, uiCountry, weatherForBg);
  } else {
    windUnit = 'km/h';
    tempSymbol = '° C';
    localStorage.setItem('unit', 'metric');
    weatherForYouUi(dataMetric, uiCity, uiCountry, weatherForBg);
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

const errorCallBack = ({ code }) => {
  spinner.classList.add('none');

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
      // User denied the request.
      break;

    case 1:
      errorPromptMessage('Location access denied, enter location in search box');
      emptyInputPrompt.classList.remove('none');
      // Location Unavailable.
      break;

    default:
      // No default case
      break;
  }
};

const fetchUserLocation = () => {
  navigator.geolocation.getCurrentPosition(successCallBack, errorCallBack);
};

const clickToSearchWeather = (typedLocation) => {
  emptySearchBox(inp);
  spinner.classList.remove('none');
  appDisplay.classList.add('none');
  localStorage.setItem('city', typedLocation);
  currentForecast.classList.add('none');

  fetchWeatherData(typedLocation);
};

const validateUserInp = event => {
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

const startApp = () => {
  checkUnitBeforeLoad();
  spinner.classList.remove('none');
  fetchUserLocation();
  search.addEventListener('submit', validateUserInp);
  closeError.addEventListener('click', () => { errorPrompt.classList.add('none'); });
  closeEmptyPrompt.addEventListener('click', () => { emptyInputPrompt.classList.add('none'); });
  toggle.addEventListener('click', toggleUnits);
};

startApp();