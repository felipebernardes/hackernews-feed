export default class PostRenderer {
  static get POST_LIST() {
    return document.querySelector('[data-post-list]');
  }

  static render(postData, placement = 'beforeend', animationDelay = 0) {
    if (postData.deleted || postData.dead) return;

    const markup = PostRenderer.generateMarkup(postData);

    setTimeout(() => {
      PostRenderer.POST_LIST.insertAdjacentHTML(placement, markup);
    }, animationDelay);
  }

  static formatTimestamp(timestamp) {
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const date = new Date(timestamp * 1000);
    const day = date.getDate();
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    const hour = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
    const minute = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();

    return `${month} ${day} ${year} @ ${hour}:${minute}`;
  }

  static generateMarkup(postData) {
    const postLink = `https://news.ycombinator.com/item?id=${postData.id}`;
    return `
      <li class="post-list__item">
        <h2 class="post-list__item__title">
          <a href="${postLink}">${postData.title}</a>
        </h2>
        <a class="post-list__item__url" href="${postData.url}">↗️ ${postData.url || postLink}</a>
        <time class="post-list__item__date">🗓 ${PostRenderer.formatTimestamp(postData.time)}</time>
        <p class="post-list__item__author">👤by <a href="https://news.ycombinator.com/user?id=${postData.by}">${postData.by}</a></p>
        <p class="post-list__item__comments">💬 <a href="${postLink}">${postData.descendants} comments</a></p>
        <p class="post-list__item__upvotes">🔼 ${postData.score} points</p>
      </li>`;
  }
}
