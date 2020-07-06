const firebase = require('firebase/app');
require('firebase/database');

export default class RealTimeDatabase {
  static get API_CONFIG() {
    return {
      databaseURL: 'https://hacker-news.firebaseio.com',
      endpoints: {
        newStories: '/v0/newstories',
        item: '/v0/item'
      }
    };
  }

  constructor() {
    if (navigator.onLine) {
      this.firebaseApp = firebase.initializeApp({
        databaseURL: RealTimeDatabase.API_CONFIG.databaseURL
      });
      this.database = firebase.database(this.firebaseApp);
      this.newStoriesRef = this.database.ref(RealTimeDatabase.API_CONFIG.endpoints.newStories);
    }

    this.offlineStorage = {
      postList: {
        get: () => JSON.parse(window.localStorage.getItem('postList')),
        set: (data) => window.localStorage.setItem('postList', JSON.stringify(data))
      },
      post: {
        get: (key) => JSON.parse(window.localStorage.getItem(key)),
        set: (data) => window.localStorage.setItem(data.id, JSON.stringify(data))
      }
    };
  }

  async getPostRef(postId) {
    const postRef = await this.database.ref(`${RealTimeDatabase.API_CONFIG.endpoints.item}/${postId}`);
    return postRef;
  }

  async handleSnapshot(snapshot, action, kind) {
    const data = await snapshot.val();
    if (!data) return;

    if (kind === 'post') {
      this.offlineStorage.post.set(data);
    } else {
      this.offlineStorage.postList.set(data);
    }
    action(data);
  }

  addPostListListener(action) {
    if (!navigator.onLine) {
      const cachedPostList = this.offlineStorage.postList.get();
      if (cachedPostList) {
        action(cachedPostList);
      }
      return;
    }

    this.newStoriesRef.once('value', (snapshot) => this.handleSnapshot(snapshot, action, 'postList'));
  }

  async addPostItemListener(postId, action) {
    if (!navigator.onLine) {
      const cachedPost = this.offlineStorage.post.get(postId);
      if (cachedPost) {
        action(cachedPost);
      }
      return;
    }

    const postRef = await this.getPostRef(postId);
    postRef.once('value', (snapshot) => this.handleSnapshot(snapshot, action, 'post'));
  }
}
