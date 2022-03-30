import { orX, isNumber, isObjectWithShape, isString } from '../../src';

describe('or', () => {
  const isUser = isObjectWithShape({
    id: isNumber,
    title: isString,
  });
  const isRole = isObjectWithShape({
    id: isString,
    role: isString,
  });
  const isEntry = orX(isUser, isRole);

  it.each([
    [{ id: 0 }, false],
    [{ title: 'test' }, false],
    [{ id: 0, title: 'test' }, true],
    [{ id: 'test', title: 'test' }, false],
    [{ id: 23, title: 'test' }, true],
    [{ id: 23, title: 123 }, false],
    [{ id: 'test', title: 123 }, false],
    [{ id: 'test', role: 'test' }, true],
    [{ id: 'test', role: 123 }, false],
    [{}, false],
  ])('checks the shape', (value: unknown, expected: boolean) => {
    expect(isEntry(value)).toBe(expected);
  });
});
