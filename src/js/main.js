import { getUserPosition, updateValue, handleFormSubmit, handleShuffle } from './modules/App.js';

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

    const shuffle = document.querySelector('.js-shuffle');
    if (shuffle) {
      shuffle.addEventListener('click', handleShuffle);
    }
  }
};
