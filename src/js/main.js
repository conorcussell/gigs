import { getGigs, getArea, handleShuffle } from './modules/App.js';

document.onreadystatechange = function () {
  if (document.readyState === 'complete') {
    // getGigs(1);

    getArea();

    var shuffle = document.querySelector('.js-shuffle-gigs');

    shuffle.addEventListener('click', handleShuffle);
  }
};
