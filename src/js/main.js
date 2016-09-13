document.onreadystatechange = function () {
  if (document.readyState === 'complete') {
    App.init();
  }
};

var App = (function App() {

  var gigs = [];

  function init() {
    getGigs();
  };

  function getGigs() {
    fetchJsonp('http://api.songkick.com/api/3.0/events.json?apikey=afM2GDbBHSRIRxf6&location=clientip&page=1', {jsonpCallback: 'jsoncallback',})
      .then(function(response) {
        return response.json()
      }).then(function(json) {
        gigs.push(json);
      }).catch(function(ex) {
        console.log('parsing failed', ex)
      })
  };

  var publicAPI = {
    init: init
  };

  return publicAPI;
})();
