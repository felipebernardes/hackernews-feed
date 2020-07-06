import PostRenderer from '../../js/components/postRenderer';

describe('RenderPost', () => {

  describe('When formatTimeStamp is called', () => {
    it('Should return a formated string from an unix timestamp', () => {
      const timestampInput = 1593962446;
      const expectedOutput = 'Jul 5 2020 @ 12:20';
    
      expect(PostRenderer.formatTimestamp(timestampInput)).toBe(expectedOutput);
    });
  });

  describe('When generateMarkup is called', () => {
    it('Should return an HTML markup from a postData', () => {
      const mockPostData = {
        by: "Leemarose",
        descendants: 0,
        id: 23739592,
        score: 1,
        time: 1593964456,
        title: "Can We Train GANs with Less Data",
        type: "story",
        url: "https://analyticsindiamag.com/can-we-train-gans-with-less-data/"
      };
      
      const expectedOutput = `
      <li class="post-list__item">
        <h2 class="post-list__item__title">
          <a href="https://news.ycombinator.com/item?id=23739592">Can We Train GANs with Less Data</a>
        </h2>
        <a class="post-list__item__url" href="https://analyticsindiamag.com/can-we-train-gans-with-less-data/">↗️ https://analyticsindiamag.com/can-we-train-gans-with-less-data/</a>
        <time class="post-list__item__date">🗓 Jul 5 2020 @ 12:54</time>
        <p class="post-list__item__author">👤by <a href="https://news.ycombinator.com/user?id=Leemarose">Leemarose</a></p>
        <p class="post-list__item__comments">💬 <a href="https://news.ycombinator.com/item?id=23739592">0 comments</a></p>
        <p class="post-list__item__upvotes">🔼 1 points</p>
      </li>`;
  
      expect(PostRenderer.generateMarkup(mockPostData)).toBe(expectedOutput);
    });
  });
});