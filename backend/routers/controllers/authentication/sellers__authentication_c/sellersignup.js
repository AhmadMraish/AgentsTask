
const connection = require("../../../../db/db");
const bcrypt = require("bcrypt");

// this function will allow the seller to register/signup a new account

const sellerssignup = async (req, res) => {
  console.log("seller sign up", req.body);
  let {
    sellername,
    emaill,
    phonenumberr,
    titlee,
    informationn,
    passwordd,
    price,
    country,
  } = req.body;
  let passHash = await bcrypt.hash(passwordd, 10);
  emaill = emaill.toLowerCase();
  let data = [
    sellername,
    emaill,
    phonenumberr,
    titlee,
    informationn,
    passHash,
    price,
    country,
  ];

  let query = `INSERT INTO sellers (sellername , emaill , phonenumberr,titlee ,
    informationn,passwordd,price,country) VALUES (?,?,?,?,?,?,?,?)`;
  connection.query(query, data, (error, result) => {
    if (error) {
    
      return res.status(409).json({
        success: false,
        message: `duplicate email was found, please use another`,
        error: error,
      });
    }
    if (result) {
      return res.status(200).json({
        success: true,
        message: `registeration successful`,
        result: result,
      });
    } else {
      return res.status(500).json({
        //server error code
        success: false,
        message: `server error`,
      });
    }
  });
};

module.exports = sellerssignup;
