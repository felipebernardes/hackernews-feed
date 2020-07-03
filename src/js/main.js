import '../scss/main.scss';
import renderPost from './components/post';

const firebase = require('firebase/app');
require('firebase/database');

//TODO set apikeys as env variables
const app = firebase.initializeApp({
  databaseURL: 'https://hacker-news.firebaseio.com'
});
const db = firebase.database(app);
const newStoriesRef = db.ref('/v0/newstories');

const postsPerIteration = 30;
const postList = document.querySelector('[data-post-list]');
var firstPostId, lastPostId;
let currentPage = 1;

newStoriesRef.on('value', function(snapshot) {
  const newStoriesIds = snapshot.val();
  console.log('newStoriesIds', newStoriesIds);

  // NEW DATA
  if (firstPostId && lastPostId) {
    console.log('new posts!');
    const diff = newStoriesIds.filter(id => id > firstPostId);
    handleNewPosts(diff);
  }

  // FIRST RENDER
  if (!firstPostId && !lastPostId) {
    // TODO save these in localstorage
    console.log('first render!');
    firstPostId = newStoriesIds[0];
    lastPostId = newStoriesIds[499];

    renderPosts(newStoriesIds, currentPage);
  }
});

const handleNewPosts = (newPostsIds) => {
  newPostsIds.forEach(async (storyId) => {
    const postRef = await retrievePostRef(storyId);
    
    postRef.once('value', async (snapshot) => {
      const postData = await snapshot.val();
      
      if (postData) {
        firstPostId = storyId;
        console.log('latest', postData.title);
        console.log('latest', storyId);
        renderPost(postData, postList, 'top');
      }
    });
  });
}

window.onscroll = function(ev) {
  if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      console.log('scrolled to bottom!');
      //detach event listener
      //load more items from the original list
      //smooth scroll
      //reattach event listener
  }
};

const renderPosts = (postIds, page) => {
  postIds.slice(0, page * postsPerIteration).forEach(async (storyId, idx) => {
    const postRef = await retrievePostRef(storyId);

    postRef.once('value', async (snapshot) => {
      const postData = await snapshot.val();

      if (postData) {
        setTimeout(() => {
          renderPost(postData, postList, 'bottom');
        }, 130 * idx+1);
      }
    });
  });
}

const retrievePostRef = async (postId) => {
  const postRef = await db.ref(`/v0/item/${postId}`);
  return postRef;
}

