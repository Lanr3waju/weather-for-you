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
    const maxTemp = (index) => data[index].maxTemp;
    const minTemp = (index) => data[index].minTemp;

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

    // Update textContent for future weather (Max temperature and Minimum Temperature)
    minMaxTemp[0].textContent = `Max-Min Temp: ${maxTemp(0)} ${tempSymbol} - ${minTemp(0)} ${tempSymbol}`;
    minMaxTemp[1].textContent = `Max-Min Temp: ${maxTemp(1)} ${tempSymbol} - ${minTemp(1)} ${tempSymbol}`;
    minMaxTemp[2].textContent = `Max-Min Temp: ${maxTemp(2)} ${tempSymbol} - ${minTemp(2)} ${tempSymbol}`;
    minMaxTemp[3].textContent = `Max-Min Temp: ${maxTemp(3)} ${tempSymbol} - ${minTemp(3)} ${tempSymbol}`;
  }
  return data;
};

export default handleToggleUnits;