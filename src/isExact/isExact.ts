const isExact = <T>(exact: T) => (obj: unknown): obj is T => obj === exact;

export {
  isExact,
};
