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
    }
  }

  constructor() {
    this.firebaseApp = firebase.initializeApp({
      databaseURL: RealTimeDatabase.API_CONFIG.databaseURL
    });

    this.database = firebase.database(this.firebaseApp);
    this.newStoriesRef = this.database.ref(RealTimeDatabase.API_CONFIG.endpoints.newStories);
  }

  async getPostRef(postId) {
    const postRef = await this.database.ref(`${RealTimeDatabase.API_CONFIG.endpoints.item}/${postId}`);
    return postRef;
  }

  async handleSnapshot(snapshot, action) {
    const data = await snapshot.val();
    if (!data) return; // data not available yet, TODO retry
    action(data);
  }

  addPostListListener(action) {
    this.newStoriesRef.on('value', snapshot => this.handleSnapshot(snapshot, action));
  }
  
  async addPostItemListener(postId, action) {
    const postRef = await this.getPostRef(postId);
    postRef.once('value', snapshot => this.handleSnapshot(snapshot, action));
  }
}