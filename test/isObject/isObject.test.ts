import {
  isMapOf,
  isNumber,
  isObject,
  isObjectWithShape,
  isString,
  optional,
} from '../../src/enten-types';
import { Guard } from '../../src/types';

describe('is object', () => {
  it.each([
    [[], false],
    [[1, 2, 3], false],
    [['a', 'b', 'c'], false],
    [{ a: 1 }, true],
    [true, false],
    [false, false],
    [1, false],
    ['string', false],
    [new Date(), true],
  ])('is object checks the shape', (value: unknown, expected: boolean) => {
    expect(isObject(value)).toBe(expected);
  });

  it.each([
    [[], false],
    [[1, 2, 3], false],
    [['a', 'b', 'c'], false],
    [{ a: 1 }, false],
    [{ a: 'test' }, true],
    [{ a: [] }, false],
    [true, false],
    [false, false],
    [1, false],
    ['string', false],
    [new Date(), false],
  ])('is object of checks the shape', (value: unknown, expected: boolean) => {
    expect(isObjectWithShape({
      a: isString,
    })(value)).toBe(expected);
  });

  it.each([
    [[], false],
    [[1, 2, 3], false],
    [['a', 'b', 'c'], false],
    [{ a: 1 }, false],
    [{ a: 'test', custom: 'test' }, true],
    [{ a: 'test', custom: 123 }, false],
    [{ a: [] }, false],
    [true, false],
    [false, false],
    [1, false],
    ['string', false],
  ])('is map of checks the shape', (value: unknown, expected: boolean) => {
    expect(isMapOf(isString)(value)).toBe(expected);
  });

  const isUser = isObjectWithShape({
    name: isString,
    id: isNumber,
    title: optional(isString),
  });

  it.each([
    [{}, isUser, false],
    [{ name: 'test' }, isUser, false],
    [{ name: 12 }, isUser, false],
    [{ name: 'test', id: 1 }, isUser, true],
    [{ name: 'test', id: 'test' }, isUser, false],
    [{ name: 'test', id: 1, title: 'test' }, isUser, true],
    [{ name: 'test', id: 1, title: 123 }, isUser, false],
  ])('checks the custom shape', (value: unknown, guard: Guard<unknown>, expected: boolean) => {
    expect(guard(value)).toBe(expected);
  });
});
