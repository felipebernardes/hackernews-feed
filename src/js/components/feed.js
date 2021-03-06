import PostRenderer from './postRenderer';
import InfiniteScroll from './infiniteScroll';
import Paginator from './paginator';

export default class Feed {
  static get ANIMATION_DELAY() {
    return 100;
  }

  constructor(realTimeDatabase) {
    this.realTimeDatabase = realTimeDatabase;
    this.state = {
      initialRenderPostIds: [],
      page: 1,
      firstPostOnListId: null
    };
    this.init();
  }

  init() {
    new InfiniteScroll(this.infiniteScrollCallback.bind(this));
    this.realTimeDatabase.addPostListListener(this.postListHandler.bind(this));
  }

  postListHandler(postIds) {
    // render new posts
    if (this.state.firstPostOnListId) {
      const newPostIds = postIds.filter((id) => id > this.state.firstPostOnListId)
        .reverse(); // so newer posts render last, and stays on top of posts list;

      this.renderPosts(newPostIds, 'afterbegin');
    }

    // first render
    if (!this.state.firstPostOnListId) {
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

        PostRenderer.render(post, placement, Feed.ANIMATION_DELAY * postIndex + 1);
      });
    });
  }
}
