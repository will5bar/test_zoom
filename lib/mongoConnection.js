const MongoClient = require('mongodb').MongoClient;

const config = require("./config.js");
const { customError } = require("./error.js");

// Class MongoDB
class MongoDB {
    //_db; 

    constructor() {
      this._db = null;
    }

    getConection() {
      try {
        return this._db;
      } catch (e) {
        throw customError("Error MongoDb", "getConection", 500, e);
      }
    }

    async createConection()  {
      try {
        if (this._db) {
          return this.getConection();
        }

        const client = await MongoClient.connect( config.get("DB.url"), { useNewUrlParser: true , useUnifiedTopology: true });
        this._db = client.db("test");

        return this._db;
      } catch (e) {
        throw customError("Error Mongo", "createConection", 500, e);
      }
    }
}

module.exports.MongoDB = new MongoDB();