import React from 'react';
import { Head as NextHead } from 'next/document';


const ENVIRONMENT = process.env.NODE_ENV || 'development';

const Head = () => (
  <NextHead>
    <meta charSet="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />

    {ENVIRONMENT !== 'production' && <meta name="robots" content="noindex" />}
    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-41965412-30" />
    <script
      type="text/javascript"
      src="https://www.datadoghq-browser-agent.com/datadog-logs-us.js"
    />
    <script
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{
        __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'UA-41965412-30');
          `,
      }}
    />
  </NextHead>
);

export default Head;
