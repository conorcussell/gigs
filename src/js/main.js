import { getUserPosition, updateValue, handleFormSubmit } from './modules/App.js';

document.onreadystatechange = function () {
  if (document.readyState === 'complete') {
    getUserPosition();


    const form = document.querySelector('.js-form');
    if (form) {
      form.addEventListener('submit', handleFormSubmit);
    }

    const range = document.querySelector('.js-distance');
    if (range) {
      range.addEventListener('input', updateValue);
    }
  }
};
