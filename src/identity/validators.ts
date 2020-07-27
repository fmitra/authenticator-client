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
 * do proper validation here and just check simple cases. Additional
 * validation will be done server side.
 */
export const isMaybePhone = (value: string): boolean => {
  // Remove common non numeric phone number characters: (, ), +, -, ' '
  const cleaned = value.replace(/[\(\)\+\-\ ]/g, '');
  if (!cleaned) {
    return false;
  }

  // Filter out all digits from the cleaned string. If any non
  // numeric characters are found, we will treat the user's input
  // as an email address for validation.
  const nonNumericCharFound = cleaned.replace(/\d+/g, '') !== '';
  if (nonNumericCharFound) {
    return false;
  }

  return true;
};
