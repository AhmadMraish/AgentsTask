import React, { useState, useContext,useEffect } from "react";
import "./Sellerlogin.scss";
import { sellerlogin } from "../../../authContext/apiCalls";
import { AuthContext } from "../../../authContext/AuthContext";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { CircularProgress } from "@material-ui/core";

const Sellerlogin = () => {
  const [emaill, setEmaill] = useState("");
  const [passwordd, setPasswordd] = useState("");
  const { dispatch, isFetching, error } = useContext(AuthContext);
  const [message, setMessage] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage(false);
    await sellerlogin({ emaill, passwordd }, dispatch);
    if (error) {
      setMessage(true);
    }
  };

  useEffect(() => {
    setTimeout(function () {
      setMessage(false);
    }, 5000);
  }, [message]);


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

        <Button onClick={handleLogin} variant="primary" type="submit"  disabled={isFetching}>
        {isFetching ? <CircularProgress size="20px" /> : "Login"}
        </Button>
        {message ? <div>Wrong credentials</div> : ""}
      </Form>
    </div>
  );
};

export default Sellerlogin;
