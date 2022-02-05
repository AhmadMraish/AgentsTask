import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../authContext/AuthContext";
import { logout } from "../../authContext/AuthActions";

import "./Navigationbar.scss";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import Input from "react-bootstrap/InputGroup";

const Navigationbar = () => {
  const { dispatch } = useContext(AuthContext);
  const [toggle, setToggle] = useState(null);
  const navigate = useNavigate();

  const search = (sellername) => {
    navigate(`/search/${sellername}`);
  };

  useEffect(() => {
    const toggler = () => {
      const userType = localStorage.getItem("type");
      if (userType == 0) {
        setToggle(true);
      }
      if (userType == 1) {
        setToggle(false);
      }
    };
    toggler();
  }, []);

  const handleLogout = async () => {
    await dispatch(logout());
    localStorage.clear();
    navigate("/");
  };

  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand href="#">Appointments App</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            {toggle ? (
              <>
                <Link to={`/buyerhome`}>
                  <Nav.Link href="#action1">Home</Nav.Link>
                </Link>

                <NavDropdown title="Link" id="navbarScrollingDropdown">
                  <Link to={`/myappointments`}>
                    <NavDropdown.Item href="#action3">
                      My Appointments
                    </NavDropdown.Item>
                  </Link>
                  
                </NavDropdown>
              </>
            ) : (
              <>
                <Link to={`/sellerhome`}>
                  <Nav.Link href="#action1">Home</Nav.Link>
                </Link>
              </>
            )}
          </Nav>

          <Form className="d-flex">
            <FormControl
              onChange={(e) => {
                search(e.target.value);
              }}
              type="text"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button
              // onClick={search}
              variant="outline-success"
            >
              Search
            </Button>
          </Form>
          <Button onClick={handleLogout} variant="outline-success">
            Logout
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigationbar;
