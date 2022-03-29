import { Guard } from '../types';

const isObject = (obj: unknown): obj is object => typeof obj === 'object';

type ValidatorMap<T> = {
  [key in keyof T]: Guard<T[key]>
};

const isObjectWithShape = <T>(fields: ValidatorMap<T>) => (obj: unknown): obj is T => {
  if (!isObject(obj)) {
    return false;
  }

  for (let field in fields) {
    // @ts-ignore
    const value = obj[field];

    if (!fields[field](value)) {
      return false;
    }
  }

  return true;
};

const isMapOf = <T>(validator: Guard<T>) => (obj: unknown): obj is Record<string, T> => {
  if (!isObject(obj)) {
    return false;
  }

  for (let key in obj) {
    // @ts-ignore
    if (!validator(obj[key])) {
      return false;
    }
  }

  return true;
};

export {
  isObject,
  isObjectWithShape,
  isMapOf,
};
