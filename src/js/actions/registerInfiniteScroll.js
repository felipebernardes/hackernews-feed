const registerInfiniteScroll = (action) => {
 document.addEventListener('scroll', () => {
   const documentHeight = document.documentElement.offsetHeight;
   const bottomScrollPosition = document.documentElement.scrollTop + window.innerHeight;
   const hasWindowScrolledToBottom = bottomScrollPosition === documentHeight;
 
   if (hasWindowScrolledToBottom) { 
     action();
   }
 });
}

export default registerInfiniteScroll;
