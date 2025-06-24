import { ValidationRule } from '../types';

export const createNumberValidators = (config: any): ValidationRule[] => {
  const rules: ValidationRule[] = [];

  // Add a type validation rule to ensure we're working with numbers
  rules.push({
    message: 'Must be a valid number',
    validate: (value: any) => value === null || value === undefined || 
              (typeof value === 'number' && !isNaN(value))
  });

  if (config.required) {
    rules.push({
      message: 'Field is required',
      validate: (value: any) => value !== null && value !== undefined && 
                typeof value === 'number' && !isNaN(value)
    });
  }

  if (config.min !== undefined) {
    rules.push({
      message: `Minimum value is ${config.min}`,
      validate: (value: any) => 
        value === null || 
        value === undefined || 
        (typeof value === 'number' && !isNaN(value) && value >= config.min)
    });
  }

  if (config.max !== undefined) {
    rules.push({
      message: `Maximum value is ${config.max}`,
      validate: (value: any) => 
        value === null || 
        value === undefined || 
        (typeof value === 'number' && !isNaN(value) && value <= config.max)
    });
  }

  return rules;
};