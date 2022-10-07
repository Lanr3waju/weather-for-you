const handleWeatherBackground = (weather, icon) => {
  const body = document.querySelector('body');
  switch (weather) {
    case 'Rain':
      body.classList.add('rainy');
      body.classList.remove('cloudy', 'sunny', 'snowy');
      icon.src = ('./img/rainy-7.svg');
      break;
    case 'Drizzle':
      icon.src = ('./img/rainy-2.svg');
      break;
    case 'Clouds':
      body.classList.add('cloudy');
      body.classList.remove('rainy', 'sunny', 'snowy');
      icon.src = ('./img/cloud.svg');
      break;
    case 'Clear':
      body.classList.add('sunny');
      body.classList.remove('cloudy', 'rainy', 'snowy');
      icon.src = ('./img/day.svg');
      break;
    case 'Snow':
      body.classList.add('snowy');
      body.classList.remove('cloudy', 'sunny', 'snowy');
      icon.src = ('./img/snowy-6.svg');
      break;
    case 'Thunderstorm':
      icon.src = ('./img/thunder.svg');
      break;
    default:
      body.classList.remove('cloudy', 'sunny', 'rainy', 'snowy');
      icon.src = ('./img/weather.svg');
  }
};

export default handleWeatherBackground;