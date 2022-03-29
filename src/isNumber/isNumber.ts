const isNumber = (obj: unknown): obj is number => typeof obj === 'number';

export {
  isNumber,
};
