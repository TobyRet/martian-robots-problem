import { Robot } from './robot';

export type RobotOrientation = 'N' | 'E' | 'S' | 'W';

export type RobotPosition = {
  x: number;
  y: number;
  orientation: RobotOrientation;
  lost?: boolean;
};

export type RobotCommand = {
  robot: Robot;
  moves: string;
};

export type RobotPositions = { [key: number]: RobotPosition };
