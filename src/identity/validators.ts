/**
 * Check if a user inputted value is potentially an email
 * before submitting to the API. To keep the client light,
 * we don't do proper a validation here and just cover
 * the simple cases. Additional validation will be done
 * server side.
 */
export const isMaybeEmail = (value: string): boolean => {
  return value.includes('@') && value.includes('.');
};

/**
 * Check if a user inputted value is potentially a phone number
 * before submitting to the API. To keep the client light, we don't
 * do proper validation here and just simple cases. Additional
 * validation will be done server side.
 */
export const isMaybePhone = (value: string): boolean => {
  if (isMaybeEmail(value)) {
    return false;
  }

  if (!value.startsWith('+')) {
    return false;
  }

  if (isNaN(Number(value.substr(1)))) {
    return false;
  }

  return true;
};
