const handleWeatherBackground = (weather, icon) => {
  const body = document.querySelector('body');
  switch (weather) {
    case 'Rain':
      body.classList.add('rainy');
      body.classList.remove('cloudy', 'sunny', 'snowy');
      icon.src = ('../img/animated/rainy-5.svg');
      break;
    case 'Drizzle':
      icon.src = ('../img/animated/rainy-2.svg');
      break;
    case 'Clouds':
      body.classList.add('cloudy');
      body.classList.remove('rainy', 'sunny', 'snowy');
      icon.src = ('../img/animated/cloudy.svg');
      break;
    case 'Clear':
      body.classList.add('sunny');
      body.classList.remove('cloudy', 'rainy', 'snowy');
      icon.src = ('../img/animated/day.svg');
      break;
    case 'Snow':
      body.classList.add('snowy');
      body.classList.remove('cloudy', 'sunny', 'snowy');
      icon.src = ('../img/animated/snowy-6.svg');
      break;
    case 'Thunderstorm':
      icon.src = ('../img/animated/thunder.svg');
      break;
    default:
      body.classList.remove('cloudy', 'sunny', 'rainy', 'snowy');
      icon.src = ('../img/animated/weather.svg');
  }
};

export default handleWeatherBackground;