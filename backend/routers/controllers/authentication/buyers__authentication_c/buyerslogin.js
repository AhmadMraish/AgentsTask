// db connection
const connection = require("../../../../db/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const buyerslogin = async (req, res) => {


  const { emaill, passwordd } = req.body;

  const query = `SELECT * FROM buyers WHERE emaill = ?`;

  const data = [emaill, passwordd];

  connection.query(query, data, async (error, result) => {
    if (result.length == []) {
    
      return res.status(404).json({
        success: false,
        message: `The email doesn't exist`,
      });
    } else if (error) {
      return res.status(500).json({
        success: false,
        message: `Server Error`,
        error: error,
      });
    }

    if (result.length != []) {
      console.log("second");
      const valid = await bcrypt.compare(passwordd, result[0].passwordd);
      if (valid) {
        const payload = {
          firstname: result[0].fname,
          lastname: result[0].lname,
          phonenumbere: result[0].phonenumberr,
          userid: result[0].userrid,
          type:result[0].typee
        };

        const options = {
          expiresIn: "6day",
        };
        const token = await jwt.sign(payload, process.env.SECRET, options);

        res.status(200).json({
          success: true,
          message: `Email and Password are correct`,
          token: token,
          payload: payload,
        });
      } else {
        res.status(403).json({
          success: false,
          message: `Email or Password are not correct`,
        });
      }
    }
  });
};

module.exports = buyerslogin;
