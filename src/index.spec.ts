import { helloWorld } from './index';

describe('Hello World', () => {
  it('returns the correct string', () => {
    expect(helloWorld()).toEqual('Hello, W orld!');
  });
});
