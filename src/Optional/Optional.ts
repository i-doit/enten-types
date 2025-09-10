import { nullable } from '../nullable';
import { Guard } from '../types';

const optional =
  <T>(validator: Guard<T>) =>
    (obj: unknown): obj is T | undefined => {
      return typeof obj === 'undefined' || validator(obj);
    };

const optionalNull = <T>(validator: Guard<T>) => optional(nullable(validator));

export { optional, optionalNull };
