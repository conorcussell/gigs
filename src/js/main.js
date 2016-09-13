document.onreadystatechange = function () {
  if (document.readyState === 'complete') {
    App.init();
  }
};

var App = (function App() {

  var gigs = [];
  var page = 1;
  var total = 0;

  function getGigs(page) {
    fetchJsonp('http://api.songkick.com/api/3.0/events.json?apikey=afM2GDbBHSRIRxf6&location=clientip&page=' + page, {jsonpCallback: 'jsoncallback',})
      .then(function(response) {
        return response.json()
      }).then(function(json) {
        total = json.resultsPage.totalEntries;
        var events = json.resultsPage.results.event;
        events.map(function(event) {
          gigs.push(event);
        });
        page++;
        if (page * 50 < total ) {
          getGigs(page);
        }
        console.log(page);
      }).catch(function(ex) {
        console.log('parsing failed', ex)
      })
  };

  function handleShuffle() {
    var randomIndex = Math.floor(Math.random()*gigs.length);
    var gig = gigs.splice(randomIndex, 1);
    console.log(gig[0].displayName, gigs.length, gigs);
  };

  var publicAPI = {
    init: init
  };

  return publicAPI;

  function init() {
    var shuffle = document.querySelector('js-shuffle-gigs');

    document.addEventListener('click', handleShuffle);

    getGigs(page);
  };
})();
