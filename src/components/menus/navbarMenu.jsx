import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { logout } from "../../store/ducks/auth";
import { Navbar, Nav } from "react-bootstrap";

import "./navbarMenu.css";

export class NavbarMenu extends React.Component {
  render() {
    console.log(this.props.auth);
    return (
      <Navbar bg="dark" variant="dark" id="encarte-menu">
        <Navbar.Brand href="/home">Encarte</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="/home">Home</Nav.Link>
          {this.props.auth && this.props.auth.admin && (
            <>
              <Nav.Link href="/encarte/upload">Encarte Upload</Nav.Link>
              <Nav.Link href="/user/create">Users</Nav.Link>
            </>
          )}
        </Nav>
        <Nav>
          <Nav.Link
            onClick={() => {
              this.props.logout();
              this.props.history.push("/");
            }}
          >
            Sair
          </Nav.Link>
        </Nav>
      </Navbar>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({ logout }, dispatch);

const mapStateToProps = state => ({
  auth: state.auth,
  all: state,

  router: state.router
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavbarMenu);
