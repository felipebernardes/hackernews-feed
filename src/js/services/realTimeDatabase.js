const firebase = require('firebase/app');
require('firebase/database');

const API_CONFIG = {
  databaseURL: 'https://hacker-news.firebaseio.com',
  endpoints: {
    newStories: '/v0/newstories',
    item: '/v0/item'
  }
}

const app = firebase.initializeApp({
  databaseURL: API_CONFIG.databaseURL
});
const database = firebase.database(app);
const newStoriesRef = database.ref(API_CONFIG.endpoints.newStories);

const getPostRef = async (postId) => {
  const postRef = await database.ref(`${API_CONFIG.endpoints.item}/${postId}`);
  return postRef;
}

const handleSnapshot = async (snapshot, action) => {
  const data = await snapshot.val();
  if (!data) return; // data not available yet, TODO retry
  action(data);
}

const addPostListListener = (action) => {
  newStoriesRef.on('value', snapshot => handleSnapshot(snapshot, action));
}

const addPostItemListener = async (postId, action) => {
  const postRef = await getPostRef(postId);
  postRef.once('value', snapshot => handleSnapshot(snapshot, action));
}

export {
  addPostListListener,
  addPostItemListener
}