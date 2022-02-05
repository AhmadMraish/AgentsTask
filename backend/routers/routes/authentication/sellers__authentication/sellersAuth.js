const express = require("express");

const sellerssignup = require("../../../controllers/authentication/sellers__authentication_c/sellersignup");
const sellerslogin = require("../../../controllers/authentication/sellers__authentication_c/serllerslogin");

// router define
const sellersAuthRouter = express.Router();

//routes define

//[post]  [http://localhost:8800/sellersauth/sellerssignup]
sellersAuthRouter.post("/sellerssignup", sellerssignup);

//[post]  [http://localhost:8800/sellersauth/sellerslogin]
sellersAuthRouter.post("/sellerslogin", sellerslogin);

module.exports = sellersAuthRouter;
