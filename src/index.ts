import { ValidationResult, ValidatorConfig, ValidationRule } from './types';
import { createStringValidators } from './validators/string';
import { createNumberValidators } from './validators/number';
import { createEmailValidator } from './validators/email';

export class SimpleValidator {
  private rules: ValidationRule[] = [];

  constructor(config: ValidatorConfig = {
    pattern: undefined
  }) {
    this.buildRules(config);
  }

  private buildRules(config: ValidatorConfig): void {
    // String validations
    if (typeof config.minLength === 'number' || 
        typeof config.maxLength === 'number' || 
        config.pattern || 
        config.required) {
      this.rules.push(...createStringValidators(config));
    }

    // Number validations
    if (typeof config.min === 'number' || typeof config.max === 'number') {
      this.rules.push(...createNumberValidators(config));
    }

    // Email validation
    if (config.email) {
      this.rules.push(createEmailValidator());
    }

    // Custom validations
    if (config.custom && Array.isArray(config.custom)) {
      this.rules.push(...config.custom);
    }
  }

  validate(value: any): ValidationResult {
    const errors: string[] = [];

    for (const rule of this.rules) {
      if (!rule.validate(value)) {
        errors.push(rule.message);
      }
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  static email(): SimpleValidator {
    return new SimpleValidator({ email: true, required: true });
  }

  static required(): SimpleValidator {
    return new SimpleValidator({ required: true });
  }

  static string(minLength?: number, maxLength?: number): SimpleValidator {
    return new SimpleValidator({ required: true, minLength, maxLength });
  }

  static number(min?: number, max?: number): SimpleValidator {
    return new SimpleValidator({
      min,
      max
    });
  }
}

// Export types directly instead of using export *
export { ValidationResult, ValidatorConfig, ValidationRule } from './types';
// Export types and utility functions
export * from './types';
