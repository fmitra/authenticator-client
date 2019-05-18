export const isMaybeEmail = (value: string): boolean => {
  return value.indexOf('@') != -1;
};

export const isMaybePhone = (value: string): boolean => {
  return !isMaybeEmail(value) && value.startsWith('+');
};
