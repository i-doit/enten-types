import { isNumber } from '../../src/isNumber';

describe('is number', () => {
  it.each([
    [true, false],
    [false, false],
    [[], false],
    [[1, 2, 3], false],
    [['a', 'b', 'c'], false],
    [{ a: 1 }, false],
    [0, true],
    [1, true],
    ['string', false],
    [new Date(), false],
  ])('checks the shape', (value: unknown, expected: boolean) => {
    expect(isNumber(value)).toBe(expected);
  });
});
