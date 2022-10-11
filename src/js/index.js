import startApp from './modules/startApp';

window.spinner = document.querySelector('#spinner');
window.appDisplay = document.querySelector('#weather-data');
window.currentForecast = document.querySelector('#current-forecast');
window.toggle = document.querySelector('#toggle');
window.emptyInputPrompt = document.querySelector('#empty-input-prompt');
window.inp = document.querySelector('#text-inp');
window.windUnit = 'km/h';
window.tempSymbol = '° C';
window.daysOfTheWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./service-worker.js');
  });
}
startApp();