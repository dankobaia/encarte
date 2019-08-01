import React from "react";
import { Modal, Button } from "react-bootstrap";

export function SuccessModal(props) {
  return (
    <Modal
      {...props}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>{props.subtitle}</h4>
        <p>{props.message}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success" size="lg" onClick={props.onHide}>
          OK!
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
