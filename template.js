import React from 'react';

const Html = (props) => (
  <html lang='en'>
    <head>
      <meta charSet='utf-8' />
      <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
      <meta name='viewport' content='width=device-width, minimum-scale=1.0' />
      <title>{props.title}</title>
      <link rel='stylesheet' href='/app.css' />
      <link href="//fonts.googleapis.com/icon?family=Material+Icons+Noto+Serif|Source+Sans+Pro:400,600,700&subset=vietnamese"
      rel="stylesheet" />
    </head>
    <body>
      <div id='root' dangerouslySetInnerHTML={{ __html: props.body }} />
      <script src="//sdks.shopifycdn.com/js-buy-sdk/latest/shopify-buy.polyfilled.globals.min.js"></script>
      <script src='/app.js' />
    </body>
  </html>
);

export default Html;

