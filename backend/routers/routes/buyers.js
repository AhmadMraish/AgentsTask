const express = require("express");

const { getallbuyers, getbuyerbyid,updatebuyerbyid } = require("../controllers/buyers");
const {authentication} = require("../middlewares/authentication");

// router define
const buyersRouter = express.Router();

//routes define

//[get]  [http://localhost:8800/buyers/getallbuyers]
buyersRouter.get("/getallbuyers", getallbuyers);

//[get]  [http://localhost:8800/buyers/getbuyerbyid]
buyersRouter.get("/getbuyerbyid",authentication, getbuyerbyid);

//[put]  [http://localhost:8800/buyers/updatebuyerbyid]
buyersRouter.put("/updatebuyerbyid",authentication, updatebuyerbyid);



module.exports = buyersRouter;
