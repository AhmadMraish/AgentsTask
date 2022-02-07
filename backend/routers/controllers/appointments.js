const connection = require("../../db/db");

/*
Table ==> Appointments

Fields:
id
dates
statuss
buyerid
sellerrid

*/

/*
appointment status:
Created appointement statuss = 0
Rejected appointment statuss = 0         "simply turn it from statuss 1 to statuss 0 again so other buyers can book it"
Pending appointment statuss = 1
Accepted appointment statuss = 2
Deleted appointment statuss = 3
*/

/*

// SELLER Functions
create appointment, done via seller         --DONE
accept pending appointment, done via seller --DONE
reject booked appointment, done via seller  --DONE
delete appointment, done via seller         --DONE


// BUYER Functions
Cancel appointment, done via user ---DONE   0
book appointment, done via user----DONE   1
get all appointments----------DONE   0
get all appointments by specific seller with seller data ---Done
View pending and accepted appointments 1 and 2------



*/
/*
scenario:
Seller creates appointment
appointment status defaults to 0
Buyer view(getallappointments)
Buyer books appointment - appointment status changes from 0 to 1(pending)
Buyer can cancel -- change status back to 0
Seller can accept changes status to 2
Seller can reject changes status to 0
Seller can delete appointment changes status to 3

*/

//------------------------------------------------------------------------------------------------------------------------------------------------
// #######################                                Buyer Controllers                                             ####################### //
//------------------------------------------------------------------------------------------------------------------------------------------------

//-------------##Book Appointment##-------------------------

// send buyer id via token
// send appointmentid via body

const bookappointment = (req, res) => {
  const appointmentid = req.params.appid;

  let userid = req.token.userid;

  //we look for the appointment , then we add the user to it and we change its stats to pending

  const find = `SELECT * FROM Appointments Where appid=${appointmentid}`;
  const data = [appointmentid];
  connection.query(find, data, (error, result) => {
    if (!result.length) {
      return res.status(404).json({
        success: false,
        message: `No appointment with this appid`,
      });
    } else if (error) {
      return res.status(500).json({
        success: false,
        message: `Server Error`,
        error: error,
      });
    }

    if (result.length) {
      const update = `UPDATE Appointments SET buyerid=${userid}, statuss=1 WHERE appid=${appointmentid}`;
      connection.query(update, (error, result) => {
        if (error) {
          return res.status(500).json({
            success: false,
            message: "Server Error",
            error: error,
          });
        }
        if (result.affectedRows) {
          return res.status(200).json({
            success: true,
            message: "Buyer has booked Successfuly",
          });
        }
      });
    }
  });
};

//---------------##Cancel Appointment##---------------
const cancelappointment = (req, res) => {
  let userid = req.token.userid;
  
  const appointmentid = req.params.appid;

  //we look for the appointment , then we add the user to it and we change its stats to pending

  const find = `SELECT * FROM Appointments Where appid=${appointmentid}`;
  const data = [appointmentid];
  connection.query(find, data, (error, result) => {
    if (!result.length) {
      return res.status(404).json({
        success: false,
        message: `No appointment with this appid`,
      });
    } else if (error) {
      return res.status(500).json({
        success: false,
        message: `Server Error`,
        error: error,
      });
    }

    if (result.length) {
      const update = `UPDATE Appointments SET buyerid=${null}, statuss=0 WHERE appid=${appointmentid}`;
      connection.query(update, (error, result) => {
        if (error) {
          return res.status(500).json({
            success: false,
            message: "Server Error",
            error: error,
          });
        }
        if (result.affectedRows) {
          return res.status(200).json({
            success: true,
            message: "Appointment canceled Successfuly",
          });
        }
      });
    }
  });
};

//---------------##Get All Appointment##---------------

const getallappointments = (req, res) => {
  const getall = `SELECT * from Appointments`;
  connection.query(getall, (error, result) => {
    if (!result.length) {
      return res.status(404).json({
        success: false,
        message: `No appointments found`,
      });
    } else if (error) {
      return res.status(500).json({
        success: false,
        message: `Server Error`,
        error: error,
      });
    }
    if (result.length) {
      return res.status(200).json({
        success: true,
        message: "All appointments",
        result: result,
      });
    }
  });
};

//------------------------------------------------------------------------------------------------------------------------------------------------
// #######################                                Seller Controllers                                            ####################### //
//------------------------------------------------------------------------------------------------------------------------------------------------

//---------------Create Appointment-----------------

const createappointment = (req, res) => {
  const id = req.token.sellerid;
  let sellerrid = id;
  let dates = req.body.dates;
  const query = `INSERT INTO Appointments (sellerrid,dates) VALUES (?,?)`;
  const data = [sellerrid,dates];

  connection.query(query, data, (error, result) => {
    if (error) {
      return res.status(500).json({
        success: false,
        message: "Server Error",
        error: error,
      });
    }
    if (result) {
      return res.status(200).json({
        success: true,
        message: "New appointment added",
        result: result,
      });
    }
  });
};

