export interface ValidationRule {
  message: string;
  validate: (value: any) => boolean;
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export interface ValidatorConfig {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  pattern?: RegExp;
  email?: boolean;
  custom?: ValidationRule[];
}