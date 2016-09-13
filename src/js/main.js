document.onreadystatechange = function () {
  if (document.readyState === 'complete') {
    App.init();
  }
};

var App = (function App() {
  function init() {
    getGigs();
  };

  function getGigs() {
    fetch('http://api.songkick.com/api/3.0/events.json?apikey=afM2GDbBHSRIRxf6&location=clientip', {mode: 'no-cors'})
    .then(function(response) {
      return response.json()
    }).then(function(json) {
      console.log('parsed json', json)
    }).catch(function(ex) {
      console.log('parsing failed', ex)
    });
  };

  var publicAPI = {
    init: init
  };

  return publicAPI;
})();
