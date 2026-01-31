import { generateShortCode } from '../../../src/infrastructure/usecase/shortenerService';

describe('generateShortCode', () => {
  it('should return a string of length 6', () => {
    const code = generateShortCode();
    expect(code).toHaveLength(6);
  });

  it('should only contain alphanumeric characters', () => {
    const code = generateShortCode();
    expect(/^[a-z0-9]+$/.test(code)).toBe(true);
  });
});
