import convertToF from './convertToFarenheit';
import convertToMph from './convertToMph';
import renderWeatherData from './renderWeatherData';
import errorPromptMessage from './errorPromptMessage';

const { emptyInputPrompt, spinner } = window;
const openweatherUrl = 'https://api.openweathermap.org/data/2.5/forecast?';
const openweatherId = '194095d7d7f3bbd8e788854eb49fa87b';

const fetchWeatherData = async (cityLocation = 'Lagos') => {
  try {
    const response = await fetch(
      `${openweatherUrl}q=${cityLocation}&APPID=${openweatherId}&units=metric`,
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
    window.dataMetric = [];
    window.dataImperial = [];

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

      window.dataMetric = [...window.dataMetric, weatherItemMetric];
      window.dataImperial = [...window.dataImperial, weatherItemImperial];

      window.uiCity = cityName;
      window.uiCountry = countryName;
    }
    window.weatherForBg = window.dataMetric[0].weather;

    renderWeatherData();
  } catch (e) {
    errorPromptMessage(e.message);
    emptyInputPrompt.classList.remove('none');
    spinner.classList.add('none');
  }
};

export default fetchWeatherData;