const connection = require("../../db/db");

// https://httpstatuses.com/

// get all buyers

const getallbuyers = (req, res) => {
  const query = `SELECT * FROM buyers`;
  connection.query(query, (error, result) => {
    if (!result.length) {
      return res.status(204).json({
        success: false,
        message: `No registered buyers in the DB`,
      });
    } else if (error) {
      return res.status(500).json({
        success: false,
        message: `Server Error`,
        error: error,
      });
    }

    if (result) {
      return res.status(200).json({
        success: true,
        message: `All buyers`,
        result: result,
      });
    }
  });
};

// get buyer by id 
const getbuyerbyid = (req, res) => {

  let id = req.token.userid;

  const query = `SELECT * FROM buyers Where userrid =${id}`;

  connection.query(query, (error, result) => {
    if (!result.length) {
      return res.status(404).json({
        success: false,
        message: `No registered buyer in the DB with that id`,
      });
    } else if (error) {
      return res.status(500).json({
        success: false,
        message: `Server Error`,
        error: error,
      });
    }

    if (result) {
      return res.status(200).json({
        success: true,
        message: `Buyer found`,
        result: result,
      });
    }
  });
};

// update buyer by id fname lname phonenumberr

const updatebuyerbyid = (req, res) => {
  let id = req.token.userid;

  let { fname, lname, phonenumberr } = req.body;

  const query = `UPDATE buyers SET fname=?, lname=?, phonenumberr=? WHERE userrid=${id}`;
  let data = [fname, lname, phonenumberr];

  connection.query(query, data, (error, result) => {

    if (error) {
      return res.status(500).json({
        success: false,
        message: `Server Error`,
      });
    } else if (result.affectedRows) {
      return res.status(202).json({
        success: true,
        message: ` Success buyer info updated`,
        result: result,
      });
    }
    return res.status(404).json({
      success: false,
      message: ` Not found`,
    });
  });
};
module.exports = { getallbuyers, getbuyerbyid, updatebuyerbyid };
