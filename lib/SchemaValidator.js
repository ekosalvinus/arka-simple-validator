class SchemaValidator {
  constructor(schemaConfig) {
    this.schema = schemaConfig.getSchema();
    this.customValidations = schemaConfig.getCustomValidations();
  }

  validate(data) {
    const errors = {};

    // Validate required fields and types
    for (const fieldName in this.schema) {
      const fieldConfig = this.schema[fieldName];
      
      // Check if required field is missing
      if (fieldConfig.required && (data[fieldName] === undefined || data[fieldName] === null)) {
        errors[fieldName] = [`${fieldName} is required`];
        continue;
      }

      // Skip validation for undefined optional fields
      if (data[fieldName] === undefined) continue;

      // Type validation
      if (data[fieldName] !== null) {
        if (fieldConfig.type === 'string' && typeof data[fieldName] !== 'string') {
          this._addError(errors, fieldName, `${fieldName} must be a string`);
        } else if (fieldConfig.type === 'number' && typeof data[fieldName] !== 'number') {
          this._addError(errors, fieldName, `${fieldName} must be a number`);
        } else if (fieldConfig.type === 'boolean' && typeof data[fieldName] !== 'boolean') {
          this._addError(errors, fieldName, `${fieldName} must be a boolean`);
        } else if (fieldConfig.type === 'array' && !Array.isArray(data[fieldName])) {
          this._addError(errors, fieldName, `${fieldName} must be an array`);
        } else if (fieldConfig.type === 'object' && (typeof data[fieldName] !== 'object' || Array.isArray(data[fieldName]) || data[fieldName] === null)) {
          this._addError(errors, fieldName, `${fieldName} must be an object`);
        }
      }
    }

    // Apply custom validations
    for (const fieldName in this.customValidations) {
      if (!data[fieldName]) continue;
      
      const validations = this.customValidations[fieldName];
      for (const validationFn of validations) {
        const result = validationFn(data[fieldName], data);
        if (result !== true) {
          this._addError(errors, fieldName, result || `${fieldName} failed custom validation`);
        }
      }
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  }

  _addError(errors, fieldName, errorMsg) {
    if (!errors[fieldName]) {
      errors[fieldName] = [];
    }
    errors[fieldName].push(errorMsg);
  }
}

module.exports = SchemaValidator;
