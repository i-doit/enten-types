import { Guard } from '../types';

const isArray = (obj: unknown): obj is Array<any> => Array.isArray(obj);

const isArrayOf = <T>(validator: Guard<T>) => (obj: unknown): obj is T[] => {
  if (!isArray(obj)) {
    return false;
  }

  return obj.filter(a => !validator(a)).length === 0;
};

export {
  isArray,
  isArrayOf,
};
