class SchemaConfig {
  constructor() {
    this.schema = {};
    this.fieldTypes = {};
    this.customValidations = {};
  }

  addField(fieldName, fieldType, isRequired = false) {
    this.schema[fieldName] = {
      type: fieldType,
      required: isRequired,
    };
    return this;
  }

  addCustomValidation(fieldName, validationFn) {
    if (!this.customValidations[fieldName]) {
      this.customValidations[fieldName] = [];
    }
    this.customValidations[fieldName].push(validationFn);
    return this;
  }

  getSchema() {
    return this.schema;
  }

  getCustomValidations() {
    return this.customValidations;
  }
}

module.exports = SchemaConfig;
