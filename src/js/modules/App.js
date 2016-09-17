import fetchJsonp from 'fetch-jsonp';
import { randomIndex, getMonth, distance } from './Utils';

let gigs = [];
let page = 1;
let total = 0;

export function getGigs(page) {
  let date = new Date();
  date = date.toISOString().split('T')[0];

  fetchJsonp(
    `http://api.songkick.com/api/3.0/events.json?apikey=afM2GDbBHSRIRxf6&location=clientip&min_date=${date}&max_date=${date}&page=${page}`,
    {
      jsonpCallback: 'jsoncallback'
    }
  )
    .then(function(response) {
      return response.json();
    }).then(function(json) {
      total = json.resultsPage.totalEntries;
      const events = json.resultsPage.results.event;
      events.map((event) => {
        gigs.push(event);
      });
      page++;
      if (page * 50 < total ) {
        getGigs(page);
      } else {
        geolocate();
      }

      console.log(gigs);
    }).catch(function(ex) {
      console.log('parsing failed', ex);
    });
}

function geolocate() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const userPosition = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      console.log(userPosition.lat, userPosition.lng);
      filterGigs(userPosition, gigs);
    }, (error) => {
      console.log('error');
    });
  }
}

function filterGigs(userPosition, gigsToFilter) {
  console.log(gigs.length);
  gigs = gigs.filter((gig) => {
    const gigPosition = {
      lat: gig.location.lat,
      lng: gig.location.lng
    };
    console.log(distance(gigPosition.lat, gigPosition.lng, userPosition.lat, userPosition.lng));
    return distance(gigPosition.lat, gigPosition.lng, userPosition.lat, userPosition.lng) <= 50;
  });

  console.log(gigs.length, gigs);
}

export function handleShuffle() {
  const gig = gigs.splice(randomIndex(gigs), 1);
  showGig(gig);
  console.log(gigs);
}

function showGig(gig) {
  const container = document.querySelector('.js-gig');
  container.textContent = stripDate(gig[0].displayName);
}

function createGig(gig) {
  const element = document.createElement('div');
  element.textContent = '';
  return element;
}

function stripDate(string) {
  return string.slice(0, string.indexOf(` (${getMonth()}`));
}

export default getGigs;
