# Hackernews Feed 📙
An app which shows a list of the newest hackernews posts, in a charming way. Created using VanillaJS.


### Demo ✨
https://felipebernardes.github.io/hackernews-feed


### Features ✨
- Better readability: it counts with a charming, better readable UI than the HN original feed.
- Real-time updates: if there's any new posts, it will pop up on top of the feed!
- Infinite Scroll: if you reach the bottom of the list, it will show older posts.
- Offline-friendly: if you're out of internet connection, it's ok: you can check previously fetch posts.
- Installable PWA: you can install it on your Android or iOS device!
- Fast, performatic, and accessible: we have the highest lighthouse benchmark scores for these KPIs.


### Installing Dependencies ⚙️
```npm i```


### Running the App 🚀
```npm start```


### Running Tests 👩🏽‍💻
- Unit tests (jest): ```npm run test```
- Integration tests (cypress): ```npm run cypress```


### Dependencies 🛠
- Webpack, for building & local development server
- Cypress, for integration tests
- Jest, for unit tests
- Eslint, for code hints & warnings
- Firebase, for accessing HackerNews API, which is built on top of it
- Sass, for CSS preprocessing


### Files Structure 📂
|--services<br/>
|  |----realTimeDatabase.js<br/>
|<br/>
|--components<br/>
|  |----feed.js<br/>
|  |----infiniteScroll.js<br/>
|  |----paginator.js<br/>
|  |----postRenderer.js<br/>
|<br/>
|--main.js<br/>


### Known Issues ⚠️
- Sometimes, the newest post data isn't available in HN API right away;
- The API only offers the 500 newest items, so the feed/scroll isn't actually infinite;
- Pagination implementation is simplistic and has failing tests and bugs, needs to be refactored;


### Roadmap
- Make possible to read stories & comments in-app, withtout the need to access HN original post;
- Add new feed tabs like 'popular', 'ask', and 'jobs';
- Add icons for PWA;
- Background-load posts even if the user hasn't scrolled, so older posts can be shown when offline;