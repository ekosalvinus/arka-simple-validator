function createStringValidators(config) {
    const rules = [];
    // Required validation
    if (config.required) {
        rules.push({
            validate: (value) => {
                if (value === undefined || value === null)
                    return false;
                if (typeof value === 'string')
                    return value.trim().length > 0;
                return true;
            },
            message: 'This field is required'
        });
    }
    // Minimum length validation
    if (typeof config.minLength === 'number') {
        rules.push({
            validate: (value) => {
                if (value === undefined || value === null)
                    return true;
                return typeof value === 'string' && value.length >= config.minLength;
            },
            message: `Minimum length is ${config.minLength} characters`
        });
    }
    // Maximum length validation
    if (typeof config.maxLength === 'number') {
        rules.push({
            validate: (value) => {
                if (value === undefined || value === null)
                    return true;
                return typeof value === 'string' && value.length <= config.maxLength;
            },
            message: `Maximum length is ${config.maxLength} characters`
        });
    }
    // Pattern validation
    if (config.pattern instanceof RegExp) {
        rules.push({
            validate: (value) => {
                if (value === undefined || value === null)
                    return true;
                return typeof value === 'string' && config.pattern.test(value);
            },
            message: 'The format is invalid'
        });
    }
    return rules;
}

function createNumberValidators(config) {
    const rules = [];
    // Type validation
    rules.push({
        validate: (value) => {
            if (value === undefined || value === null)
                return true;
            return !isNaN(Number(value));
        },
        message: 'Value must be a number'
    });
    // Minimum value validation
    if (typeof config.min === 'number') {
        rules.push({
            validate: (value) => {
                if (value === undefined || value === null)
                    return true;
                return Number(value) >= config.min;
            },
            message: `Minimum value is ${config.min}`
        });
    }
    // Maximum value validation
    if (typeof config.max === 'number') {
        rules.push({
            validate: (value) => {
                if (value === undefined || value === null)
                    return true;
                return Number(value) <= config.max;
            },
            message: `Maximum value is ${config.max}`
        });
    }
    return rules;
}

function createEmailValidator() {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return {
        validate: (value) => {
            if (value === undefined || value === null || value === '')
                return true;
            return typeof value === 'string' && emailRegex.test(value);
        },
        message: 'Invalid email format'
    };
}

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

export { SimpleValidator };
//# sourceMappingURL=index.esm.js.map
