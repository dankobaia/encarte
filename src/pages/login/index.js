import React from "react";
import { LoginForm } from "../../components";
import { Row, Col } from "react-bootstrap";

import "./login.css";

export const LoginPage = () => (
  <Row className="h-100">
    <Col
      sm={{ span: 6, offset: 3 }}
      md={{ span: 4, offset: 4 }}
      className="align-self-center"
    >
      <LoginForm />
    </Col>
  </Row>
);
