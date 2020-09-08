
const chai = require("chai");
const expect = chai.expect;
const should = chai.should();
const {customError} = require("../../lib/error.js");

let token;
describe('cria objeto Error', () => {
    it('cria Error', () => {    
        error = customError("Error", "testMethod", 500, {message: 'error na DB'})
        error.message.should.equal("Error");
        error.method.should.equal("testMethod");
        error.statusCode.should.equal(500);
        error.original.message.should.equal("error na DB");
    });
});
