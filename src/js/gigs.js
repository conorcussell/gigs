// Get JSON + Save as Objects in an Array - keys = Name, Link, Lat, Lng

$.getJSON('http://api.songkick.com/api/3.0/events.json?apikey=afM2GDbBHSRIRxf6&location=clientip&jsoncallback=?', function (data) {
   var gigArray = data;
   createGig(gigArray);
});

//Set Distance really high to not break other functions...
var createGig = function(data) {
	gigs = [];
	for (var i = 0; data.resultsPage.results.event.length > i; i++) {
        name = data.resultsPage.results.event[i].displayName;
        var n = name.indexOf("(");
        name = name.substring(0, n != -1 ? n : name.length);
        link = data.resultsPage.results.event[i].uri;
        lat = data.resultsPage.results.event[i].venue.lat;
        lng = data.resultsPage.results.event[i].venue.lng;
        status = data.resultsPage.results.event[i].status;
        if (status == "ok") {
        gigs.push({name: name, link: link, lat: lat, lng: lng, distance : 0});
        }
    }
    // Call Distance From Function
    getDistance();
};

var getDistance = function() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position) {
		  console.log("GeoLocation");
		  		userLat = position.coords.latitude;
				userLong = position.coords.longitude;
				for (var i = 0; gigs.length > i; i++) {
					var lat = gigs[i].lat;
					var lng = gigs[i].lng;
					gigs[i].distance = distance(lat, lng, userLat, userLong);	
				}
				$('.spinner').fadeOut(1000);
				setTimeout(function(){ $('.start').fadeIn(1000); }, 1000);
		},
		function (error) { 
		  if (error.code == error.PERMISSION_DENIED)
		      console.log("No Geo");
		      	$('.spinner').fadeOut(1000);
		 		setTimeout(function(){ $('.start').fadeIn(1000); }, 1000);	
		});
	}
};

// // Distance from Function

function distance(lat1, lon1, lat2, lon2) {

    var radlat1 = Math.PI * lat1/180;

    var radlat2 = Math.PI * lat2/180;

    var radlon1 = Math.PI * lon1/180;

    var radlon2 = Math.PI * lon2/180;

    var theta = lon1-lon2;

    var radtheta = Math.PI * theta/180;

    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);

    dist = Math.acos(dist);

    dist = dist * 180/Math.PI;

    dist = dist * 60 * 1.1515;

    return dist;
}

var start = function() {
	$('.start').fadeOut(1000);
	setTimeout(function(){ 
	$('.shuffle').addClass('active');
	userMaxDistance = document.querySelector('#max-distance').value;
	closeGigs = [];
	for (var i = 0; gigs.length > i; i++) {
		if (gigs[i].distance < userMaxDistance) {
				closeGigs.push("<div><a href='" + gigs[i].link + "' target='_blank'>" + gigs[i].name + "</a></div>");
			}
	}
newGig();
console.log(closeGigs);
}, 1100);
};

$('.shuffle').on('click', function(){
		newGig();
});


var newGig = function() {
	var currentGig = closeGigs[Math.floor(Math.random() * closeGigs.length)];
	closeGigs.splice($.inArray(currentGig, closeGigs), 1);
	if (!currentGig) {
		$('#here').html('No Gigs! Widen your search!');
		$('body').css('background-color', '#37457e');
		setTimeout(function(){ 
		$('#here').html('');
			setTimeout(function(){ 
		$('.shuffle').removeClass('active');
		$('.start').fadeIn();
		}, 100);
	}, 1500);
	} else {
		$('#here').html(currentGig);
		newBg();
	}
	};

// // Change BG Function


var bgs = ["#18807a","#4fba8a","#ffce6d","#ff7858","#f84045","#37457e"];
var newBg = function() {
	var showBg = bgs[Math.floor(Math.random() * bgs.length)];
	var btnBg = bgs[Math.floor(Math.random() * bgs.length)];
	$('body').css('background-color', showBg);
	$('.shuffle').css('background-color', btnBg);
};

    function outputUpdate(range) {
    document.querySelector('#range').value = range;
    }

$(document).ready(function(){
	$('.start').on('click',function(){
		start();
	});
});
