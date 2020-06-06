import express from 'express';
import cors from 'cors';
import ReactDOMServer from 'react-dom/server';
import App from './App.js';
import React from 'react';
import { StaticRouter } from 'react-router-dom';

const app = express()

app.use(cors())

app.use(express.static('public'))

app.get('*', (req, res) => {
  const context = {};

  const html = ReactDOMServer.renderToString(
    <StaticRouter location={req.url} context={context}>
      <App />
    </StaticRouter>
  );

  if (context.url) {
    res.writeHead(301, {
      Location: context.url
    });
    res.end();
  } else {
    res.write(`
    <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta
      name="description"
      content="Web site created using create-react-app"
    />
    <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
    <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
    <title>React App</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root">
        ${html}</div>
  </body>
</html>

  `);
    res.end();
  }
})

app.listen(3010, () => {
  console.log('Server is listening on port : 3010')
});