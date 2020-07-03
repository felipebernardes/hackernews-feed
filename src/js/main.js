import '../scss/main.scss';

const firebase = require('firebase/app');
require('firebase/database');

//TODO set apikeys as env variables
const app = firebase.initializeApp({
  databaseURL: 'https://hacker-news.firebaseio.com'
});

const db = firebase.database(app);

console.log('db', db);
console.log('app', app);