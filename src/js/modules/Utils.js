export function randomIndex(array) {
  return Math.floor(Math.random() * array.length);
}

export function getMonth() {
  const d = new Date();
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  return months[d.getMonth()];
}
