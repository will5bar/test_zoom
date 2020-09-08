const { customError } = require("./error.js");
const { MongoDB } = require("./mongoConnection.js");

const insertOne = async (coll, data) => {
    try {
        // get the conection
        const myDb = await MongoDB.createConection();

        // insert a new document
        const result = await myDb.collection(coll).insertOne(data);

        return result;
    }  catch (e) {
        throw customError("Error MongoDB", "insertOne", 500, e);
    }
}

const findOne = async (coll, id) => {
    try {
        // get the conection
        const myDb = await MongoDB.createConection();

        // get the document
        const result = await myDb.collection(coll).findOne(id);

        return result;
    }  catch (e) {
        throw customError("Error MongoDB", "findOne", 500, e);
    }
}

const updateOne = async (coll, id , info) => {
    try {
      console.log('updateOne', info , id);
        // get the conection
        const myDb = await MongoDB.createConection();

        // get the document
        const result = await myDb.collection(coll).findOneAndUpdate( id, info , {returnNewDocument: true} );

        return result;
    }  catch (e) {
        throw customError("Error MongoDB", "updateOne", 500, e);
    }
}

const deleteOne = async (coll, id) => {
    try {
        // get the conection
        const myDb = await MongoDB.createConection();

        // get the document
        const result = await myDb.collection(coll).findOneAndDelete(id);

        return result;
    }  catch (e) {
        throw customError("Error MongoDB", "deleteOne", 500, e);
    }
}

const findAll = async (coll, data = {}) => {
    try {
        // get the conection
        const myDb = await MongoDB.createConection();

        // get the document
        const result = await myDb.collection(coll).find(data).toArray();

        return result;
    }  catch (e) {
        throw customError("Error MongoDB", "findAll", 500, e);
    }
}

module.exports.insertOne = insertOne;
module.exports.findOne = findOne;
module.exports.updateOne = updateOne;
module.exports.deleteOne = deleteOne;
module.exports.findAll = findAll;