//---------------Reject appointment-----------------
const rejectappointment = (req, res) => {
  const appointmentid = req.params.appid;

  //we look for the appointment , then we add the user to it and we change its stats to pending

  const find = `SELECT * FROM Appointments Where appid=${appointmentid}`;
  const data = [appointmentid];
  connection.query(find, data, (error, result) => {
    if (!result.length) {
      return res.status(404).json({
        success: false,
        message: `No appointment with this appid`,
      });
    } else if (error) {
      return res.status(500).json({
        success: false,
        message: `Server Error`,
        error: error,
      });
    }

    if (result.length) {
      const update = `UPDATE Appointments SET buyerid=${null}, statuss=0 WHERE appid=${appointmentid}`;
      connection.query(update, (error, result) => {
        if (error) {
          return res.status(500).json({
            success: false,
            message: "Server Error",
            error: error,
          });
        }
        if (result.affectedRows) {
          return res.status(200).json({
            success: true,
            message: "Appointment reject Successfuly",
          });
        }
      });
    }
  });
};
//---------------Accept appointment-----------------
const acceptappointment = (req, res) => {
  const appointmentid = req.params.appid;

  //we look for the appointment , then we change its stats to accepted

  const find = `SELECT * FROM Appointments Where appid=${appointmentid}`;
  const data = [appointmentid];
  connection.query(find, data, (error, result) => {
    if (!result.length) {
      return res.status(404).json({
        success: false,
        message: `No appointment with this appid`,
      });
    } else if (error) {
      return res.status(500).json({
        success: false,
        message: `Server Error`,
        error: error,
      });
    }

    if (result.length) {
      const update = `UPDATE Appointments SET statuss=2 WHERE appid=${appointmentid}`;
      connection.query(update, (error, result) => {
        if (error) {
          return res.status(500).json({
            success: false,
            message: "Server Error",
            error: error,
          });
        }
        if (result.affectedRows) {
          return res.status(200).json({
            success: true,
            message: "Appointment Accepted Successfuly",
          });
        }
      });
    }
  });
};

//---------------Delete appointment-----------------

const deleteappointment = (req, res) => {
  const appointmentid = req.params.appid;

  //we look for the appointment , then we change its stats to deleted

  const find = `SELECT * FROM Appointments Where appid=${appointmentid}`;
  const data = [appointmentid];
  connection.query(find, data, (error, result) => {
    if (!result.length) {
      return res.status(404).json({
        success: false,
        message: `No appointment with this appid`,
      });
    } else if (error) {
      return res.status(500).json({
        success: false,
        message: `Server Error`,
        error: error,
      });
    }

    if (result.length) {
      const update = `UPDATE Appointments SET statuss=3 WHERE appid=${appointmentid}`;
      connection.query(update, (error, result) => {
        if (error) {
          return res.status(500).json({
            success: false,
            message: "Server Error",
            error: error,
          });
        }
        if (result.affectedRows) {
          return res.status(200).json({
            success: true,
            message: "Appointment Deleted Successfuly",
          });
        }
      });
    }
  });
};
//---------------Get all appointments by a specific seller-----------------
const getallappointmentsbyaspecificseller = (req, res) => {
  const sellerid = req.params.sellerid;

  const query = `SELECT * FROM Appointments INNER JOIN sellers ON Appointments.sellerrid=sellers.sellerid
  WHERE Appointments.sellerrid=${sellerid}`;
  // data=sellerrid

  connection.query(query, (error, result) => {
    if (result) {
      return res.status(200).json({
        success: true,
        message: "All appointments for this seller + his data",
        result: result,
      });
    }
    if (!result || result == []) {
      return res.status(404).json({
        success: false,
        message: `No appointments found for this seller`,
      });
    } else if (error) {
      return res.status(500).json({
        success: false,
        message: `Server Error`,
        error: error,
      });
    }
  });
};

const getallappointmentsbyaspecificbuyer = (req, res) => {
  const buyerid = req.params.buyerid;

  const query = `SELECT * FROM Appointments INNER JOIN buyers ON Appointments.buyerid=buyers.userrid INNER JOIN sellers ON Appointments.sellerrid=sellers.sellerid
  WHERE Appointments.buyerid=${buyerid}`;

  connection.query(query, (error, result) => {
    if (result) {
      return res.status(200).json({
        success: true,
        message: "All appointments for this buyer + his data",
        result: result,
      });
    }
    if (!result || result == []) {
      return res.status(404).json({
        success: false,
        message: `No appointments found for this buyer`,
      });
    } else if (error) {
      return res.status(500).json({
        success: false,
        message: `Server Error`,
        error: error,
      });
    }
  });
};

//-------------------------------------------------------------------------
module.exports = {
  createappointment,
  bookappointment,
  cancelappointment,
  getallappointments,
  getallappointmentsbyaspecificseller,
  rejectappointment,
  acceptappointment,
  deleteappointment,
  getallappointmentsbyaspecificbuyer,
};
