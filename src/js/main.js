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


const newStoriesRef = db.ref('/v0/newstories');
newStoriesRef.on('value', function(snapshot) {
  const newStoriesIds = snapshot.val();
  console.log('newStoriesIds', newStoriesIds);
  retrievePost(newStoriesIds[0]);
});

const retrievePost = (postId) => {
  const postRef = db.ref(`/v0/item/${postId}`);
  
  postRef.once('value', function(snapshot) {
    const post = snapshot.val();
    console.log('post', post);
  })
}

