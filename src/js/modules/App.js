import fetchJsonp from 'fetch-jsonp';
import { calculateDistance, randomIndex, getMonth } from './Utils';

const state = {
  gigs: [],
  gigsNearby: [],
  maxDistance: 5,
  userPosition: {
    lat: '',
    lng: ''
  }
};

// pure functions

export function url(date, userPosition) {
  const apiKey = 'afM2GDbBHSRIRxf6';
  const location = userPosition ? `geo:${userPosition.lat},${userPosition.lng}` : 'clientip';
  return `https://api.songkick.com/api/3.0/events.json?apikey=${apiKey}&location=${location}&min_date=${date}&max_date=${date}`;
}

export function filterByDistance(array, userPosition, distance) {
  return array.filter((item) => {
    return calculateDistance(item, userPosition) < distance;
  });
}

export function createGigEl(gig) {
  return `<a href="${gig.uri}" class="white text-decoration-none" target="_blank">${stripDate(gig.displayName)}</a>`;
}

// impure

export function getUserPosition() {
  let date = new Date();
  date = date.toISOString().split('T')[0];

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      state.userPosition = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      getGigs(url(date, state.userPosition), 1);
    }, (err) => {
      console.log('could not geolocate', err); // eslint-disable-line no-console
      getGigs(url(date), 1);
    });
  } else {
    getGigs(url(date), 1);
  }
}

function getGigs(url, page) {
  fetchJsonp(`${url}&page=${page}`, {jsonpCallback: 'jsoncallback'})
  .then((response) => {
    return response.json();
  }).then((json) => {
    state.gigs = state.gigs.concat(json.resultsPage.results.event.map(gig => gig));
    if (page * 50 < json.resultsPage.totalEntries) {
      getGigs(url, page + 1);
    } else {
      if (state.userPosition.lat !== '') {
        fadeOut(document.querySelector('.js-loading'));
        fadeIn(document.querySelector('.js-form-container'));
      } else {
        state.gigsNearby = state.gigs;
        fadeOut(document.querySelector('.js-loading'));
        setTimeout(() => {
          fadeIn(document.querySelector('.js-gig'));
          document.querySelector('.js-shuffle').classList.add('active');
        }, 500);
        nextGig(state.gigsNearby);
      }
    }
  }).catch((err) => {
    throw err;
  });
}

export function fadeOut(el) {
  el.classList.add('fadeOut');
  setTimeout(() => {
    el.style.display = 'none';
  }, 500);
}

export function fadeIn(el) {
  el.style.display = 'block';
  setTimeout(() => {
    el.classList.add('fadeIn');
  }, 400);
}

export function updateValue(e) {
  document.querySelector('#range-output').value = e.currentTarget.value;
}

export function handleFormSubmit(e) {
  e.preventDefault();
  const distance = e.currentTarget.querySelector('.js-distance').value;
  state.maxDistance = distance;
  state.gigsNearby = filterByDistance(state.gigs, state.userPosition, state.maxDistance);
  if (state.gigsNearby.length) {
    fadeOut(document.querySelector('.js-form-container'));
    setTimeout(() => {
      fadeIn(document.querySelector('.js-gig'));
      document.querySelector('.js-shuffle').classList.add('active');
    }, 500);
    nextGig(state.gigsNearby);
  } else {
    handleNoGigs();
  }
}

function nextGig(gigs) {
  const gig = state.gigsNearby.splice(randomIndex(gigs), 1);
  const el = createGigEl(gig[0]);
  animateColors();
  renderGig(el, document.querySelector('.js-gig'));
}

function animateColors() {
  let colors = ['#18807a','#4fba8a','#ffce6d','#ff7858','#f84045','#37457e'];

  const bg = document.querySelector('body');
  const button = document.querySelector('.js-shuffle');

  bg.style.backgroundColor = colors.splice(randomIndex(colors), 1)[0];
  button.style.backgroundColor = colors.splice(randomIndex(colors), 1)[0];
}

export function handleShuffle(e) {
  e.preventDefault();
  if (state.gigsNearby.length) {
    nextGig(state.gigsNearby);
  } else {
    handleNoGigs();
  }
}

function stripDate(title) {
  const month = getMonth();
  if (title.indexOf(month) !== -1) {
    return title.slice(0, title.indexOf(` (${month}`));
  } else {
    return title;
  }
}

export function handleNoGigs() {
  fadeOut(document.querySelector('.js-form-container'));

  const gig = document.querySelector('.js-gig');

  if (gig.style.display === 'none') { fadeIn(gig); }

  gig.innerHTML = 'No Gigs found, widen your search!';

  setTimeout(() => {
    fadeOut(gig);
    gig.innerHTML = '';
    fadeIn(document.querySelector('.js-form-container'));
  }, 2000);

  const shuffle = document.querySelector('.js-shuffle');
  if (shuffle && shuffle.classList.contains('active')) {
    shuffle.classList.remove('active');
  }
}

export function renderGig(element, container) {
  container.innerHTML = element;
}
