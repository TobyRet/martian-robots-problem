import { Grid, GridError } from './grid';
import { InitialRobotPosition, Robot } from './robot';

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

  describe('adding a robot to the Grid', () => {
    it('throws a GridError if a robot is added outside of the Grid', () => {
      const grid = new Grid(4, 4);

      const robotPosition: InitialRobotPosition = {
        x: 5,
        y: 5,
        orientation: 'N',
      };

      const robot = new Robot(robotPosition);

      expect(() => grid.addRobot(robot)).toThrow(
        new GridError('Robot has been initialised outside the grid!')
      );
    });

    it('does not throw a GridError if a robot is added inside of the Grid', () => {
      const grid = new Grid(4, 4);

      const robotPosition: InitialRobotPosition = {
        x: 3,
        y: 3,
        orientation: 'N',
      };

      const robot = new Robot(robotPosition);

      expect(() => grid.addRobot(robot)).not.toThrow();
    });
  });
});
