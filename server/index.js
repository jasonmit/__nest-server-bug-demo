/* eslint-env node */
'use strict';

const fs = require('fs');
const path = require('path');

module.exports = function(app) {
  app.get('*', (req, res, next) => {
    const accept = req.get('accept');

    if (!accept || !accept.includes('text/html')) {
      return next();
    }

    const buffer = fs.readFileSync(
      path.join(__dirname, '..', 'dist', 'index.html')
    );

    /* we do things with the document here before responding with request */
    res.end(buffer);
  });
};
