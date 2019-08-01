import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Form, Button, Card } from "react-bootstrap";
import { push } from "connected-react-router";
import {
  createUser,
  editUser,
  editUserClear,
  updateUser,
  removeError,
  removeSuccess
} from "../../store/ducks/createUser";
import { ErrorModal, SuccessModal, Loading } from "../";

import { ChangeValue } from "./utils";

const initial = {
  public_id: null,
  name: "",
  admin: false,
  document: "",
  email: "",
  password: ""
};
class User extends React.Component {
  constructor(props) {
    super(props);
    this.state =
      props.createUserForm && props.createUserForm.editing
        ? props.createUserForm.editing
        : initial;
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.createUserForm)
      if (
        this.props.createUserForm.editing &&
        prevProps.createUserForm.editing !== this.props.createUserForm.editing
      )
        this.setState({
          public_id: this.props.createUserForm.editing.public_id,
          name: this.props.createUserForm.editing.name,
          email: this.props.createUserForm.editing.email,
          document: this.props.createUserForm.editing.document,
          admin: this.props.createUserForm.editing.admin
        });
  }

  render() {
    const { name, email, password, document, admin, public_id } = this.state;
    const { createUserForm } = this.props;
    return (
      <Loading active={createUserForm && createUserForm.loading} spinner>
        <ErrorModal
          show={createUserForm && createUserForm.error}
          onHide={this.props.removeError}
          title="Error"
          message={createUserForm.errorMessage}
        />
        <SuccessModal
          show={createUserForm && createUserForm.success}
          onHide={() => {
            this.setState(initial);
            this.props.removeSuccess();
          }}
          title="Success"
          message={createUserForm.successMesssage}
        />
        <Card>
          <Card.Header>
            <h4 className="float-left">{public_id ? "Edit " : "New "}User</h4>
          </Card.Header>
          <Card.Body>
            <Form>
              {this.props && this.props.createUserForm.editing && (
                <Form.Group controlId="form-name">
                  <Form.Label>Id</Form.Label>
                  <Form.Control
                    type="text"
                    required
                    value={public_id}
                    disabled
                  />
                </Form.Group>
              )}
              <Form.Group controlId="form-name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  required
                  placeholder="Enter name"
                  value={name}
                  onChange={e => ChangeValue(this, "name", e)}
                />
              </Form.Group>
              <Form.Group controlId="form-document">
                <Form.Label>Document</Form.Label>
                <Form.Control
                  type="text"
                  required
                  placeholder="000.000.000-00"
                  value={document}
                  onChange={e => ChangeValue(this, "document", e)}
                />
              </Form.Group>
              <Form.Group controlId="form-email">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  required
                  placeholder="Enter email"
                  value={email}
                  onChange={e => ChangeValue(this, "email", e)}
                />
              </Form.Group>
              <Form.Group controlId="form-password">
                <Form.Label>enter password</Form.Label>
                <Form.Control
                  type="password"
                  required
                  placeholder="Password"
                  value={password}
                  onChange={e => ChangeValue(this, "password", e)}
                />
              </Form.Group>
              <Form.Group controlId="form-admin">
                <Form.Check
                  type="checkbox"
                  label="is admin?"
                  checked={admin}
                  onChange={e => ChangeValue(this, "admin", e)}
                />
              </Form.Group>
              <Button
                className="float-right"
                variant="success"
                size="lg"
                type="submit"
                onClick={e => {
                  e.preventDefault();
                  if (!public_id) this.props.createUser(this.state);
                  else this.props.updateUser(this.state);
                }}
              >
                SAVE
              </Button>
              {this.props && this.props.createUserForm.editing && (
                <Button
                  className="float-left"
                  variant="outline-danger"
                  size="lg"
                  type="submit"
                  onClick={e => {
                    e.preventDefault();
                    this.props.editUserClear();
                  }}
                >
                  Cancel
                </Button>
              )}
            </Form>
          </Card.Body>
        </Card>
      </Loading>
    );
  }
}

const mapStateToProps = state => ({
  createUserForm: state.createUser
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      createUser,
      editUser,
      updateUser,
      editUserClear,
      removeError,
      removeSuccess,
      push
    },
    dispatch
  );

const UserForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(User);

export { UserForm };
