import '../scss/main.scss';
import renderPost from './actions/renderPost';
import registerInfiniteScroll from './actions/registerInfiniteScroll';
import { addPostListListener, addPostItemListener } from './services/realTimeDatabase';

const postsPerIteration = 30;
const postList = document.querySelector('[data-post-list]');

const state = {
  initialRenderPostIds: [],
  page: 1,
  newestRenderedPostId: null
}

const handlePosts = (postIds) => {
  if (state.newestRenderedPostId) {
    const diff = postIds.filter(id => id > state.newestRenderedPostId);
    console.log('new posts!', diff);

    renderNewerPosts(diff);
  }

  if (!state.newestRenderedPostId) {
    console.log('first render!', postIds);
    
    state.newestRenderedPostId = postIds[0];
    state.initialRenderPostIds = postIds;

    paginate(postIds, state.page);
  }
}

addPostListListener(handlePosts);

const renderNewerPosts = (newPostsIds) => {
  newPostsIds
  .reverse() // so we render the newest last, and it stays on top of newest order
  .forEach(async (postId) => {
    const action = (post) => {
      state.newestRenderedPostId = postId;
      renderPost(post, postList, 'top');
    }
    
    addPostItemListener(postId, action);

      addPostListListener,
  addPostItemListener
  });
}

const renderPosts = (postIds, onRender) => {
  const isLastPost = (postId) => postId === postIds[postIds.length-1];

  postIds.forEach(async (postId, postIndex) => {
    const action = (post) => {
      setTimeout(() => {
        renderPost(post, postList, 'bottom');
      }, 130 * postIndex+1);
  
      if (onRender && isLastPost(postId)) {
        onRender();
      }
    }
    
    addPostItemListener(postId, action);

      addPostListListener,
  addPostItemListener
  });
}

const paginate = (postIds, page) => {
    let firstItemToRender, lastItemToRender, onRender;

    if (page === 1) {
      firstItemToRender = 0;
      lastItemToRender = postsPerIteration;
    } else {
      firstItemToRender = page * postsPerIteration;
      lastItemToRender = (page * postsPerIteration) + postsPerIteration;
    }
    
    const pagePostIds = postIds.slice(firstItemToRender, lastItemToRender);

    if (page === 1) {
      onRender = () => {
        registerInfiniteScroll(() => {
          state.page++;
          paginate(state.initialRenderPostIds, state.page);
        });
      }
    }
    
    renderPosts(pagePostIds, onRender);
}