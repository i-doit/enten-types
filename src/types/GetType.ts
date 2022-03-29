export type GetType<T> = T extends (obj: unknown) => obj is infer R ? R : never;
