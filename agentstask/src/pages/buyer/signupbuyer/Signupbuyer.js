import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Signupbuyer.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const Signupbuyer = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [emaill, setEmaill] = useState("");
  const [passwordd, setPasswordd] = useState("");
  const [confirmpassword, setConfirmpasword] = useState("");
  const [phonenumberr, setPhonenumberr] = useState("");

  const handlesignupbuyer = async (e) => {
    e.preventDefault();
    if (passwordd !== confirmpassword) {
      setError("Passwords do not match");
    } else {
      const data = { emaill, passwordd, phonenumberr };
      await axios
        .post("http://localhost:8800/buyersauth/buyerssignup", data)
        .then((result) => {
          console.log("signupbuyer result", result);
          navigate("/buyerlogin");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div className="signupbuyer__container">
      
      <Form className="signupbuyer__form">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            onChange={(e) => setEmaill(e.target.value)}
            type="email"
            placeholder=""
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPhonenumber">
          <Form.Label>Phone </Form.Label>
          <Form.Control
            onChange={(e) => setPhonenumberr(e.target.value)}
            type="number"
            placeholder=""
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            onChange={(e) => setPasswordd(e.target.value)}
            type="password"
            placeholder=""
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            onChange={(e) => setConfirmpasword(e.target.value)}
            type="password"
            placeholder=""
          />
        </Form.Group>
        <div>{error}</div>
        <Button onClick={handlesignupbuyer} variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default Signupbuyer;
