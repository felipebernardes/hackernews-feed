import '../scss/main.scss';
import renderPost from './actions/renderPost';
import registerInfiniteScroll from './actions/registerInfiniteScroll';

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

const retrievePostRef = async (postId) => {
  const postRef = await db.ref(`/v0/item/${postId}`);
  return postRef;
}

const state = {
  initialRenderPostIds: [],
  page: 1,
  newestRenderedPostId: null
}

newStoriesRef.on('value', function(snapshot) {
  const newStoriesIds = snapshot.val();

  if (state.newestRenderedPostId) {
    const diff = newStoriesIds.filter(id => id > state.newestRenderedPostId);
    console.log('new posts!', diff);

    renderNewerPosts(diff);
  }

  if (!state.newestRenderedPostId) {
    console.log('first render!', newStoriesIds);
    
    state.newestRenderedPostId = newStoriesIds[0];
    state.initialRenderPostIds = newStoriesIds;

    paginate(newStoriesIds, state.page);
  }
});

const renderNewerPosts = (newPostsIds) => {
  newPostsIds
  .reverse() // so we render the newest last, and it stays on top of newest order
  .forEach(async (storyId) => {
    const postRef = await retrievePostRef(storyId);
    
    postRef.once('value', async (snapshot) => {
      const postData = await snapshot.val();
      
      if (!postData) return; //data not available yet
      // TODO retry after a few minutes

      state.newestRenderedPostId = storyId;
      renderPost(postData, postList, 'top');
    });
  });
}

const paginate = (postIds, page) => {
    let firstItemToRender, lastItemToRender, onComplete;

    if (page === 1) {
      firstItemToRender = 0;
      lastItemToRender = postsPerIteration;
    } else {
      firstItemToRender = page * postsPerIteration;
      lastItemToRender = (page * postsPerIteration) + postsPerIteration;
    }
    
    const pagePostIds = postIds.slice(firstItemToRender, lastItemToRender);

    if (page === 1) {
      onComplete = () => {
        registerInfiniteScroll(() => {
          state.page++;
          renderPosts(state.initialRenderPostIds, state.page);
        });
      }
    }
    
    renderPosts(pagePostIds, onComplete);
}

const renderPosts = (postIds, onComplete) => {
  postIds.forEach(async (storyId, idx) => {
    const postRef = await retrievePostRef(storyId);

    postRef.once('value', async (snapshot) => {
      const postData = await snapshot.val();
      
      if (!postData) return; //data not available yet

      setTimeout(() => {
        renderPost(postData, postList, 'bottom');
      }, 130 * idx+1);

        if (onComplete && postData.id === postIds[postIds.length-1]) {
          onComplete();
        } 
    });
  });
}