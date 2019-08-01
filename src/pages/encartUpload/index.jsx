import React from "react";
import { Container } from "react-bootstrap";
import { EncartUpload, NavbarMenu } from "../../components";

export const EncarteUpload = props => {
  return (
    <>
      <NavbarMenu {...props} />
      <Container>
        <EncartUpload />
      </Container>
    </>
  );
};
