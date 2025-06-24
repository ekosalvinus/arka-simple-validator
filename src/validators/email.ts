import { ValidationRule } from '../types';

export function createEmailValidator(): ValidationRule {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  
  return {
    validate: (value) => {
      if (value === undefined || value === null || value === '') return true;
      return typeof value === 'string' && emailRegex.test(value);
    },
    message: 'Invalid email format'
  };
}