import { isBoolean } from '../../src/isBoolean';

describe('is boolean', () => {
  it.each([
    [true, true],
    [false, true],
    [[], false],
    [[1, 2, 3], false],
    [['a', 'b', 'c'], false],
    [{ a: 1 }, false],
    [0, false],
    [1, false],
    ['string', false],
    [new Date(), false],
  ])('checks the shape', (value: unknown, expected: boolean) => {
    expect(isBoolean(value)).toBe(expected);
  });
});
