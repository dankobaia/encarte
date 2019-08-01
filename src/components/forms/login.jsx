import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Form, Button, Card } from "react-bootstrap";
import { push } from "connected-react-router";
import { login, removeError } from "../../store/ducks/auth";
import { ErrorModal, Loading } from "../";

import { ChangeValue } from "./utils";

const initial = {
  email: "",
  password: ""
};
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = initial;
  }

  componentDidUpdate(){
    this.redirect();
  }

  redirect = () => {
    if (this.props.auth && this.props.auth.user)
      this.props.push("/user/create");
  };

  render() {
    const { email, password } = this.state;
    let { auth } = this.props;
    return (
      <Loading active={auth && auth.loading} spinner>
        <Card>
          <Card.Body>
            <Form>
              <ErrorModal
                show={auth && auth.error}
                onHide={this.props.removeError}
                title="Error"
                message={auth.errorMessage}
              />
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
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  required
                  placeholder="Password"
                  value={password}
                  onChange={e => ChangeValue(this, "password", e)}
                />
              </Form.Group>
              <Button
                className="float-right"
                variant="primary"
                type="submit"
                onClick={e => {
                  e.preventDefault();
                  this.props.login(email, password);
                }}
              >
                Login
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Loading>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  router: state.router
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ login, removeError, push }, dispatch);

const LoginForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);

export { LoginForm  };
