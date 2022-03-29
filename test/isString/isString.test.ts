import { isString } from '../../src/isString';

describe('is string', () => {
  it.each([
    [true, false],
    [false, false],
    [[], false],
    [[1, 2, 3], false],
    [['a', 'b', 'c'], false],
    [{ a: 1 }, false],
    [0, false],
    [1, false],
    ['string', true],
    [new Date(), false],
  ])('checks the shape', (value: unknown, expected: boolean) => {
    expect(isString(value)).toBe(expected);
  });
});
