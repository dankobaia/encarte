import React from "react";
import { UserForm, UserGrid, NavbarMenu } from "../../components";
import { Row, Col, Container } from "react-bootstrap";

export const CreateUserPage = props => {
  return (
    <>
      <NavbarMenu {...props} />
      <Container>
        <Row>
          <Col sm={{ span: 6 }} md={{ span: 8 }}>
            <UserGrid />
          </Col>
          <Col sm={{ span: 6 }} md={{ span: 4 }}>
            <UserForm />
          </Col>
        </Row>
      </Container>
    </>
  );
};
