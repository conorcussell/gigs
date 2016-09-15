import { getGigs, handleShuffle } from './modules/App.js';

document.write(
  '<script src="http://' + (location.host || 'localhost').split(':')[0] +
  ':35729/livereload.js?snipver=1"></' + 'script>'
);

document.onreadystatechange = function () {
  if (document.readyState === 'complete') {
    getGigs(1);

    var shuffle = document.querySelector('.js-shuffle-gigs');

    shuffle.addEventListener('click', handleShuffle);
  }
};
