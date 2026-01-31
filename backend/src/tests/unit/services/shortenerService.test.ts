export function generateShortCode(): string {
    return Math.random().toString(36).substring(2, 8);
  }
  describe('ShortenerService', () => {
    it('should generate a short code', () => {
      const code = generateShortCode();
      expect(code).toHaveLength(6);
    });
  });
  