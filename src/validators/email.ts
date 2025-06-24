import { ValidationRule } from '../types';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const createEmailValidator = (): ValidationRule => ({
  message: 'Invalid email format',
  validate: (value: string) => !value || EMAIL_REGEX.test(value)
});