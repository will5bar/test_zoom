const express = require("express");

const { customError } = require("./../../lib/error.js");

const { insertOne , findOne , deleteOne , updateOne , findAll } = require("./../../lib/mongoFunc.js");

const {ObjectID} = require("mongodb"); // or ObjectID 

const router = express.Router();

//-----------------------------------
//-----------------------------------

router.post(
  "/addEstado",
  async (req, res, next) => {
    try {

      const info = req.body;

      const { insertedId } = await insertOne("estados", { ... info , dateCreation : new Date() });

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
  "/getEstado/:id",
  async (req, res, next) => {
    try {

      const id = req.params.id;

      const data = await findOne("estados",{ _id: new ObjectID(id) });

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
  "/getAllEstado",
  async (req, res, next) => {
    try {

      const data = await findAll("estados");

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
  "/updateEstado/:id",
  async (req, res, next) => {
    try {

      const id = req.params.id;

      const info = req.body;

      info.lastDateUpdate = new Date();

      const data = await updateOne("estados", { _id: new ObjectID(id) } , { $set : { id : info.id , estado : info.nome }} );

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
  "/deleteEstado/:id",
  async (req, res, next) => {
    try {

      const id = req.params.id;

      const data = await deleteOne("estados",{ _id: new ObjectID(id) });

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

module.exports.routerStates = router;
