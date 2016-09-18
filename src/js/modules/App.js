import fetchJsonp from 'fetch-jsonp';

import { calculateDistance } from './Utils';

const state = {
  gigs: [],
  gigsNearby: [],
  maxDistance: 5,
  userPosition: {
    lat: '',
    lng: ''
  }
};

export function url(date, userPosition) {
  const apiKey = 'afM2GDbBHSRIRxf6';
  const location = userPosition ? `geo:${userPosition.lat},${userPosition.lng}` : 'clientip';
  return `http://api.songkick.com/api/3.0/events.json?apikey=${apiKey}&location=${location}&min_date=${date}&max_date=${date}`;
}

export function filterByDistance(array, userPosition, distance) {
  return array.filter((item) => {
    return calculateDistance(item, userPosition) < distance;
  });
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
    }, (error) => {
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
      fadeOut(document.querySelector('.js-loading'));
      fadeIn(document.querySelector('.js-form-container'));
    }
  }).catch((ex) => {
    return ex;
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
    console.log(state.gigs, state.gigsNearby, state.maxDistance);
  } else {
    handleNoGigs();
  }
}

export function handleNoGigs() {
  fadeOut(document.querySelector('.js-form-container'));
}

export function renderGig(element, container) {
  container.innerHTML('element');
}
