import React, { useState, useEffect } from "react";
import axios from "axios";
import Navigationbar from "../../../components/navbar/Navigationbar";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import { Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import TabContainer from "react-bootstrap/TabContainer";
import TabContent from "react-bootstrap/TabContent";
import './Sellermanage.scss'

const Sellermanage = () => {
  const [createdappointments, setCreatedappointments] = useState([]);
  const [pendingappointments, setPendingappointments] = useState([]);
  const [deletedlectures, setDeletedlectures] = useState([]);
  const [acceptedlectures, setAcceptedlectures] = useState([]);

  let holder = JSON.parse(localStorage.getItem("user"));
  let sellerid = holder.payload.sellerid;

  // ####### ACCEPT BOOKING
  const handleAcceptbooking = async (e) => {
    let appid = e;
    try {
      const bookingResult = await axios.put(
        `http://localhost:8800/appointments/acceptappointment/${appid}`,
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
  // ####### REJECT BOOKING

  const handleRjectbooking = async (e) => {
    let appid = e;
    try {
      const bookingResult = await axios.put(
        `http://localhost:8800/appointments/rejectappointment/${appid}`,
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

  // ####### DELETE BOOKING

  const handleDeleteLecture = async (e) => {
    let appid = e;
    try {
      const bookingResult = await axios.put(
        `http://localhost:8800/appointments/deleteappointment/${appid}`,
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

  // ## get appoints by this seller

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
    <div className="sellermanga__pagewrapper">
      <Navigationbar />
      <div>
        <TabContainer className="tabs_wrapper">
          <Tabs
            defaultActiveKey="home"
            transition={false}
            id="noanim-tab-example"
            className="mb-3"
          >
            <Tab eventKey="home" title="Created Lectures">
              <TabContent>
                <div className="seller__container_info">
                  <Row xs={1} md={2} lg={4} className="g-5">
                    {createdappointments &&
                      createdappointments.map((element, index) => {
                        return (
                          <>
                            <Container>
                              <Card style={{ width: "18rem" }}>
                                <Card.Img
                                  variant="top"
                                  src="https://www.pngkey.com/png/detail/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png"
                                />
                                <Card.Body>
                                  <Card.Title>{element.dates}</Card.Title>
                                  <Card.Text>{element.sellername}</Card.Text>
                                 
                                    <Card.Text>{element.titlee}</Card.Text>
                                    <Card.Text>
                                      Mobile:{element.phonenumberr}
                                    </Card.Text>
                                    <Card.Text>
                                      price:${element.price}
                                    </Card.Text>
                                    <Button
                                      onClick={() =>
                                        handleDeleteLecture(element.appid)
                                      }
                                    >
                                      Delete Lecture
                                    </Button>
                                 
                                </Card.Body>
                              </Card>
                            </Container>
                          </>
                        );
                      })}
                  </Row>
                </div>
              </TabContent>
            </Tab>

            <Tab eventKey="profile" title="Pending Lectures">
              <TabContent>
                <div className="seller__container_info">
                  <Row xs={1} md={2} lg={4} className="g-5">
                    {pendingappointments &&
                      pendingappointments.map((element, index) => {
                        return (
                          <>
                            <Container>
                              <Card style={{ width: "18rem" }}>
                                <Card.Img
                                  variant="top"
                                  src="https://www.pngkey.com/png/detail/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png"
                                />
                                <Card.Body>
                                  <Card.Title>{element.dates}</Card.Title>
                                  <Card.Text>{element.sellername}</Card.Text>
                                  
                                    <Card.Text>{element.titlee}</Card.Text>
                                    <Card.Text>
                                      Mobile:{element.phonenumberr}
                                    </Card.Text>
                                    <Card.Text>
                                      price:${element.price}
                                    </Card.Text>
                                    <Button
                                      onClick={() =>
                                        handleAcceptbooking(element.appid)
                                      }
                                    >
                                      Accept Booking
                                    </Button>
                                    <Button
                                      onClick={() =>
                                        handleRjectbooking(element.appid)
                                      }
                                    >
                                      Reject Booking
                                    </Button>
                                    <Button
                                      onClick={() =>
                                        handleDeleteLecture(element.appid)
                                      }
                                    >
                                      Delete Booking
                                    </Button>
                                  
                                </Card.Body>
                              </Card>
                            </Container>
                          </>
                        );
                      })}
                  </Row>
                </div>
              </TabContent>
            </Tab>

            <Tab eventKey="deleted" title="Deleted">
              <TabContent>
                <div className="seller__container_info">
                  <Row xs={1} md={2} lg={4} className="g-5">
                    {deletedlectures &&
                      deletedlectures.map((element, index) => {
                        return (
                          <>
                            <Container>
                              <Card style={{ width: "18rem" }}>
                                <Card.Img
                                  variant="top"
                                  src="https://www.pngkey.com/png/detail/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png"
                                />
                                <Card.Body>
                                  <Card.Title>{element.dates}</Card.Title>
                                  <Card.Text>{element.sellername}</Card.Text>
                                  
                                    <Card.Text>{element.titlee}</Card.Text>
                                    <Card.Text>
                                      Mobile:{element.phonenumberr}
                                    </Card.Text>
                                    <Card.Text>
                                      price:${element.price}
                                    </Card.Text>
                                    <Button
                                    // onClick={() =>
                                    //   handleCancleappointment(element.appid)
                                    // }
                                    >
                                      Enlist again
                                    </Button>
                                
                                </Card.Body>
                              </Card>
                            </Container>
                          </>
                        );
                      })}
                  </Row>
                </div>
              </TabContent>
            </Tab>

            <Tab eventKey="Accepted" title="Accepted Lectures">
              <TabContent>
                <div className="seller__container_info">
                  <Row xs={1} md={2} lg={4} className="g-5">
                    {acceptedlectures &&
                      acceptedlectures.map((element, index) => {
                        return (
                          <>
                            <Container>
                              <Card style={{ width: "18rem" }}>
                                <Card.Img
                                  variant="top"
                                  src="https://www.pngkey.com/png/detail/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png"
                                />
                                <Card.Body>
                                  <Card.Title>{element.dates}</Card.Title>
                                  <Card.Text>{element.sellername}</Card.Text>
                                  
                                    <Card.Text>{element.titlee}</Card.Text>
                                    <Card.Text>
                                      Mobile:{element.phonenumberr}
                                    </Card.Text>
                                    <Card.Text>
                                      price:${element.price}
                                    </Card.Text>
                                    <Button
                                      onClick={() =>
                                        handleDeleteLecture(element.appid)
                                      }
                                    >
                                      Cancel Booking
                                    </Button>

                                    <Button
                                      onClick={() =>
                                        handleDeleteLecture(element.appid)
                                      }
                                    >
                                      Delete Booking
                                    </Button>
                                  
                                </Card.Body>
                              </Card>
                            </Container>
                          </>
                        );
                      })}
                  </Row>
                </div>
              </TabContent>
            </Tab>
          </Tabs>
        </TabContainer>
      </div>
    </div>
  );
};

export default Sellermanage;
