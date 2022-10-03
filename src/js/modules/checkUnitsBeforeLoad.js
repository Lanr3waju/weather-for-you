const checkUnitBeforeLoad = () => {
  if (localStorage.getItem('unit') === 'imperial') {
    window.toggle.click();
    window.windUnit = 'm/h';
    window.tempSymbol = '° F';
  }
};

export default checkUnitBeforeLoad;