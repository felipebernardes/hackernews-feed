const POST_LIST = document.querySelector('[data-post-list]');

const formatTimestamp = (timestamp) => {
  return timestamp;
}

const generateMarkup = (postData) => {
  return `
    <li class="post-list__item">
      <h2 class="post-list__item__title">
        <a href="https://news.ycombinator.com/item?id=${postData.id}">${postData.title}</a>
        &nbsp;<a href="${postData.url}">(${postData.url})<a>
        </h2>
      <time class="post-list__item__date">${formatTimestamp(postData.time)}</time>
      <p class="post-list__item__author">by ${postData.by}</p>
      <p class="post-list__item__author">id ${postData.id}</p>
    </li>
  `;

  //TODO remove id
}

const renderPost = (postData, placement = 'beforeend', delay = 0) => {
  const markup = generateMarkup(postData);

  setTimeout(() => {
      POST_LIST.insertAdjacentHTML(placement, markup);
  }, delay);
}

export default renderPost;