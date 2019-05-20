export const isMaybeEmail = (value: string): boolean => {
  return value.includes('@');
};

export const isMaybePhone = (value: string): boolean => {
  return !isMaybeEmail(value) && value.startsWith('+');
};
