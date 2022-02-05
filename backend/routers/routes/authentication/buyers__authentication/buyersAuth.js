const express = require("express");

const buyersignup = require("../../../controllers/authentication/buyers__authentication_c/buyersignup");
const buyerslogin = require("../../../controllers/authentication/buyers__authentication_c/buyerslogin");

// router define
const buyersAuthRouter = express.Router();

//routes define

//[post]  [http://localhost:8800/buyersauth/buyerssignup]
buyersAuthRouter.post("/buyerssignup", buyersignup);

//[post]  [http://localhost:8800/buyersauth/buyerslogin]
buyersAuthRouter.post("/buyerslogin", buyerslogin);

module.exports = buyersAuthRouter;
