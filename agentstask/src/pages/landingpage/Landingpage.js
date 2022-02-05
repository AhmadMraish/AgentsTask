import React from "react";
import "./Landingpage.scss";

import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";

import { useNavigate } from "react-router-dom";

const Landingpage = () => {
  const navigate = useNavigate();

  const Handglenavigatetobuyerloginpage = () => {
    // buyer login
    navigate("/buyerlogin");
  };

  const Handglenavigatetobuyersignuppage = () => {
    // buyer sign up
    navigate("/buyersignup");
  };

  const Handglenavigatetologinsellerpage = () => {
    // seller login
    navigate("/sellerlogin");
  };

  const Handglenavigatetosellersignuppage = () => {
    // seller sign up
    navigate("/sellersignup");
  };

  return (
    <div className="landing__container">
      <Container className="landing__flexcontainer">
        <ButtonGroup>
          <Button onClick={Handglenavigatetobuyersignuppage}>
            Register as Buyer
          </Button>
          <Button onClick={Handglenavigatetosellersignuppage}>
            Register as Seller
          </Button>

          <DropdownButton
            as={ButtonGroup}
            title="Already Registered ?"
            id="bg-nested-dropdown"
          >
            <Dropdown.Item
              eventKey="1"
              onClick={Handglenavigatetobuyerloginpage}
            >
              Login as Buyer
            </Dropdown.Item>
            <Dropdown.Item
              eventKey="2"
              onClick={Handglenavigatetologinsellerpage}
            >
              Login as Seller
            </Dropdown.Item>
          </DropdownButton>
        </ButtonGroup>
      </Container>
    </div>
  );
};

export default Landingpage;
