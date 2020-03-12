import { getFaviconAndTheme } from './theme';

describe('determining theme of app', () => {
  describe('favicon', () => {
    // this is a bit difficult since we have to mock out these requires in jest, and they return the same thing
    // future work to fix this
    it('should return development icon', () => {
      const { favicon } = getFaviconAndTheme('');

      expect(favicon).toBe('asset-path');
    });

    it('should return staging icon', () => {
      const { favicon } = getFaviconAndTheme('staging');

      expect(favicon).toBe('asset-path');
    });

    it('should return production icon', () => {
      const { favicon } = getFaviconAndTheme('production');

      expect(favicon).toBe('asset-path');
    });
  });

  describe('theme color', () => {
    it('should return development theme color', () => {
      const { themeColor } = getFaviconAndTheme('');

      expect(themeColor).toBe('#7a7a7a');
    });

    it('should return staging theme color', () => {
      const { themeColor } = getFaviconAndTheme('staging');

      expect(themeColor).toBe('#e25d50');
    });

    it('should return production theme color', () => {
      const { themeColor } = getFaviconAndTheme('production');

      expect(themeColor).toBe('#009e99');
    });
  });
});
