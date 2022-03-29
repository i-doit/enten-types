import { isArray, isArrayOf, isString } from '../../src/enten-types';

describe('is array', () => {
  it.each([
    [[], true],
    [[1, 2, 3], true],
    [['a', 'b', 'c'], true],
    [{ a: 1 }, false],
    [true, false],
    [false, false],
    [1, false],
    ['string', false],
    [new Date(), false],
  ])('is array checks the shape', (value: unknown, expected: boolean) => {
    expect(isArray(value)).toBe(expected);
  });

  it.each([
    [[], true],
    [[1, 2, 3], false],
    [['a', 'b', 'c'], true],
    [{ a: 1 }, false],
    [true, false],
    [false, false],
    [1, false],
    ['string', false],
    [new Date(), false],
  ])('is array of checks the shape', (value: unknown, expected: boolean) => {
    expect(isArrayOf(isString)(value)).toBe(expected);
  });
});
