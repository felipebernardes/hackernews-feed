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
}

const renderPost = (postData, postList, placement = 'bottom') => {
  const markup = generateMarkup(postData);

  console.log('postData', postData);

  if (placement === 'bottom') {
    postList.insertAdjacentHTML('beforeend', markup);
  }

  if (placement === 'top') {
    postList.insertAdjacentHTML('afterbegin', markup);
  }
}

export default renderPost;