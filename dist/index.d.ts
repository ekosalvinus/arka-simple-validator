import { ValidationResult, ValidatorConfig } from './types';
export declare class SimpleValidator {
    private rules;
    constructor(config?: ValidatorConfig);
    private buildRules;
    validate(value: any): ValidationResult;
    static email(): SimpleValidator;
    static required(): SimpleValidator;
    static string(minLength?: number, maxLength?: number): SimpleValidator;
    static number(min?: number, max?: number): SimpleValidator;
}
export { ValidationResult, ValidatorConfig, ValidationRule } from './types';
export * from './types';
