const POST_LIST = document.querySelector('[data-post-list]');

const formatTimestamp = (timestamp) => {
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const date = new Date(timestamp * 1000);
  const day = date.getDate();
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();
  const hour = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
  const minute = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();

  return `${month} ${day} ${year} @ ${hour}:${minute}`;
}

const generateMarkup = (postData) => {
  return `
    <li class="post-list__item">
      <h2 class="post-list__item__title">
        <a href="https://news.ycombinator.com/item?id=${postData.id}">${postData.title}</a>
      </h2>
      <a class="post-list__item__url" href="${postData.url}">↗️ ${postData.url}</a>
      <time class="post-list__item__date">🗓 ${formatTimestamp(postData.time)}</time>
      <p class="post-list__item__author">👤by <a href="https://news.ycombinator.com/user?id=${postData.id}">${postData.by}</a></p>
      <p class="post-list__item__comments">💬 <a href="https://news.ycombinator.com/item?id=${postData.id}">${postData.descendants} comments</a></p>
      <p class="post-list__item__upvotes">🔼 ${postData.score} points</p>
    </li>
  `;
}

const renderPost = (postData, placement = 'beforeend', animationDelay = 0) => {
  if (postData.deleted || postData.dead) return;

  const markup = generateMarkup(postData);

  setTimeout(() => {
      POST_LIST.insertAdjacentHTML(placement, markup);
  }, animationDelay);
}

export default renderPost;