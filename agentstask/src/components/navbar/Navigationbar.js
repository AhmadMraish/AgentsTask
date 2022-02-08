import React, { useEffect, useState, useContext, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../authContext/AuthContext";
import { logout } from "../../authContext/AuthActions";

import "./Navigationbar.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";


const Navigationbar = () => {
  const { dispatch } = useContext(AuthContext);
  const [toggle, setToggle] = useState(null);
  const navigate = useNavigate();
  const searchRef = useRef()

  const search =  () => {
    
    navigate(`/search/${searchRef.current.value}`);
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
                  <Nav.Link id ="nav-link-id" href="#action1">Home</Nav.Link>
                </Link>

                <Link to={`/myappointments`}>
                  <Nav.Link id="myappointments__navlink" href="#action2">My Appointments</Nav.Link>
                </Link>
              </>
            ) : (
              <>
                <Link to={`/sellerhome`}>
                  <Nav.Link id="home__navlink" href="#action1">Home</Nav.Link>
                </Link>
              </>
            )}
          </Nav>

          <Form className="d-flex">
            <FormControl
            //  onSubmit={()=>search()}
              ref={searchRef}
              type="text"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button
            onClick={()=>search()}
              variant="outline-primary"
            >
              Search
            </Button>
          </Form>
          <Button onClick={handleLogout} variant="outline-primary">
            Logout
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigationbar;
