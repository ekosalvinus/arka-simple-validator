# arka-simple-validator

A simple, lightweight schema validator for JavaScript objects.

## Installation

```bash
npm install arka-simple-validator
```

## Usage

```javascript
const { SchemaConfig, SchemaValidator } = require('arka-simple-validator');

// Create a schema configuration
const userSchema = new SchemaConfig()
  .addField('name', 'string', true)
  .addField('age', 'number', true)
  .addField('email', 'string', true)
  .addField('isActive', 'boolean')
  .addCustomValidation('email', (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value) ? true : 'Invalid email format';
  })
  .addCustomValidation('age', (value) => {
    return value >= 18 ? true : 'User must be at least 18 years old';
  });

// Create a validator with the schema
const validator = new SchemaValidator(userSchema);

// Validate some data
const userData = {
  name: 'John Doe',
  age: 16,
  email: 'invalid-email',
  isActive: true
};

const result = validator.validate(userData);
console.log(result.isValid); // false
console.log(result.errors);
// {
//   age: ['User must be at least 18 years old'],
//   email: ['Invalid email format']
// }
```

## Features

- Validate required fields
- Type checking (string, number, boolean, array, object)
- Custom validation rules
- Detailed error messages