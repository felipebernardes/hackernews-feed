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

newStoriesRef.once('value', async function(snapshot) {
  const newStoriesIds = snapshot.val();
  console.log('newStoriesIds', newStoriesIds);

  newStoriesIds.slice(0,5).forEach(async (storyId) => {
    const postRef = await retrievePostRef(storyId);

    postRef.once('value', async function(snapshot) {
      const postData = snapshot.val();
      console.log('post', postData);
  
      const postMarkup = `
        <li>
          <h2><a href="${postData.url}">${postData.title}</a></h2>
          <date>${postData.time}</date>
          <p>by ${postData.by}</p>
        </li>
      `;

      document.querySelector('ul').innerHTML += postMarkup;
    });
  });
});

const retrievePostRef = async (postId) => {
  const postRef = await db.ref(`/v0/item/${postId}`);
  return postRef;
}

