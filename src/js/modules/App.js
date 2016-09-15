import fetchJsonp from 'fetch-jsonp';
import { randomIndex, getMonth } from './Utils';

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
      }
    }).catch(function(ex) {
      console.log('parsing failed', ex);
    });
}

export function handleShuffle() {
  const gig = gigs.splice(randomIndex(gigs), 1);
  showGig(gig);
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
