import '../scss/main.scss';
import renderPost from './actions/renderPost';
import registerInfiniteScroll from './actions/registerInfiniteScroll';
import { addPostListListener, addPostItemListener } from './services/realTimeDatabase';

const CONFIG = {
  animationDelay: 300,
  postsPerPage: 30,
}

const state = {
  initialRenderPostIds: [],
  page: 1,
  firstPostOnListId: null,
  isInfiniteScrollActive: false
}

addPostListListener((postIds) => {
  if (state.firstPostOnListId) {
    const newPostIds = postIds.filter(id => id > state.firstPostOnListId)
                              .reverse() // so newer posts render last, and stays on top of posts list;

    console.log('new posts!', newPostIds);
    renderPosts(newPostIds, 'afterbegin');
  }

  if (!state.firstPostOnListId) {
    console.log('first render!', postIds);
    
    state.firstPostOnListId = postIds[0];
    state.initialRenderPostIds = postIds;

    paginate(postIds, state.page);
  }
});

const renderPosts = (postIds, placement) => {
  postIds.forEach((postId, postIndex) => handlePostList(postId, postIndex, placement));
}

const paginate = (postIds, page) => {
    let firstPostToRender, lastPostToRender;

    if (page === 1) {
      firstPostToRender = 0;
      lastPostToRender = CONFIG.postsPerPage;
    } else {
      firstPostToRender = page * CONFIG.postsPerPage;
      lastPostToRender = (page * CONFIG.postsPerPage) + CONFIG.postsPerPage;
    }
    
    const pagePostIds = postIds.slice(firstPostToRender, lastPostToRender);

    renderPosts(pagePostIds, 'beforeend');
}

const handlePostList = (postId, postIndex, placement) => {
  addPostItemListener(postId, (post) => {
    if (placement === 'afterbegin') {
      state.firstPostOnListId = postId;
    }
    renderPost(post, placement, CONFIG.animationDelay * postIndex+1);
  });

  if (state.page === 1 && !state.isInfiniteScrollActive) {
    state.isInfiniteScrollActive = true;
    registerInfiniteScroll(() => {
      state.page++;
      paginate(state.initialRenderPostIds, state.page);
    });
  }
}