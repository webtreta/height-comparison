const express = require('express');
const nunjucks = require('nunjucks');
const minifyHTML = require("express-minify-html-2");
const minify = require("express-minify");
const compression = require("compression");
const FormData = require('form-data');
const fs = require('fs'); // If you need to add files in FormData
const path = require('path');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const routes = require('./routes/index');
const cookieParser = require("cookie-parser");
require("dotenv").config();

const app = express();
app.disable("x-powered-by");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(compression());
app.use(cookieParser());
app.use(
  minifyHTML({
    override: true,
    exception_url: false,
    htmlMinifier: {
      removeComments: true,
      collapseWhitespace: true,
      collapseBooleanAttributes: true,
      removeAttributeQuotes: true,
      removeEmptyAttributes: true,
      minifyJS: true,
      minifyCSS: true
    },
  })
);

app.use(
  minify({
    cache: false,
    uglifyJsModule: null,
    errorHandler: null,
    jsMatch: /js/,
    cssMatch: /css/,
  })
);

// Middleware to enforce trailing slash


nunjucks.configure('src/views', {
  autoescape: true,
  express: app
});

app.set('view engine', 'njk');


app.use('/', routes);



const PORT = process.env.PORT || 3000; // Fixed `process.env.port` to `process.env.PORT`

app.listen(PORT, '0.0.0.0', () => {
  console.log(`App is running on port ${PORT}`);
});
