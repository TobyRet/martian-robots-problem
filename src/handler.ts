import { Grid } from './grid';
import { Robot, RobotOrientation } from './robot';

let grid = new Grid();

export const resetGrid = (): void => {
  grid = new Grid();
};

const generateRandomId = (): number => {
  return Math.floor(Math.random() * 1000) + 1;
};
const parseRobotPosition = (position: string): Robot => {
  const [x, y, orientation] = position.split(' ');
  const id = generateRandomId();
  return new Robot(id, {
    x: parseInt(x),
    y: parseInt(y),
    orientation: orientation as RobotOrientation,
  });
};

const parseGridCommand = (command: string): void => {
  const [width, height] = command.split(' ');
  grid.initialise(parseInt(width), parseInt(height));
};

const executeCommand = (position: string, moves: string): string => {
  const robot = parseRobotPosition(position);
  grid.addRobot(robot);
  const finalPosition = grid.moveRobot({ robot, moves });
  if (finalPosition) {
    return `${finalPosition.x} ${finalPosition.y} ${finalPosition.orientation}${
      finalPosition.lost ? ' LOST' : ''
    }`;
  } else {
    throw new Error('Unable to get final position');
  }
};

export const handler = (command: string): string => {
  const subCommands = command.split('\n');

  switch (subCommands.length) {
    case 2: {
      const [initialiseRobotPosition, moveRobot] = subCommands;
      return executeCommand(initialiseRobotPosition, moveRobot);
    }
    case 3: {
      const [initialiseGrid, initialiseRobotPosition, moveRobot] = subCommands;
      parseGridCommand(initialiseGrid);
      return executeCommand(initialiseRobotPosition, moveRobot);
    }
    default:
      throw new Error('Invalid command');
  }
};
