import fetchWeatherData from './fetchWeatherData';

const opencageUrl = 'https://api.opencagedata.com/geocode/v1/json?';
const opencageId = '638bda15a7104f78984174b3cfba1ef1';

const successCallBack = async position => {
  const { latitude, longitude } = position.coords;
  const response = await fetch(
    `${opencageUrl}q=${latitude}+${longitude}&key=${opencageId}`,
  );
  const data = await response.json();
  const location = data.results[0].components.state;
  fetchWeatherData(location);
};

export default successCallBack;