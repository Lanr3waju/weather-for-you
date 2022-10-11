import checkUnitBeforeLoad from './checkUnitsBeforeLoad';
import fetchUserLocation from './fetchUserLocation';
import validateUserInp from './validateUserInp';
import toggleUnits from './toggleUnits';

const startApp = () => {
  const closeEmptyPrompt = document.querySelector('#close-empty-input');
  const search = document.querySelector('form');
  checkUnitBeforeLoad();
  window.spinner.classList.remove('none');
  fetchUserLocation();
  search.addEventListener('submit', validateUserInp);
  closeEmptyPrompt.addEventListener('click', () => { window.emptyInputPrompt.classList.add('none'); });
  window.toggle.addEventListener('click', toggleUnits);
};

export default startApp;