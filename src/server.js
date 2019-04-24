import "babel-polyfill";
import express from "express";
import React from "react";
import { renderToString } from "react-dom/server";
import bodyParser from "body-parser";

import App from "./app";

var app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static('build/public'));

app.use(handleRender)

// We are going to fill these out in the sections to follow
function handleRender(req, res) {

    // Render the component to a string
    const html = renderToString(
        <App />
    );
        
    // Send the rendered page back to the client
    res.send(renderFullPage(html));
}
function renderFullPage(html) {
    return `
        <!doctype html>
        <html>
          <head>
            <title>Sample Insta Site</title>
          </head>
          <body>
            <div id="root">${html}</div>
            <noscript>Your browser does not support JavaScript!</noscript>
            <script src="bundle.js"></script>
          </body>
        </html>
    `
}

app.listen(PORT, () => {
    console.log(`App is running on http://localhost:${PORT}`);
})
