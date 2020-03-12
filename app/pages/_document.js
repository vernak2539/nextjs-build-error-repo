import React from 'react';
import Document, { Html, Main, NextScript } from 'next/document';
import HeadMetaData from '../components/HeadMetaData';

class AppDocument extends Document {
  static async getInitialProps({ renderPage }) {
    // pageProps contains SSR HTML and other bits, see:
    // https://github.com/zeit/next.js#custom-document
    const pageProps = renderPage();

    return {
      ...pageProps,
    };
  }

  render() {
    return (
      <Html lang="en">
        <HeadMetaData />
        <body>
          <Main />
          <NextScript />
          {/* Tracking pixel for Segment - will 404 in dev */}
        </body>
      </Html>
    );
  }
}

export default AppDocument;
