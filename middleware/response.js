const winston = require("./../lib/winston.js");

//-----------------------------------------
//-----------------------------------------

// middleware used to log the response

const logResponse = async (req, res, next) => {
  try {
    //console.log('logResponse ----------------')
    const code = res.locals.responseCode || 200;

    winston.log({
      code,
      response: res.locals.responseSend,
      headers: req.headers,
      body: req.body,
      baseUrl: req.baseUrl,
      hostname: req.hostname,
      method: req.method,
      originalUrl: req.originalUrl,
      params: req.params,
      path: req.path,
      query: req.query,
      route: req.route
      //,file: req.files
    });
    res.status(code).send(res.locals.responseSend);
  } catch (e) {
    console.error(e);
  }
};
//-----------------------------------------
//-----------------------------------------

module.exports.logResponse = logResponse;
