import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { buyerlogin } from "../../../authContext/apiCalls";
import { AuthContext } from "../../../authContext/AuthContext";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./Loginbuyer.scss";

const Loginbuyer = () => {
  const [emaill, setEmaill] = useState("");
  const [passwordd, setPasswordd] = useState("");
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    await buyerlogin({ emaill, passwordd }, dispatch);
    navigate("/buyerhome");
  };

  return (
    <div className="login__buyer">
      <Form className="login__form">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            onChange={(e) => setEmaill(e.target.value)}
            type="email"
            placeholder="Enter email"
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            onChange={(e) => setPasswordd(e.target.value)}
            type="password"
            placeholder="Password"
          />
        </Form.Group>

        <Button onClick={handleLogin} variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default Loginbuyer;
