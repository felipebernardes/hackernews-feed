export default class InfiniteScroll {
  constructor(action) {
    this.action = action;
    this.init();
  }

  init() {
    document.addEventListener('scroll', this.scrollHandler.bind(this));
  }

  scrollHandler() {
    const documentHeight = document.documentElement.offsetHeight;
    const bottomScrollPosition = document.documentElement.scrollTop + window.innerHeight;
    const hasWindowScrolledToBottom = bottomScrollPosition === documentHeight;

    if (hasWindowScrolledToBottom) {
      this.action();
    }
  }
}
