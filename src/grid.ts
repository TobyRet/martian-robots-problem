import { Robot } from './robot';

export class GridError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'GridError';
  }
}

export class Grid {
  private MAX_WIDTH = 50;
  private MAX_HEIGHT = 50;
  public width: number;
  public height: number;
  constructor(width: number, height: number) {
    if (width > this.MAX_WIDTH || height > this.MAX_HEIGHT) {
      throw new GridError('Grid size exceeds maximum allowed size of 50x50');
    }
    this.width = width;
    this.height = height;
  }

  addRobot(robot: Robot) {
    if (robot.position.x > this.width || robot.position.y > this.height) {
      throw new GridError('Robot has been initialised outside the grid!');
    }
  }
}
