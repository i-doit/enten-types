import { Guard } from '../types';

const nullable =
  <T>(validator: Guard<T>) =>
    (obj: unknown): obj is T | null => {
      return obj === null || validator(obj);
    };

export { nullable };
