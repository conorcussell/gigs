import { getUserPosition } from './modules/App.js';

document.onreadystatechange = function () {
  if (document.readyState === 'complete') {
    getUserPosition();
  }
};
