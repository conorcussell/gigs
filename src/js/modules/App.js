import fetchJsonp from 'fetch-jsonp';

export function url(date, userPosition) {
  const apiKey = 'afM2GDbBHSRIRxf6';
  const location = userPosition ? `geo:${userPosition.lat},${userPosition.lng}` : 'clientip';
  return `http://api.songkick.com/api/3.0/events.json?apikey=${apiKey}&location=${location}&min_date=${date}&max_date=${date}`;
}

export function filterByDistance(array, distance) {
  return array.filter(item => item.distance < distance);
}

export function getGigs(url, page) {
  fetchJsonp(`${url}&page=${page}`, {jsonpCallback: 'jsoncallback'})
  .then(function(response) {
    return response.json();
  }).then(function(json) {
    return json;
  }).catch(function(ex) {
    return ex;
  });
}
