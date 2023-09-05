import { useState } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { FormContainer } from "../components/FormContainer";

import React from "react";

export const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");


  const submitHandler = async (e) => {
    e.preventDefault();
    console.log("submit");
  };
  return (
    <FormContainer>
      <h1>Sign Up</h1>
      <Form onSubmit={submitHandler}>

      <Form.Group className="my-2" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="name"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.name)}
          ></Form.Control>
        </Form.Group>


        <Form.Group className="my-2" controlId="email">
          <Form.Label>Email Adress</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.email)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-2" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.password)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-2" controlId="confPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            value={confPassword}
            onChange={(e) => setConfPassword(e.target.password)}
          ></Form.Control>
        </Form.Group>


        <Button type="submit" variant="primary" className="mt-3">
            SignIn
        </Button>

        <Row className="py-3">
        <Col>
            Already Have an account? <Link to='/login'>Log In</Link>
        </Col>
        </Row>
      </Form>
    </FormContainer>
  );
};



