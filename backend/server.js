const db = require("./db/db");
const express = require("express");
const cors = require("cors");

// ------------------------------
const app = express();
const port = 8800;
// ------------------------------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// https://stackoverflow.com/questions/23259168/what-are-express-json-and-express-urlencoded
app.use(cors());

//Routers require
const buyersAuthRouter = require("./routers/routes/authentication/buyers__authentication/buyersAuth");
const sellersAuthRouter = require("./routers/routes/authentication/sellers__authentication/sellersAuth");
const buyersRouter = require("./routers/routes/buyers");
const sellersRouter = require("./routers/routes/sellers");
const appointmentsRouter = require("./routers/routes/appointments");
const searchRouter = require("./routers/routes/search");

// use app with routers
app.use("/buyersauth", buyersAuthRouter);
app.use("/sellersauth", sellersAuthRouter);
app.use("/buyers", buyersRouter);
app.use("/sellers", sellersRouter);
app.use("/appointments", appointmentsRouter);
app.use("/search", searchRouter);
//---------------------------------------
app.listen(port, () => {
  console.log(`App listening at => http://localhost:${port}`);
});
