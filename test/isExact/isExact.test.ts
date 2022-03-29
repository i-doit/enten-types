import { isExact } from '../../src/isExact';

describe('is exact', () => {
  it.each([
    [true, true, true],
    [false, true, false],
    [[], [], false],
    [[1, 2, 3], [1, 2, 3], false],
    [1, 1, true],
    [1, 2, false],
    ['test', 'test', true],
    ['test', 'other', false],
    [{ a: 1 }, { a: 1 }, false],
  ])('checks the shape', (value: unknown, toTest: unknown, expected: boolean) => {
    expect(isExact(value)(toTest)).toBe(expected);
  });
});
