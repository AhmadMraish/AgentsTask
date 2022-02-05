
const express = require("express");
const { getallappointmentsbyaspecificbuyer,deleteappointment,acceptappointment,createappointment,bookappointment,cancelappointment,getallappointments,getallappointmentsbyaspecificseller,rejectappointment } = require("../controllers/appointments");
const { authentication } = require("../middlewares/authentication");

// router define
const appointmentsRouter = express.Router();

//routes define

//[post]  [http://localhost:8800/appointments/createappointment]
appointmentsRouter.post("/createappointment",authentication, createappointment);

//[put]  [http://localhost:8800/appointments/bookappointment/:appid]
appointmentsRouter.put("/bookappointment/:appid", authentication, bookappointment);

//[put]  [http://localhost:8800/appointments/cancelappointment]
appointmentsRouter.put("/cancelappointment/:appid",authentication, cancelappointment);

//[get]  [http://localhost:8800/appointments/getallappointments]
appointmentsRouter.get("/getallappointments",authentication, getallappointments);


//[get]  [http://localhost:8800/appointments/getallappointmentsbyaspecificseller]
appointmentsRouter.get("/getallappointmentsbyaspecificseller/:sellerid",authentication, getallappointmentsbyaspecificseller);

//[get]  [http://localhost:8800/appointments/getallappointmentsbyaspecificbuyer]
appointmentsRouter.get("/getallappointmentsbyaspecificbuyer/:buyerid",authentication, getallappointmentsbyaspecificbuyer);

//[put]  [http://localhost:8800/appointments/rejectappointment]
appointmentsRouter.put("/rejectappointment/:appid",authentication, rejectappointment);

//[put]  [http://localhost:8800/appointments/acceptappointment]
appointmentsRouter.put("/acceptappointment/:appid",authentication, acceptappointment);

//[put]  [http://localhost:8800/appointments/deleteappointment]
appointmentsRouter.put("/deleteappointment/:appid",authentication, deleteappointment);


module.exports = appointmentsRouter;
