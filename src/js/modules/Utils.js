export function randomIndex(array) {
  return Math.floor(Math.random() * array.length);
}

export function getMonth() {
  const d = new Date();
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  return months[d.getMonth()];
}

export function calculateDistance(gig, userPosition) {
  return distance(gig.location.lat, gig.location.lng, userPosition.lat, userPosition.lng);
}

function distance(lat1, lon1, lat2, lon2) {
  const radlat1 = Math.PI * lat1/180;
  const radlat2 = Math.PI * lat2/180;
  const radlon1 = Math.PI * lon1/180;
  const radlon2 = Math.PI * lon2/180;
  const theta = lon1-lon2;
  const radtheta = Math.PI * theta/180;
  let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
  dist = Math.acos(dist);
  dist = dist * 180/Math.PI;
  dist = dist * 60 * 1.1515;
  return dist;
}
