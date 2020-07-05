
import '../scss/main.scss';
import PostRenderer from './actions/renderPost';
import InfiniteScroll from './actions/registerInfiniteScroll';
import RealTimeDatabase from './services/realTimeDatabase';
import Paginator from './actions/paginator';

export default class Feed {

  static get ANIMATION_DELAY() {
    return 100;
  };

  constructor() {
    this.realTimeDatabase = new RealTimeDatabase();
    this.state = {
      initialRenderPostIds: [],
      page: 1,
      firstPostOnListId: null,
      isInfiniteScrollActive: false
    }
    this.init();
  }

  init() {
    new InfiniteScroll(this.infiniteScrollCallback.bind(this));
    this.realTimeDatabase.addPostListListener(this.postListHandler.bind(this));
  }

  // Handle new HN Post List
  postListHandler(postIds) {
    if (this.state.firstPostOnListId) {
      const newPostIds = postIds.filter(id => id > this.state.firstPostOnListId)
                                .reverse(); // so newer posts render last, and stays on top of posts list;
  
      console.log('new posts!', newPostIds);
      this.renderPosts(newPostIds, 'afterbegin');
    }
  
    if (!this.state.firstPostOnListId) {
      console.log('first render!', postIds);
      
      this.state.firstPostOnListId = postIds[0];
      this.state.initialRenderPostIds = postIds;
  
      this.renderPosts(postIds, 'beforeend');
    }
  }

  infiniteScrollCallback() {
    this.state.page++;
    this.renderPosts(this.state.initialRenderPostIds, 'beforeend');
  }

  renderPosts(postIds, placement) {
    const paginatedPosts = Paginator.paginate(postIds, this.state.page);

    paginatedPosts.forEach((postId, postIndex) => {
      this.realTimeDatabase.addPostItemListener(postId, (post) => {
        if (placement === 'afterbegin') {
          this.state.firstPostOnListId = postId;
        }
    
        PostRenderer.render(post, placement, Feed.ANIMATION_DELAY * postIndex+1);
      });
    });
  }
}