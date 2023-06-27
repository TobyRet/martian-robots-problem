type RobotOrientation = 'N' | 'E' | 'S' | 'W';

export type RobotPosition = {
  x: number;
  y: number;
  orientation: RobotOrientation;
};
export class Robot {
  public position: RobotPosition;
  public id: number;

  constructor(id: number, position: RobotPosition) {
    this.position = position;
    this.id = id;
  }
}
