import { GridError } from './errors';
import { RobotCommand, RobotPosition, RobotPositions } from '../robot/types';
import { Robot } from '../robot/robot';

export class Grid {
  private MAX_WIDTH = 50;
  private MAX_HEIGHT = 50;
  private robotPositions: RobotPositions = {};
  public width = 0;
  public height = 0;

  initialise(width: number, height: number) {
    if (width > this.MAX_WIDTH || height > this.MAX_HEIGHT) {
      throw new GridError(
        `Grid size exceeds maximum allowed size of ${this.MAX_HEIGHT}x${this.MAX_WIDTH}`
      );
    }
    this.width = width;
    this.height = height;
  }

  addRobot(robot: Robot) {
    const inValidPosition = this.isRobotOutsideTheGrid(robot.position);

    if (inValidPosition) {
      throw new GridError('Robot has been initialised outside the grid!');
    }

    this.robotPositions[robot.id] = robot.position;
  }

  moveRobot(command: RobotCommand) {
    const {
      robot: { id },
      moves,
    } = command;

    this.validateCommand(command);

    const currentRobotPosition = this.robotPositions[id];

    const newRobotPosition = this.calculateNewRobotPosition(
      currentRobotPosition,
      moves
    );

    const inValidPosition = this.isRobotOutsideTheGrid(newRobotPosition);

    if (inValidPosition) {
      const lostRobotPosition = {
        ...newRobotPosition,
        lost: true,
      };

      this.robotPositions[id] = lostRobotPosition;
      return lostRobotPosition;
    } else {
      this.robotPositions[id] = newRobotPosition;
      return newRobotPosition;
    }
  }

  private calculateNewRobotPosition(
    currentRobotPosition: RobotPosition,
    moves: string
  ): RobotPosition {
    let newX = currentRobotPosition.x;
    let newY = currentRobotPosition.y;
    let newOrientation = currentRobotPosition.orientation;

    for (let i = 0; i < moves.length; i++) {
      const move = moves[i];
      if (move === 'F') {
        switch (newOrientation) {
          case 'N':
            newY++;
            break;
          case 'E':
            newX++;
            break;
          case 'S':
            newY--;
            break;
          case 'W':
            newX--;
            break;
        }
      } else if (move === 'R') {
        switch (newOrientation) {
          case 'N':
            newOrientation = 'E';
            break;
          case 'E':
            newOrientation = 'S';
            break;
          case 'S':
            newOrientation = 'W';
            break;
          case 'W':
            newOrientation = 'N';
            break;
        }
      } else if (move === 'L') {
        switch (newOrientation) {
          case 'N':
            newOrientation = 'W';
            break;
          case 'E':
            newOrientation = 'N';
            break;
          case 'S':
            newOrientation = 'E';
            break;
          case 'W':
            newOrientation = 'S';
            break;
        }
      } else {
        throw new GridError(
          `Invalid move - ${move} Only F, R and L are allowed.`
        );
      }
    }

    return {
      x: newX,
      y: newY,
      orientation: newOrientation,
    };
  }

  private isRobotOutsideTheGrid(position: RobotPosition) {
    const { x, y } = position;
    return x > this.width || y > this.height;
  }

  private validateCommand(command: RobotCommand) {
    const { moves } = command;
    if (moves.length > 100) {
      throw new GridError('Command length exceeds 100 characters');
    }
  }
}
