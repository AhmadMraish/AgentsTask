const express = require("express");

const {
  getallsellers,
  getsellerbyid,
  updatesellerbyid,
} = require("../controllers/sellers");

const { authentication } = require("../middlewares/authentication");

// router define
const sellersRouter = express.Router();

//routes define

//[get]  [http://localhost:8800/sellers/getallsellers]
sellersRouter.get("/getallsellers", getallsellers);

//[get]  [http://localhost:8800/sellers/getsellerbyid]
sellersRouter.get("/getsellerbyid", authentication, getsellerbyid);

//[put]  [http://localhost:8800/sellers/updatesellerbyid]
sellersRouter.put("/updatesellerbyid", authentication, updatesellerbyid);

module.exports = sellersRouter;
