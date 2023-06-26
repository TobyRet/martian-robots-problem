export class GridError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'GridError';
  }
}

export class Grid {
  private MAX_WIDTH = 50;
  private MAX_HEIGHT = 50;
  constructor(width: number, height: number) {
    if (width > this.MAX_WIDTH || height > this.MAX_HEIGHT) {
      throw new GridError('Grid size exceeds maximum allowed size of 50x50');
    }
  }
}
