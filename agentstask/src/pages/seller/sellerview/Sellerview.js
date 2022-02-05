import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import "./Sellerview.scss";
import Navigationbar from "../../../components/navbar/Navigationbar";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import { Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const Sellerview = () => {
  const location = useLocation();
  let seller = location.state.from;

  let sellerid = location.state.from.sellerid;
  const [getspecificappointments, setGetspecificappointments] = useState([]);

  //-------------####Book Appointment------------------------------
  const handleBooking = async (e) => {
    let appid = e;
    try {
      const bookingResult = await axios.put(
        `http://localhost:8800/appointments/bookappointment/${appid}`,
        {},
        {
          headers: {
            authorization:
              "Bearer " + JSON.parse(localStorage.getItem("user")).token,
          },
        }
      );
      specificAppointments();
      console.log("booking", bookingResult);
    } catch (error) {
      console.log(error);
    }
  };
  //######## Get appointments from a specific seller
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
      setGetspecificappointments(
        result.data.result.filter((el) => {
          return el.statuss == 0;
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    specificAppointments();
  }, []);

  //--------------------------------------------------------------------
  return (
    <div className="seller__page__container">
      <Navigationbar />

      <div className="seller__container_info">
        <Container>
          <Card style={{ width: "25%" }}>
            <Card.Img
              variant="top"
              src="https://www.pngkey.com/png/detail/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png"
            />

            <Card.Body>
              <Card.Title>{seller.sellername}</Card.Title>
              <Card.Text>{seller.titlee}</Card.Text>
              <Container>
                <Card.Text>{seller.country}</Card.Text>
                <Card.Text>{seller.phonenumberr}</Card.Text>
                <Card.Text>price:${seller.price}</Card.Text>
                <Card.Text>{seller.emaill}</Card.Text>
              </Container>
            </Card.Body>
          </Card>
        </Container>
      </div>

      <div className="seller_container_list">
        <Row xs={1} md={2} lg={4} className="g-5">
          {getspecificappointments &&
            getspecificappointments.map((element, index) => {
              return (
                <>
                  <Container className="appointment__container">
                    <Card key={index} style={{ width: "100%" }}>
                      <Card.Body>
                        <Card.Title>{element.dates}</Card.Title>
                        <Card.Text></Card.Text>
                          <Button
                            onClick={() => handleBooking(element.appid)}
                            variant="primary"
                          >
                            Book Lecture
                          </Button>
                        <Container>
                        </Container>
                      </Card.Body>
                    </Card>
                  </Container>
                </>
              );
            })}
        </Row>
      </div>
    </div>
  );
};

export default Sellerview;
