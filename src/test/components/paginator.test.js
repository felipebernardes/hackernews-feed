import Paginator from '../../js/components/Paginator';

describe('Paginator', () => {
  describe('When paginate is called', () => {
    describe('And page is 1', () => {
      it('Should return first page', () => {
        const mockInput = Array.from(Array(30).keys());
        const expectedOutput = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        expect(Paginator.paginate(mockInput, 1)).toBe(expectedOutput);
      })
    });

    describe('And page is different from 1', () => {
      it('Should return second page', () => {
        const mockInput = Array.from(Array(30).keys());
        const expectedOutput = [11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21];
        expect(Paginator.paginate(mockInput, 2)).toBe(expectedOutput);
      })
    });
  });
});