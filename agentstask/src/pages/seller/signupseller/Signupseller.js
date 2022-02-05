import React, { useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import './Signupseller.scss'
import "bootstrap/dist/css/bootstrap.min.css";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const Signupseller = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  /////////////////////////
  const [emaill, setEmaill] = useState("");
  const [passwordd, setPasswordd] = useState("");
  const [phonenumberr, setPhonenumberr] = useState("");

  const [sellername, setSellername] = useState("");
  const [titlee, setTitlle] = useState("");
  const [informationn, setInformationn] = useState("");
  const [price, setPrice] = useState("");
  const [country, setCountry] = useState("");
  //////////////////////////////////////////

  const emaillRef = useRef();
  const passworddRef = useRef();
  const phonenumberrRef = useRef();

  const handleStart = (e) => {
    e.preventDefault();
    setEmaill(emaillRef.current.value);
    setPasswordd(passworddRef.current.value);
    setPhonenumberr(phonenumberrRef.current.value);
  };

  const handleSet = async (e) => {
    e.preventDefault();

    const data = {
      emaill,
      passwordd,
      sellername,
      phonenumberr,
      titlee,
      informationn,
      price,
      country,
    };
    try {
      await axios.post("http://localhost:8800/sellersauth/sellerssignup", data);
    } catch (error) {
      console.log(error);
    }
    navigate("/sellerlogin");
  };

  return (
    <div className="signupseller__container">
      {!emaill ? (
        <Form className="signupseller__form">
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control ref={emaillRef} type="email" placeholder="" />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPhonenumber">
            <Form.Label>Phone </Form.Label>
            <Form.Control ref={phonenumberrRef} type="number" placeholder="" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control ref={passworddRef} type="password" placeholder="" />
          </Form.Group>

          <Button onClick={handleStart} variant="primary" type="submit">
            Next
          </Button>
        </Form>
      ) : (
        //
        <Form className="signupseller__form">
          <Form.Group className="mb-3" controlId="formBasicInput">
            <Form.Label>Name</Form.Label>
            <Form.Control
              onChange={(e) => setSellername(e.target.value)}
              type="text"
              placeholder=""
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicInput">
            <Form.Label>Image </Form.Label>
            <Form.Control
              onChange={(e) => setTitlle(e.target.value)}
              type="text"
              placeholder=""
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicInput">
            <Form.Label>Info</Form.Label>
            <Form.Control
              onChange={(e) => setInformationn(e.target.value)}
              type="text"
              placeholder=""
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicInput">
            <Form.Label>Price</Form.Label>
            <Form.Control
              onChange={(e) => setPrice(e.target.value)}
              type="number"
              placeholder=""
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicInput">
            <Form.Label>Country</Form.Label>
            <Form.Control
              onChange={(e) => setCountry(e.target.value)}
              type="text"
              placeholder=""
            />
          </Form.Group>

          <Button onClick={handleSet} variant="primary" type="submit">
            Next
          </Button>
        </Form>
      )}
    </div>
  );
};

export default Signupseller;
