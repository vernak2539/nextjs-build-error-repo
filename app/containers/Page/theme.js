import developmentFavicon from './images/favicons/development/favicon-32x32.png';
import stagingFavicon from './images/favicons/staging/favicon-32x32.png';
import productionFavicon from './images/favicons/production/favicon-32x32.png';

export const getFaviconAndTheme = (env) => {
  switch (env) {
    case 'production':
      return {
        favicon: productionFavicon,
        themeColor: '#009e99',
      };
    case 'staging':
      return {
        favicon: stagingFavicon,
        themeColor: '#e25d50',
      };
    default:
      return {
        favicon: developmentFavicon,
        themeColor: '#7a7a7a',
      };
  }
};
