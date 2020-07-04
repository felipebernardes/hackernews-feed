const registerInfiniteScroll = (action) => {
 document.addEventListener('scroll', () => {
  const body = document.querySelector('body');
   const documentHeight = document.documentElement.offsetHeight;
   const howFarWindowHasScrolled = document.documentElement.scrollTop + window.innerHeight;
   const hasWindowScrolledToBottom = howFarWindowHasScrolled === documentHeight;
 
   if (hasWindowScrolledToBottom) { 
     action();
   }
 });
}

export default registerInfiniteScroll;
