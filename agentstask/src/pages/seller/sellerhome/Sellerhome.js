import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Navigationbar from "../../../components/navbar/Navigationbar";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import { Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Sellerhome.scss";

const Sellerhome = () => {
  const navigate = useNavigate();
  const [createdappointments, setCreatedappointments] = useState([]);
  const [pendingappointments, setPendingappointments] = useState([]);
  const [deletedlectures, setDeletedlectures] = useState([]);
  const [acceptedlectures, setAcceptedlectures] = useState([]);

  let holder = JSON.parse(localStorage.getItem("user"));

  let sellerid = holder.payload.sellerid;
 

  // ######### CREATE LECTURE ##############
  const handleCreatelecture = async () => {
    const headers = {
      authorization: "Bearer " + JSON.parse(localStorage.getItem("user")).token,
    };
    console.log("test test", headers);
    await axios
      .post(
        "http://localhost:8800/appointments/createappointment",
        {},
        { headers }
      )
      .then((result) => {
        console.log("created lecture", result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //########

  const specificAppointments = async () => {
    try {
      const result = await axios.get(
        `http://localhost:8800/appointments/getallappointmentsbyaspecificseller/${sellerid}`,

        {
          headers: {
            authorization:
              "Bearer " + JSON.parse(localStorage.getItem("user")).token,
          },
        }
      );
      setCreatedappointments(
        result.data.result.filter((el) => {
          return el.statuss == 0;
        })
      );
      setPendingappointments(
        result.data.result.filter((el) => {
          return el.statuss == 1;
        })
      );
     
      setAcceptedlectures(
        result.data.result.filter((el) => {
          return el.statuss == 2;
        })
      );

      setDeletedlectures(
        result.data.result.filter((el) => {
          return el.statuss == 3;
        })
      );

 
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    specificAppointments();
  }, []);

  return (
    <div className="seller__home__wrapper">
      <Navigationbar />

      <div className="seller__container_info">
        {/* <Container> */}
          <Row xs={1} md={2} lg={4} className="g-5">
            <Card style={{ width: "35%" }}>
              {/* create */}
              <Card.Body>
                <Card.Title>{"Create Lecture"}</Card.Title>
                <Button onClick={handleCreatelecture}>Submit</Button>
  
              </Card.Body>
            </Card>

            <Card style={{ width: "35%" }}>
              {/* view booked lecturs' status */}
              <Card.Body>
                <Card.Title>Lectures Status</Card.Title>
                <Card.Text>
                  Created Lecures:{createdappointments.length}
                </Card.Text>
                <Card.Text>
                  Pending Lectures: {pendingappointments.length}
                </Card.Text>
                <Card.Text>
                  Accepted Lectures: {deletedlectures.length}
                </Card.Text>
                <Card.Text>
                  Deleted Lectures: {acceptedlectures.length}
                </Card.Text>
                <Link to={`/managelectures`}>
                  <Button>Manage Lectures</Button>
                </Link>
              </Card.Body>
            </Card>
          </Row>
        {/* </Container> */}
      </div>
    </div>
  );
};

export default Sellerhome;
