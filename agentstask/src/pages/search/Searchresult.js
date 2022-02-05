import React, { useState, useEffect } from "react";
import axios from "axios";
import Navigationbar from "../../components/navbar/Navigationbar";
import { useNavigate, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import { Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const Searchresult = () => {
  const [searchresult, setSearchresult] = useState();
  const navigate = useNavigate();
  let { sellername } = useParams();

  useEffect(async () => {
    const result = await axios.get(
      `http://localhost:8800/search/searchbuyerbyname?sellername=${sellername}`
    );
    setSearchresult(result.data.search);
    console.log(result.data.search, "teteteteteete");
  }, [sellername]);

  return (
    <div className="seller__page__container">
      <Navigationbar />

      <div className="seller__container_info">
        <Container>
          {searchresult &&
            searchresult.map((element, index) => {
              return (
                <>
                  <Card style={{ width: "25%" }}>
                    <Card.Img
                      variant="top"
                      src={element.informationn}
                    />

                    <Card.Body>
                      <Card.Title>{element.sellername}</Card.Title>
                        <Card.Text>{element.titlee}</Card.Text>
                        <Card.Text>{element.emaill}</Card.Text>
                      <Card.Text>{element.phonenumberr}</Card.Text>
                      <Container>
                        <Card.Text>{element.country}</Card.Text>
                        <Card.Text>price:  ${element.price}</Card.Text>
                      </Container>
                    </Card.Body>
                  </Card>
                </>
              );
            })}
        </Container>
      </div>
    </div>
  );
};
export default Searchresult;
