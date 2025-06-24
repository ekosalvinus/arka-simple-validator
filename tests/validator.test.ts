import { SimpleValidator } from '../src/index';

describe('SimpleValidator', () => {
  describe('String Validation', () => {
    test('should validate required string', () => {
      const validator = SimpleValidator.required();
      
      expect(validator.validate('test').isValid).toBe(true);
      expect(validator.validate('').isValid).toBe(false);
      expect(validator.validate(null).isValid).toBe(false);
      expect(validator.validate(undefined).isValid).toBe(false);
    });

    test('should validate string length', () => {
      const validator = SimpleValidator.string(3, 10);
      
      expect(validator.validate('test').isValid).toBe(true);
      expect(validator.validate('te').isValid).toBe(false);
      expect(validator.validate('testtesttest').isValid).toBe(false);
    });
  });

  describe('Email Validation', () => {
    test('should validate email format', () => {
      const validator = SimpleValidator.email();
      
      expect(validator.validate('test@example.com').isValid).toBe(true);
      expect(validator.validate('invalid-email').isValid).toBe(false);
      expect(validator.validate('').isValid).toBe(false);
    });
  });

  describe('Number Validation', () => {
    test('should validate number range', () => {
      const validator = SimpleValidator.number(1, 100);
      
      expect(validator.validate(50).isValid).toBe(true);
      expect(validator.validate(1).isValid).toBe(true);
      expect(validator.validate(100).isValid).toBe(true);
      expect(validator.validate(0).isValid).toBe(false);
      expect(validator.validate(101).isValid).toBe(false);
      expect(validator.validate(null).isValid).toBe(true);
      expect(validator.validate('50').isValid).toBe(false);
    });
    
    test('should validate exact number values', () => {
      // Create a validator that only accepts the value 42
      const validator = new SimpleValidator({
        custom: [{
          message: 'Must be exactly 42',
          validate: (value: any) => value === 42
        }]
      });
      
      expect(validator.validate(42).isValid).toBe(true);
      expect(validator.validate(41).isValid).toBe(false);
      expect(validator.validate('42').isValid).toBe(false);
    });
  });

  describe('Custom Validation', () => {
    test('should accept custom validators', () => {
      const validator = new SimpleValidator({
        custom: [{
          message: 'Must contain "test"',
          validate: (value: string) => !!value && value.includes('test')
        }]
      });
      
      expect(validator.validate('testing').isValid).toBe(true);
      expect(validator.validate('hello').isValid).toBe(false);
      expect(validator.validate('').isValid).toBe(false);
      expect(validator.validate(null).isValid).toBe(false);
    });
    
    test('should combine multiple custom validators', () => {
      const validator = new SimpleValidator({
        custom: [
          {
            message: 'Must contain "test"',
            validate: (value: string) => !!value && value.includes('test')
          },
          {
            message: 'Must be at least 8 characters',
            validate: (value: string) => !!value && value.length >= 8
          }
        ]
      });
      
      expect(validator.validate('testing123').isValid).toBe(true);
      expect(validator.validate('test').isValid).toBe(false);
      expect(validator.validate('longenough').isValid).toBe(false);
      expect(validator.validate('').isValid).toBe(false);
    });
    
    test('should provide error messages for failed validations', () => {
      const validator = new SimpleValidator({
        custom: [
          {
            message: 'Must contain "test"',
            validate: (value: string) => !!value && value.includes('test')
          }
        ]
      });
      
      const result = validator.validate('hello');
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Must contain "test"');
    });
  });
});