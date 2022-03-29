export type Guard<T> = (obj: unknown) => obj is T;
