/* eslint-env node */
'use strict';

const fs = require('fs');
const path = require('path');
const errorHandler = require('broccoli-middleware/lib/utils/error-handler');

module.exports = function(app, options) {
  app.get('*', (req, res, next) => {
    const accept = req.get('accept');

    if (!accept || !accept.includes('text/html')) {
      return next();
    }

    options.watcher.then((/* hash */) => {
      const buffer = fs.readFileSync(
        path.join(__dirname, '..', options.outputPath, 'index.html')
      );

      /* we do things with the document here before responding with request */
      res.end(buffer);
    }, (buildError) => {
      errorHandler(res, {
        'buildError': buildError,
        'liveReloadPath': options.liveReloadPath
      });
    });
  });
};
