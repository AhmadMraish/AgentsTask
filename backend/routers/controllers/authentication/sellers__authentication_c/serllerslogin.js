
//------------------------------------------------
const connection = require("../../../../db/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
//------------------------------------------------

const sellerslogin = async (req, res) => {
  const { emaill, passwordd } = req.body;

  const query = `SELECT * FROM sellers WHERE emaill = ?`;

  const data = [emaill, passwordd];

  connection.query(query, data, async (error, result) => {
    // console.log(result,"bb");
    if (result.length == 0) {
      return res.status(404).json({
        success: false,
        message: `The sellers email doesn't exist`,
       
      });
    } else if (error) {
      return res.status(500).json({
        success: false,
        message: `Server Error`,
        error: error,
      });
    }

    if (result.length) {
      const valid = await bcrypt.compare(passwordd, result[0].passwordd);
      if (valid) {
        const payload = {
          sellername: result[0].sellername,
          emaill: result[0].emaill,
          phonenumberr: result[0].phonenumberr,
          titlee: result[0].titlee,
          informationn: result[0].informationn,
          price: result[0].price,
          country: result[0].country,
          sellerid: result[0].sellerid,
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

module.exports = sellerslogin;
