import handleToggleUnits from './handleToggleUnits';

const toggleUnits = () => {
  const { toggle } = window;
  if (toggle.checked) {
    window.windUnit = 'm/h';
    window.tempSymbol = '° F';
    localStorage.setItem('unit', 'imperial');
  } else {
    window.windUnit = 'km/h';
    window.tempSymbol = '° C';
    localStorage.setItem('unit', 'metric');
  }
  handleToggleUnits();
};

export default toggleUnits;