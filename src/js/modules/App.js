import fetchJsonp from 'fetch-jsonp';

const state = {
  events: [],
  eventsNearby: [],
  maxDistance: 5
};

export function url(date, userPosition) {
  const apiKey = 'afM2GDbBHSRIRxf6';
  const location = userPosition ? `geo:${userPosition.lat},${userPosition.lng}` : 'clientip';
  return `http://api.songkick.com/api/3.0/events.json?apikey=${apiKey}&location=${location}&min_date=${date}&max_date=${date}`;
}

export function filterByDistance(array, distance) {
  return array.filter(item => item.distance < distance);
}

// impure

export function getUserPosition() {
  let date = new Date();
  date = date.toISOString().split('T')[0];

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      getGigs(url(date, {lat: position.coords.latitude, lng: position.coords.longitude}), 1);
    }, (error) => {
      getGigs(url(date), 1);
    });
  } else {
    getGigs(url(date), 1);
  }
}

export function getGigs(url, page) {
  fetchJsonp(`${url}&page=${page}`, {jsonpCallback: 'jsoncallback'})
  .then((response) => {
    return response.json();
  }).then((json) => {
    console.log(json);
    return json;
  }).catch((ex) => {
    return ex;
  });
}

export function renderGig(element, container) {

}
