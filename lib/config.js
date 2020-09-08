const convict = require("convict");

// Define a schema
const config = convict({
  port: {
    ini: 4000
  },
  json: {
    limit: "10mb"
  },
  DB: {
    nameDB: "XXX",
    url: "XXX"
  }
});

module.exports = config;
