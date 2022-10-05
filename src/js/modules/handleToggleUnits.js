const handleToggleUnits = () => {
  let data;
  const { tempSymbol, windUnit } = window;
  if (localStorage.getItem('unit') === 'imperial') {
    data = window.dataImperial;
  } else {
    data = window.dataMetric;
  }
  if (document.querySelector('.weather-forecast')) {
    const mainTemp = (index) => data[index].mainTemp;
    const feelsLike = (index) => data[index].feelsLike;
    const humidity = (index) => data[index].humid;
    const windSpeed = (index) => data[index].windSpeed;

    const mainFeelsTemp = document.getElementsByClassName('main-feels');
    const minMaxTemp = document.getElementsByClassName('max-min');

    // Update textContent for current weather
    document.querySelector('.current-temp').textContent = `${data[0].mainTemp} ${tempSymbol}`;
    document.querySelector('.current-feels-like').textContent = `Feels Like ${data[0].feelsLike} ${tempSymbol}`;
    document.querySelector('.current-max-min').textContent = `Max-Min Temp: ${data[0].maxTemp} ${tempSymbol} - ${data[0].minTemp} ${tempSymbol} `;
    document.querySelector('.wind-speed').textContent = `Wind Speed: ${data[0].windSpeed} ${windUnit}`;

    // Update textContent for future weather (Main temperature and Feels-like)
    mainFeelsTemp[0].textContent = `Main-Temp (Feels-Like): ${mainTemp(0)} ${tempSymbol} - ${feelsLike(0)} ${tempSymbol}`;
    mainFeelsTemp[1].textContent = `Main-Temp (Feels-Like): ${mainTemp(1)} ${tempSymbol} - ${feelsLike(1)} ${tempSymbol}`;
    mainFeelsTemp[2].textContent = `Main-Temp (Feels-Like): ${mainTemp(2)} ${tempSymbol} - ${feelsLike(2)} ${tempSymbol}`;
    mainFeelsTemp[3].textContent = `Main-Temp (Feels-Like): ${mainTemp(3)} ${tempSymbol} - ${feelsLike(3)} ${tempSymbol}`;

    // Update textContent for future weather (Humidity and WindSpeed)
    minMaxTemp[0].textContent = `Humidity - Wind speed: ${humidity(0)}% - ${windSpeed(0)} ${windUnit}`;
    minMaxTemp[1].textContent = `Humidity - Wind speed: ${humidity(1)}% - ${windSpeed(1)} ${windUnit}`;
    minMaxTemp[2].textContent = `Humidity - Wind speed: ${humidity(2)}% - ${windSpeed(2)} ${windUnit}`;
    minMaxTemp[3].textContent = `Humidity - Wind speed: ${humidity(3)}% - ${windSpeed(3)} ${windUnit}`;
  }
  return data;
};

export default handleToggleUnits;