import { ValidationRule } from '../types';

export const createStringValidators = (config: any): ValidationRule[] => {
  const rules: ValidationRule[] = [];

  if (config.required) {
    rules.push({
      message: 'Field is required',
      validate: (value: string) => value != null && value.trim().length > 0
    });
  }

  if (config.minLength !== undefined) {
    rules.push({
      message: `Minimum length is ${config.minLength}`,
      validate: (value: string) => !value || value.length >= config.minLength
    });
  }

  if (config.maxLength !== undefined) {
    rules.push({
      message: `Maximum length is ${config.maxLength}`,
      validate: (value: string) => !value || value.length <= config.maxLength
    });
  }

  if (config.pattern) {
    rules.push({
      message: 'Invalid format',
      validate: (value: string) => !value || config.pattern.test(value)
    });
  }

  return rules;
};