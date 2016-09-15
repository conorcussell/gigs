import { getGigs, handleShuffle } from './modules/App.js';

document.onreadystatechange = function () {
  if (document.readyState === 'complete') {
    getGigs(1);

    var shuffle = document.querySelector('.js-shuffle-gigs');

    shuffle.addEventListener('click', handleShuffle);
  }
};
