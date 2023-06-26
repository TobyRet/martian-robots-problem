import { Grid, GridError } from './grid';

describe('Grid', () => {
  describe('validation', () => {
    it('throws an error if the grid is initialised but exceeds the maximum width and height allowed', () => {
      expect(() => {
        new Grid(51, 51);
      }).toThrow(
        new GridError('Grid size exceeds maximum allowed size of 50x50')
      );
    });

    it('does not throw an error if the grid is initialised and does not exceed the maximum width and height allowed', () => {
      expect(() => {
        new Grid(50, 50);
      }).not.toThrow();
    });
  });
});
