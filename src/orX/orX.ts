import { Guard } from '../types';

export const orX = <T1, T2>(guard1: Guard<T1>, guard2: Guard<T2>): Guard<T1 | T2> => (obj: unknown): obj is (T1 | T2) => guard1(obj) || guard2(obj);
