import { SimpleValidator } from './src/index';

// Debug the number validation
const validator = SimpleValidator.number(1, 100);
console.log('Validating 50:', validator.validate(50));
console.log('Validator rules:', JSON.stringify(validator, null, 2));
