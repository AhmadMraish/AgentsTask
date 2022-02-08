import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Signupbuyer.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const Signupbuyer = () => {
  const navigate = useNavigate();
  const [emaill, setEmaill] = useState("");
  const [passwordd, setPasswordd] = useState("");
  const [confirmpassword, setConfirmpasword] = useState("");
  const [phonenumberr, setPhonenumberr] = useState("");
  const [message, setMessage] = useState(false);
  const handlesignupbuyer = async (e) => {
    e.preventDefault();

    var regex = /[\!\@\#\$\%\^\&\*\)\(\+\=\.\<\>\{\}\[\]\:\;\'\"\|\~\`\_\-]/g;
    if(confirmpassword !== passwordd){
      setMessage("Password fields do not match");
    }else if(passwordd.length < 6){
      setMessage("Password Must be greater Than 6 characters");
    }else if(regex.test(passwordd) == false){
      setMessage('Password must contain at least one special character');
    ///////////////////////////////////
     
    } else {
      const data = { emaill, passwordd, phonenumberr };
      await axios
        .post("http://localhost:8800/buyersauth/buyerssignup", data)
        .then((result) => {
          console.log("signupbuyer result", result);
          navigate("/buyerlogin");
        })
        .catch((error) => {
          if (error.message == "Request failed with status code 409"){
            setMessage("Email has already been taken")
          }
          console.log("b",error.message);
        });
    }
  }

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
        <div className="signupbuyer__spacer">
        <Button onClick={handlesignupbuyer} variant="primary" type="submit">
          Submit
        </Button>
        <div className="error__message">{message}</div>
        </div>
      </Form>
    </div>
  );
};

export default Signupbuyer;
