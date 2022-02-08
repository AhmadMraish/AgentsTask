import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Myappointments.scss";
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
import moment from 'moment';

const Myappointments = () => {
  const [myacceptedappointments, setMyacceptedappointments] = useState([]);
  const [mypendingappointments, setMypendingappointments] = useState([]);

  let data = JSON.parse(localStorage.getItem("user"));

  let buyerid = data.payload.userid;

  const handleCancleappointment = async (e) => {
    let appid = e;
    try {
      const cancelBookingresult = await axios.put(
        `http://localhost:8800/appointments/cancelappointment/${appid}`,
        {},
        {
          headers: {
            authorization:
              "Bearer " + JSON.parse(localStorage.getItem("user")).token,
          },
        }
      );
      console.log("booking", cancelBookingresult);
      getBuyerappointments();
    } catch (error) {
      console.log(error);
    }
  };

  const getBuyerappointments = async () => {
    try {
      const result = await axios.get(
        `http://localhost:8800/appointments/getallappointmentsbyaspecificbuyer/${buyerid}`,

        {
          headers: {
            authorization:
              "Bearer " + JSON.parse(localStorage.getItem("user")).token,
          },
        }
      );
      let accepted = result.data.result.filter((el) => {
        return el.statuss == 2;
      });

      let pending = result.data.result.filter((el) => {
        return el.statuss == 1;
      });
      setMyacceptedappointments(accepted);
      setMypendingappointments(pending);
      console.log("res", result.data.result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBuyerappointments();
  }, []);

  return (
    <div className="myappointments__pagewrapper">
      <Navigationbar />
      <TabContainer className="tabs_wrapper">
        <Tabs
          defaultActiveKey="home"
          transition={false}
          id="noanim-tab-example"
          className="mb-3"
        >
          <Tab eventKey="home" title="Pending">
            <TabContent>
              <div className="seller__container_info">
                <Row xs={1} md={2} lg={4} className="g-5">
                  {mypendingappointments &&
                    mypendingappointments.map((element, index) => {
                      return (
                        <>
                          <Container>
                            <Card style={{ width: "19rem" }}>
                              <Card.Img
                                variant="top"
                                src="https://www.pngkey.com/png/detail/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png"
                              />
                              <Card.Body>
                                <Card.Title>{moment(element.dates).format('MMMM Do YYYY, h:mm:ss a')}</Card.Title>
                                <Card.Text>{element.sellername}</Card.Text>
                                
                                  <Card.Text>{element.titlee}</Card.Text>
                                  <Card.Text>
                                    Mobile: {element.phonenumberr}
                                  </Card.Text>
                                  <Card.Text>Price: ${element.price}</Card.Text>
                                  <Button id="myappointments-btn-primary"
                                    onClick={() =>
                                      handleCancleappointment(element.appid)
                                    }
                                  >
                                    Cancel Lecture
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
          <Tab eventKey="profile" title="Accepted">
            <TabContent>
              <div className="seller__container_info">
                <Row xs={1} md={2} lg={4} className="g-5">
                  {myacceptedappointments &&
                    myacceptedappointments.map((element, index) => {
                      return (
                        <>
                          <Container>
                            <Card style={{ width: "19rem" }}>
                              <Card.Img
                                variant="top"
                                src="https://www.pngkey.com/png/detail/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png"
                              />
                              <Card.Body>
                                <Card.Title>{moment(element.dates).format('MMMM Do YYYY, h:mm:ss a')}</Card.Title>
                                <Card.Text>{element.sellername}</Card.Text>
                                
                                  <Card.Text>{element.titlee}</Card.Text>
                                  <Card.Text>
                                    Mobile: {element.phonenumberr}
                                  </Card.Text>
                                  <Card.Text>
                                    Payment due: ${element.price}
                                  </Card.Text>
                                  <Card.Text className="zoom__link">
                                    Zoom Link{}
                                  </Card.Text>
                               
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
  );
};

export default Myappointments;
