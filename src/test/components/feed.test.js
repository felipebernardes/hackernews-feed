import Feed from '../../js/components/feed';

describe('Feed', () => {
  let feed, mockedDatabase;

  beforeEach(() => {
    mockedDatabase = {
      addPostListListener: jest.fn(),
      addPostItemListener: jest.fn()
    }

    const document = {
      addEventListener: jest.fn()
    }
    
    feed = new Feed(mockedDatabase);
  })

  afterEach(() => {
    feed = null;
    mockedDatabase = null;
  })

  describe('When postListHandler is called', () => {

    describe('And there is no posts on list yet', () => {
      it('Should call renderPosts passing beforeend as parameter', () => {
        jest.spyOn(feed, 'renderPosts');
        const mockedPostIds = [100,101,102];
        feed.postListHandler(mockedPostIds);
      
        expect(feed.renderPosts).toHaveBeenCalledWith(mockedPostIds, 'beforeend');
      });
    });

    describe('And there is already posts on list', () => {
      beforeEach(() => {
        feed.state.firstPostOnListId = 99;
      });

      it('Should call renderPosts passing afterbegin as parameter and the postIds in reversed order', () => {
        jest.spyOn(feed, 'renderPosts');
        const mockedPostIds = [100,101,102];
        feed.postListHandler(mockedPostIds);
      
        expect(feed.renderPosts).toHaveBeenCalledWith(mockedPostIds.reverse(), 'afterbegin');
      });
    });
  });
});