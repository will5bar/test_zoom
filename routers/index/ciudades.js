const express = require("express");

const { customError } = require("./../../lib/error.js");

const { insertOne , findOne , deleteOne , updateOne , findAll } = require("./../../lib/mongoFunc.js");

const {ObjectID} = require("mongodb"); // or ObjectID 

const router = express.Router();

//-----------------------------------
//-----------------------------------

router.post(
  "/addCity",
  async (req, res, next) => {
    try {

      const info = req.body;

      const { insertedId } = await insertOne("citys", { ... info , dateCreation : new Date() });

      // Respuesta al Front
      res.locals.responseSend = { message: "ok" , data : { ... info , _id : insertedId} };

      res.locals.responseCode = 200;

      // call the responseÂ´s log middleware
      next();
    } catch (e) {
      //console.log('Error occurred');
      // call the Error middleware
      next(e);
    }
  }
);

router.get(
  "/getCity/:id",
  async (req, res, next) => {
    try {

      const id = req.params.id;

      const data = await findOne("citys",{ _id: new ObjectID(id) });

      // Respuesta al Front
      res.locals.responseSend = { message: "ok" , data : data };

      res.locals.responseCode = 200;

      // call the responseÂ´s log middleware
      next();
    } catch (e) {
      //console.log('Error occurred');
      // call the Error middleware
      next(e);
    }
  }
);

router.get(
  "/getAllCity",
  async (req, res, next) => {
    try {

      const data = await findAll("citys");

      // Respuesta al Front
      res.locals.responseSend = { message: "ok" , data : data };

      res.locals.responseCode = 200;

      // call the responseÂ´s log middleware
      next();
    } catch (e) {
      //console.log('Error occurred');
      // call the Error middleware
      next(e);
    }
  }
);

router.put(
  "/updateCity/:id",
  async (req, res, next) => {
    try {

      const id = req.params.id;

      const info = req.body;

      info.lastDateUpdate = new Date();

      const data = await updateOne("citys", { _id: new ObjectID(id) } , { $set : { id : info.id , city : info.nome }} );

      // Respuesta al Front
      res.locals.responseSend = { message: "ok" , data : data };

      res.locals.responseCode = 200;

      // call the responseÂ´s log middleware
      next();
    } catch (e) {
      //console.log('Error occurred');
      // call the Error middleware
      next(e);
    }
  }
);

router.delete(
  "/deleteCity/:id",
  async (req, res, next) => {
    try {

      const id = req.params.id;

      const data = await deleteOne("citys",{ _id: new ObjectID(id) });

      // Respuesta al Front
      res.locals.responseSend = { message: "ok" , data : data };

      res.locals.responseCode = 200;

      // call the responseÂ´s log middleware
      next();
    } catch (e) {
      //console.log('Error occurred');
      // call the Error middleware
      next(e);
    }
  }
);

module.exports.routerCity = router;
