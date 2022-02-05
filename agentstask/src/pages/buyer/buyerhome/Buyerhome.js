import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navigationbar from "../../../components/navbar/Navigationbar";
import axios from "axios";
import "./Buyerhome.scss";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import { Row } from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";

const Buyerhome = () => {
  const [sellers, setSellers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8800/sellers/getallsellers", {
        headers: {
          token: "Bearer " + JSON.parse(localStorage.getItem("user")).token,
        },
      })
      .then((response) => {
        setSellers(response.data.result);
        console.log("test", response.data.result);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="buyers__home__container">
      <Navigationbar />
      <div className="buyers_home_wrapper">
      <Row xs={1} md={2} lg={4} className="g-5">
        {sellers &&
          sellers.map((element, index) => {
            return (
              <>
                <Container>
                  <Card key={element.sellerid} style={{ width: "18rem" }}>
                    <Card.Img
                      variant="top"
                      src="https://www.pngkey.com/png/detail/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png"
                    />
                    <Card.Body>
                      <Card.Title>{element.sellername}</Card.Title>
                      <Card.Text>{element.titlee}</Card.Text>
                        <Link to={`/viewseller`} state={{ from: element }}>
                          <Button variant="primary">View Lectures</Button>
                        </Link>
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

export default Buyerhome;
