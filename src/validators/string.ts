import { ValidationRule, ValidatorConfig } from '../types';

export function createStringValidators(config: ValidatorConfig): ValidationRule[] {
  const rules: ValidationRule[] = [];

  // Required validation
  if (config.required) {
    rules.push({
      validate: (value) => {
        if (value === undefined || value === null) return false;
        if (typeof value === 'string') return value.trim().length > 0;
        return true;
      },
      message: 'This field is required'
    });
  }

  // Minimum length validation
  if (typeof config.minLength === 'number') {
    rules.push({
      validate: (value) => {
        if (value === undefined || value === null) return true;
        return typeof value === 'string' && value.length >= config.minLength!;
      },
      message: `Minimum length is ${config.minLength} characters`
    });
  }

  // Maximum length validation
  if (typeof config.maxLength === 'number') {
    rules.push({
      validate: (value) => {
        if (value === undefined || value === null) return true;
        return typeof value === 'string' && value.length <= config.maxLength!;
      },
      message: `Maximum length is ${config.maxLength} characters`
    });
  }

  // Pattern validation
  if (config.pattern instanceof RegExp) {
    rules.push({
      validate: (value) => {
        if (value === undefined || value === null) return true;
        return typeof value === 'string' && config.pattern!.test(value);
      },
      message: 'The format is invalid'
    });
  }

  return rules;
}