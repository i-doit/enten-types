import { andX, isNumber, isObjectWithShape, isString } from '../../src';

describe('and', () => {
  const isId = isObjectWithShape({
    id: isNumber,
  });
  const hasTitle = isObjectWithShape({
    title: isString,
  });
  const isUser = andX(isId, hasTitle);

  it.each([
    [{ id: 0 }, false],
    [{ title: 'test' }, false],
    [{ id: 0, title: 'test' }, true],
    [{ id: 'test', title: 'test' }, false],
    [{ id: 23, title: 'test' }, true],
    [{ id: 23, title: 123 }, false],
  ])('checks the shape', (value: unknown, expected: boolean) => {
    expect(isUser(value)).toBe(expected);
  });
});
