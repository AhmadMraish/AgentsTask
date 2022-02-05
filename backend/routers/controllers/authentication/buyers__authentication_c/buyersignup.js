// db connection
const connection = require("../../../../db/db");
const bcrypt = require("bcrypt");


// this function will allow the user to register/signup a new account
const buyersignup = async (req, res) => {
  

  let { fname, lname, phonenumberr, emaill, passwordd } = req.body;
 
  let passHash = await bcrypt.hash(passwordd, 10);
  emaill = emaill.toLowerCase();
  let data = [fname, lname, phonenumberr, emaill, passHash];

  let query = `INSERT INTO buyers (fname , lname , phonenumberr,emaill ,passwordd) VALUES (?,?,?,?,?)`;
  connection.query(query, data, (error, result) => {
    if (error) {
      console.log(error);
      // 409 error code for duplicate entry
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

module.exports = buyersignup;
