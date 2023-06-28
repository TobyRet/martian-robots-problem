import { RobotPosition } from './types';

export class Robot {
  public position: RobotPosition;
  public id: number;

  constructor(id: number, position: RobotPosition) {
    this.position = position;
    this.id = id;
  }
}
