import callingCode from '@authenticator/identity/callingCode';
import { isMaybePhone } from '@authenticator/identity/validators';

export type ContactMethod = string;

export const PHONE: ContactMethod = 'phone';
export const EMAIL: ContactMethod = 'email';

/**
 * Determines if a string represents a user's
 * phone number or email address.
 */
export const inferContactMethod = (contact: string): ContactMethod => {
  if (isMaybePhone(contact)) {
    return PHONE;
  }

  return EMAIL;
}

/**
 * Returns an input phone number with infered country code based on
 * browser language.
 */
export const phoneWithRegion = (phoneNumber: string, language: string): string => {
  const cleaned = phoneNumber.replace(/[\(\)\-\ ]/g, '');
  if (cleaned.startsWith('+')) {
    return cleaned;
  }

  const code = callingCode(language);

  return `${code}${cleaned}`;
}
