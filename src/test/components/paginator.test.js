import Paginator from '../../js/components/Paginator';

describe('Paginator', () => {
  describe('When paginate is called', () => {

    const mockInput = [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
      11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
      22, 22, 23, 24, 25, 26, 27, 28, 29, 30
    ]
    describe('And page is 1', () => {
      it('Should return first page', () => {
        const expectedOutput = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        expect(Paginator.paginate(mockInput, 1)).toEqual(expectedOutput);
      })
    });

    describe('And page is different from 1: page 2', () => {
      it('Should return second page', () => {
        const expectedOutput = [11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
        expect(Paginator.paginate(mockInput, 2)).toEqual(expectedOutput);
      })
    });

    describe('And page is different from 1: page 3', () => {
      it('Should return third page', () => {
        const expectedOutput = [22, 22, 23, 24, 25, 26, 27, 28, 29, 30];
        expect(Paginator.paginate(mockInput, 3)).toEqual(expectedOutput);
      })
    });
  });
});