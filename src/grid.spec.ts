import { Grid, GridError } from './grid';
import { Robot, RobotPosition } from './robot';

describe('Grid', () => {
  const robotId = 1;
  describe('initialisation', () => {
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

      const robotPosition: RobotPosition = {
        x: 5,
        y: 5,
        orientation: 'N',
      };

      const robot = new Robot(robotId, robotPosition);

      expect(() => grid.addRobot(robot)).toThrow(
        new GridError('Robot is outside the grid!')
      );
    });

    it('does not throw a GridError if a robot is added inside of the Grid', () => {
      const grid = new Grid(4, 4);

      const robotPosition: RobotPosition = {
        x: 3,
        y: 3,
        orientation: 'N',
      };

      const robot = new Robot(robotId, robotPosition);

      expect(() => grid.addRobot(robot)).not.toThrow();
    });
  });

  describe('moving a robot', () => {
    it('returns the final position of the robot', () => {
      const grid = new Grid(4, 4);

      const robotPosition: RobotPosition = {
        x: 1,
        y: 1,
        orientation: 'N',
      };

      const robot = new Robot(robotId, robotPosition);

      grid.addRobot(robot);

      const command = {
        robot,
        moves: 'RFL',
      };

      const finalPosition = grid.moveRobot(command);

      expect(finalPosition).toEqual({
        x: 2,
        y: 1,
        orientation: 'N',
      });
    });

    it('returns `lost: true` if the robot moves outside of the grid', () => {
      const grid = new Grid(4, 4);

      const robotPosition: RobotPosition = {
        x: 1,
        y: 1,
        orientation: 'N',
      };

      const robot = new Robot(robotId, robotPosition);

      grid.addRobot(robot);

      const command = {
        robot,
        moves: 'FFFFF',
      };

      const finalPosition = grid.moveRobot(command);

      expect(finalPosition).toEqual({
        x: 1,
        y: 6,
        orientation: 'N',
        lost: true,
      });
    });

    it('throws a error if an illegal command is given', () => {
      const grid = new Grid(4, 4);

      const robotPosition: RobotPosition = {
        x: 1,
        y: 1,
        orientation: 'N',
      };

      const robot = new Robot(robotId, robotPosition);

      grid.addRobot(robot);

      const command = {
        robot,
        moves: 'X',
      };

      expect(() => grid.moveRobot(command)).toThrow(
        new GridError('Invalid move - X Only F, R and L are allowed.')
      );
    });

    it('throws an error if the command is greater than 100 characters', () => {
      const grid = new Grid(4, 4);

      const robotPosition: RobotPosition = {
        x: 1,
        y: 1,
        orientation: 'N',
      };

      const robot = new Robot(robotId, robotPosition);

      grid.addRobot(robot);

      const command = {
        robot,
        moves: 'FRFL'.repeat(26),
      };

      expect(() => grid.moveRobot(command)).toThrow(
        new GridError('Command length exceeds 100 characters')
      );
    });
  });
});
