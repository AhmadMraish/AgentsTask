import React, { useState, useContext } from "react";
import "./Sellerlogin.scss";
import { sellerlogin } from "../../../authContext/apiCalls";
import { AuthContext } from "../../../authContext/AuthContext";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const Sellerlogin = () => {
  const [emaill, setEmaill] = useState("");
  const [passwordd, setPasswordd] = useState("");
  const { dispatch } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    await sellerlogin({ emaill, passwordd }, dispatch);
  };

  return (
    <div className="login__seller">
      <Form className="seller__form">
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

export default Sellerlogin;
