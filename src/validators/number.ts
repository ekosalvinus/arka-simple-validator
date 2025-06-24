import { ValidationRule } from '../types';

export const createNumberValidators = (config: any): ValidationRule[] => {
  const rules: ValidationRule[] = [];

  if (config.required) {
    rules.push({
      message: 'Field is required',
      validate: (value: number) => value != null && !isNaN(value)
    });
  }

  if (config.min !== undefined) {
    rules.push({
      message: `Minimum value is ${config.min}`,
      validate: (value: number) => value == null || value >= config.min
    });
  }

  if (config.max !== undefined) {
    rules.push({
      message: `Maximum value is ${config.max}`,
      validate: (value: number) => value == null || value <= config.max
    });
  }

  return rules;
};