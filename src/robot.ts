type RobotOrientation = 'N' | 'E' | 'S' | 'W';

export type InitialRobotPosition = {
  x: number;
  y: number;
  orientation: RobotOrientation;
};
export class Robot {
  public position: InitialRobotPosition;
  constructor(position: InitialRobotPosition) {
    this.position = position;
  }
}
