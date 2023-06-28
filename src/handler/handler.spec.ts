import { handler, resetGrid } from './handler';
import { GridError } from '../grid/errors';

describe('handler', () => {
  beforeEach(() => {
    resetGrid();
  });

  it('should execute a command with grid size, robot initial position, and moves', () => {
    const command = '5 5\n1 1 N\nFFRFFL';

    const finalPosition = handler(command);

    expect(finalPosition).toEqual('3 3 N');
  });

  it(`should return the final position of the robot with 'LOST' if the robot moves outside the grid`, () => {
    const command = '5 5\n3 3 N\nFFFFF';

    const finalPosition = handler(command);

    expect(finalPosition).toEqual('3 8 N LOST');
  });

  it('should execute a command with only a robot initial position and moves', () => {
    //Note that we need to send a command first that initialises the grid
    const firstRobotCommand = '5 5\n1 1 N\nFFRFFL';

    handler(firstRobotCommand);

    const secondRobotCommand = '1 1 N\nFRFL';

    const finalPosition = handler(secondRobotCommand);

    expect(finalPosition).toEqual('2 2 N');
  });

  it('should throw an error if the grid is not first initialised', () => {
    const command = '1 1 N\nFFRFFL';

    expect(() => handler(command)).toThrow(
      new GridError('Robot has been initialised outside the grid!')
    );
  });
});
