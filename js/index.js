const img = document.querySelector('#gif-img');
const search = document.querySelector('form');
const spinner = document.querySelector('#spinner');
const errorPrompt = document.querySelector('#error-prompt');
const closeError = document.querySelector('#close');
const appDisplay = document.querySelector('#weather-data');
const city = document.querySelector('#city');
const displayDate = document.querySelector('#days-date');
const daysOfTheWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const dateToday = new Date().getDay();
const toDay = daysOfTheWeek[dateToday];

const closeErrorPrompt = () => {
  errorPrompt.classList.add('none');
  img.classList.remove('none');
};

const fetchWeatherData = async cityLocation => {
  img.classList.add('none');
  const unit = 'metric';
  try {
    const response = await fetch(
      `http://api.openweathermap.org/data/2.5/forecast?q=${cityLocation}&APPID=194095d7d7f3bbd8e788854eb49fa87b&units=${unit}`,
      { mode: 'cors' },
    );
    const data = await response.json();
    const forecast = data.list.slice(0, 28);
    const cityName = data.city.name;
    const countryName = data.city.country;

    let apiCall = [];

    for (let f = 0; f < forecast.length; f += 7) {
      const day = forecast[f];
      const weatherItem = {
        weather: day.weather[0].main,
        weatherDesc: day.weather[0].description,
        mainTemp: day.main.temp,
        maxTemp: day.main.temp_max,
        minTemp: day.main.temp_min,
        feelsLike: day.main.feels_like,
        date: day.dt_txt,
      };
      apiCall = [...apiCall, weatherItem];
    }

    city.textContent = `${cityName}, ${countryName}`;
    displayDate.textContent = `${toDay}, ${apiCall[0].date}`;
    let weatherForecast;

    apiCall.forEach(item => {
      weatherForecast = document.createElement('div');
      weatherForecast.className = 'weather-forecast';

      const date = document.createElement('p');
      date.textContent = item.date;

      const weather = document.createElement('p');
      weather.textContent = item.weather;

      const weatherDesc = document.createElement('p');
      weatherDesc.textContent = item.weatherDesc;

      const mainTemp = document.createElement('div');
      mainTemp.className = 'temp';
      const mainTempVal = document.createElement('p');
      mainTempVal.textContent = `Temp: ${item.mainTemp} `;
      mainTemp.append(mainTempVal);

      const maxTemp = document.createElement('div');
      maxTemp.className = 'temp';
      const maxTempVal = document.createElement('p');
      maxTempVal.textContent = `Max Temp: ${item.mainTemp} `;
      maxTemp.append(maxTempVal);

      const minTemp = document.createElement('div');
      minTemp.className = 'temp';
      const minTempVal = document.createElement('p');
      minTempVal.textContent = `Min Temp: ${item.minTemp} `;
      minTemp.append(minTempVal);

      const feelsLike = document.createElement('div');
      feelsLike.className = 'temp';
      const feelsLikeVal = document.createElement('p');
      feelsLikeVal.textContent = `Feels like: ${item.feelsLike} `;
      feelsLike.append(feelsLikeVal);

      weatherForecast.append(date, weather, weatherDesc, mainTemp, maxTemp, minTemp, feelsLike);
      appDisplay.append(weatherForecast);
      spinner.classList.add('none');
      appDisplay.classList.remove('none');
    });
  } catch (e) {
    errorPrompt.classList.remove('none');
    console.log(e);
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

const clickToGetLoc = event => {
  event.preventDefault();
  const inp = document.querySelector('#text-inp');
  const cityToSearch = inp.value;
  fetchWeatherData(cityToSearch);
};

const startApp = () => {
  spinner.classList.remove('none');
  fetchUserLocation();
  search.addEventListener('submit', clickToGetLoc);
  closeError.addEventListener('click', closeErrorPrompt);
};

startApp();
