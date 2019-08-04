import React from "react";
import { EncartGrid, NavbarMenu } from "../../components";
import { Row, Col, Container } from "react-bootstrap";

export const Home = props => {
  return (
    <>
      <NavbarMenu {...props} />
      <Container>
        <Row>
          <Col>
            <EncartGrid />
          </Col>
        </Row>
      </Container>
    </>
  );
};
