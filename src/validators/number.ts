import { ValidationRule, ValidatorConfig } from '../types';

export function createNumberValidators(config: ValidatorConfig): ValidationRule[] {
  const rules: ValidationRule[] = [];

  // Type validation
  rules.push({
    validate: (value) => {
      if (value === undefined || value === null) return true;
      return !isNaN(Number(value));
    },
    message: 'Value must be a number'
  });

  // Minimum value validation
  if (typeof config.min === 'number') {
    rules.push({
      validate: (value) => {
        if (value === undefined || value === null) return true;
        return Number(value) >= config.min!;
      },
      message: `Minimum value is ${config.min}`
    });
  }

  // Maximum value validation
  if (typeof config.max === 'number') {
    rules.push({
      validate: (value) => {
        if (value === undefined || value === null) return true;
        return Number(value) <= config.max!;
      },
      message: `Maximum value is ${config.max}`
    });
  }

  return rules;
}