const connection = require("../../db/db");

const searchbuyerbyname = (req, res) => {
  const sellername = req.query.sellername;
  console.log(sellername);
  const search = `SELECT * FROM sellers WHERE sellername LIKE "%${sellername}%"`;

  connection.query(search, (error, result) => {
    if (result) {
      return res.status(200).json({
        success: true,
        search: result,
      });
    }
    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Seller was not found",
      });
    }
     else {
      return res.status(500).json({
        success: false,
        message: `Server error`,
        error: error,
      });
    }
  });
};

module.exports = { searchbuyerbyname };
