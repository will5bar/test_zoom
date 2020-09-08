
const chai = require("chai");
const expect = chai.expect;
const should = chai.should();
const sinon = require('sinon');

const { MongoDB } = require("../../lib/mongoConnection.js");
const {findOne, findCon, insertOne} = require("../../lib/mongoFunc.js");


// findOne

describe('Mongo DB findOne OK', () => {
    let mongo;
    beforeEach(async () => {
        // get the DB
        const db = await MongoDB.createConection();
        // stub the collection
        mongo = sinon.stub(db, "collection").returns({
            findOne: function(coll, data, projection) {
                return Promise.resolve({
                  "_id": "5f57c6a6b698ed0c5df8ef2d",
                  "estado": "SP",
                  "id": "e7620c3b-6cf1-4885-92e2-c402a8628011",
                  "dateCreation": "2020-09-08T18:00:06.113Z"
                });
                }
            });
          });
            afterEach(() => {
              mongo.restore();
            });

    it('check findOne', async () => {    
        const response = await findOne("estados", { id: '5f57c6a6b698ed0c5df8ef2d'}, {});
        response._id.should.equal('5f57c6a6b698ed0c5df8ef2d');
    });
});

describe('Mongo DB findOne retorna null', () => {
    let mongo;
    beforeEach(async () => {
        // get the DB
        const db = await MongoDB.createConection();
        // stub the collection
        mongo = sinon.stub(db, "collection").returns({
            findOne: function(coll, data, projection) {
                return Promise.resolve(null);
            }
        });
      });
      afterEach(() => {
        mongo.restore();
      });

    it('findOne retorna null', async () => {   
        const response = await findOne('estados', {id: '5f57c6a6b698ed0c5df8ef2d'});
        expect(response).to.equal(null);

    });
});


describe('Mongo DB findOne Error', () => {
    let mongo;
    beforeEach(async () => {
        // get the DB
        const db = await MongoDB.createConection();
        // stub the collection
        mongo = sinon.stub(db, "collection").returns({
            findOne: function(coll, data, projection) {
                return Promise.reject({message: "Error"});
            }
        });
      });
      afterEach(() => {
        mongo.restore();
      });

    it('Error no findOne', async () => {   
        try { 
            await findOne('estados', {id: '5f57c6a6b698ed0c5df8ef2d'});
        } catch(e) {
            e.message.should.equal("Error MongoDB");
            e.method.should.equal("findOne");
        }
    });
});


// insert

const data = {
    "estado" : "SP",
    "id" : "e7620c3b-6cf1-4885-92e2-c402a8628011"
};


describe('Mongo DB insertOne OK', () => {
    let mongo;
    beforeEach(async () => {
        // get the DB
        const db = await MongoDB.createConection();
        // stub the collection
        mongo = sinon.stub(db, "collection").returns({
            insertOne: function(data) {
                return Promise.resolve(
                    {
                        ops:[
                                {
                                    _id: '5f57f1c48d13b8027465d445',
                                    ...data
                                }
                            ]
                    });
            }
        });
      });
      afterEach(() => {
        mongo.restore();
      });

    it('check insertOne', async () => {    
        const {ops: [result]} = await insertOne('estados', data);
        
        result._id.should.equal('5f57f1c48d13b8027465d445');
    });
});


describe('Mongo DB insertOne Error', () => {
    let mongo;
    beforeEach(async () => {
        // get the DB
        const db = await MongoDB.createConection();
        // stub the collection
        mongo = sinon.stub(db, "collection").returns({
            insertOne: function(data) {
                return Promise.reject({message: "Error"});
            }
        });
      });
      afterEach(() => {
        mongo.restore();
      });

    it('Error no insertOne', async () => {   
        try { 
            await insertOne('estados', data)
        } catch(e) {
            e.message.should.equal("Error MongoDB");
            e.method.should.equal("insertOne");
        }
 
    });
});