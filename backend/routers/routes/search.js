const express = require("express");

const { searchbuyerbyname } = require("../controllers/search");
const { authentication } = require("../middlewares/authentication");

// router define
const searchRouter = express.Router();

//routes define

//[get]  [http://localhost:8800/search/searchbuyerbyname]
searchRouter.get("/searchbuyerbyname/", searchbuyerbyname);

module.exports = searchRouter;
