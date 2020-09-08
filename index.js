const express = require("express");
const bodyParser = require("body-parser");
const compression = require("compression");
const responseTime = require("response-time");
const cors = require("cors");

const config = require("./lib/config.js");
const winston = require("./lib/winston.js");

//--------------------//
//--------------------//

const app = express();

// Max request body size
app.use(bodyParser.json({ limit: config.get("json.limit") }));
app.use(bodyParser.urlencoded({ extended: true }));

// compress all responses
app.use(compression());

// CORS defines interaction browser/server using cross-origin request
app.use(cors({ origin: true }));

// responseTime Header (res)
app.use(responseTime());

//-----------
// ROUTES
//-----------

const { routerStates } = require("./routers/index/estados.js");
const { routerCity } = require("./routers/index/ciudades.js");
const { logResponse } = require("./middleware/response.js");
const { errorHandler } = require("./middleware/error.js");

// add the routers
app.use(routerStates);
app.use(routerCity);

// add the response log midddleware
app.use(logResponse);
// add the Error middleware
app.use(errorHandler);

//-----------
// Uncaught
//-----------

// Uncaught JavaScript exception
process.on("uncaughtException", err => {
  // LOG
  winston.error({
    error: err,
    info: { method: "uncaughtException", message: "unhandle error" },
    stack: err.stack || new Error().stack
  });
});

// Promise is rejected AND No error handler is attached to the promise
process.on("unhandledRejection", (reason, promise) => {
  // LOG
  winston.error({
    error: reason,
    info: { method: "unhandledRejection", message: "unhandle Promise" },
    promise: promise,
    stack: reason.stack || new Error().stack
  });
});

//--------------------//
//--------------------//

//-----------------
// Port to Listen
//-----------------

const PORT = process.env.PORT || config.get("port.ini");

if (process.env.NODE_ENV !== 'test') {

app.listen(PORT, () => {
  // LOG
  winston.log({
    info: {
      method: "app.listen",
      message: `Server is listening on port ${PORT}`
    }
  });
});

}

module.exports = app;