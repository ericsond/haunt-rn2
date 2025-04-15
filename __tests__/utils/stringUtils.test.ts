import { capitalizeFirstLetter, truncateString } from '../../src/utils/stringUtils';

describe('stringUtils', () => {
  describe('capitalizeFirstLetter', () => {
    it('should capitalize the first letter of a string', () => {
      expect(capitalizeFirstLetter('hello')).toBe('Hello');
      expect(capitalizeFirstLetter('world')).toBe('World');
    });

    it('should handle empty strings', () => {
      expect(capitalizeFirstLetter('')).toBe('');
    });

    it('should handle single character strings', () => {
      expect(capitalizeFirstLetter('a')).toBe('A');
    });
  });

  describe('truncateString', () => {
    it('should truncate strings longer than maxLength', () => {
      expect(truncateString('Hello World', 5)).toBe('Hello...');
    });

    it('should not truncate strings shorter than maxLength', () => {
      expect(truncateString('Hi', 5)).toBe('Hi');
    });

    it('should handle empty strings', () => {
      expect(truncateString('', 5)).toBe('');
    });
  });
}); 