const connection = require("../../db/db");

// https://httpstatuses.com/

//  table  --> sellers
//  table fields :
//     sellerid
//     sellername
//     titlee
//     phonenumberr
//     informationn
//     passwordd
//     price
//     country

// get all sellers
const getallsellers = (req, res) => {
  const query = `SELECT * FROM sellers`;
  connection.query(query, (error, result) => {
    if (!result.length) {
      return res.status(204).json({
        success: false,
        message: `No registered sellers in the DB`,
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
        message: `All sellers`,
        result: result,
      });
    }
  });
};

// get seller by id
const getsellerbyid = (req, res) => {
  let id = req.token.sellerid;

  const query = `SELECT * FROM sellers Where sellerid =${id}`;

  connection.query(query, (error, result) => {
    if (!result.length) {
      return res.status(404).json({
        success: false,
        message: `No registered seller in the DB with that id`,
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
        message: `Seller found`,
        result: result,
      });
    }
  });
};

// phonenumberr
// titlee
// informationn
// price
// country

const updatesellerbyid = (req, res) => {
  let id = req.token.sellerid;

  let { phonenumberr, titlee, informationn, price, country } = req.body;

  const query = `UPDATE sellers SET phonenumberr=?, titlee=?, informationn=?, price=?, country=? WHERE sellerid=${id}`;
  let data = [phonenumberr, titlee, informationn, price, country];

  connection.query(query, data, (error, result) => {
    if (error) {
      return res.status(500).json({
        success: false,
        message: `Server Error`,
      });
    } else if (result.affectedRows) {
      return res.status(202).json({
        success: true,
        message: ` Success seller info updated`,
        result: result,
      });
    }
    return res.status(404).json({
      success: false,
      message: ` Seller Not found`,
    });
  });
};
module.exports = { getallsellers, getsellerbyid, updatesellerbyid };
