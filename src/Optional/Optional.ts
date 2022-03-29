import { Guard } from '../types';

const optional = <T>(validator: Guard<T>) => (obj: unknown): obj is T | undefined => {
  return typeof obj === 'undefined' || validator(obj);
};

export {
  optional,
};
