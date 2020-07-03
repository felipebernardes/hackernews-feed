import '../scss/main.scss';
const firebase = require('firebase/app');
const database = require('firebase/database');

//TODO set apikeys as env variables
const app = firebase.initializeApp({
  databaseURL: 'https://hacker-news.firebaseio.com/v0'
});

const db = firebase.database(app);

console.log('heyehye');
console.log('test', db, app);
console.log('test', db, app);