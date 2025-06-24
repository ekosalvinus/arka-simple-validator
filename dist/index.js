'use strict';

Object.defineProperty(exports, "__esModule", { value: true });
exports.SimpleValidator = void 0;
const tslib_1 = require("tslib");
const string_1 = require("./validators/string");
const number_1 = require("./validators/number");
const email_1 = require("./validators/email");
class SimpleValidator {
    constructor(config = {
        pattern: undefined
    }) {
        this.rules = [];
        this.buildRules(config);
    }
    buildRules(config) {
        // String validations
        if (typeof config.minLength === 'number' ||
            typeof config.maxLength === 'number' ||
            config.pattern ||
            config.required) {
            this.rules.push(...(0, string_1.createStringValidators)(config));
        }
        // Number validations
        if (typeof config.min === 'number' || typeof config.max === 'number') {
            this.rules.push(...(0, number_1.createNumberValidators)(config));
        }
        // Email validation
        if (config.email) {
            this.rules.push((0, email_1.createEmailValidator)());
        }
        // Custom validations
        if (config.custom && Array.isArray(config.custom)) {
            this.rules.push(...config.custom);
        }
    }
    validate(value) {
        const errors = [];
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
    static email() {
        return new SimpleValidator({ email: true, required: true });
    }
    static required() {
        return new SimpleValidator({ required: true });
    }
    static string(minLength, maxLength) {
        return new SimpleValidator({ required: true, minLength, maxLength });
    }
    static number(min, max) {
        return new SimpleValidator({
            min,
            max
        });
    }
}
exports.SimpleValidator = SimpleValidator;
// ValidatorConfig is imported from './types'
// Export types and utility functions
tslib_1.__exportStar(require("./types"), exports);
//# sourceMappingURL=index.js.map
