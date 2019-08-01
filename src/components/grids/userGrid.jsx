import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Card } from "react-bootstrap";
import { PagingState, IntegratedPaging } from "@devexpress/dx-react-grid";
import {
  Grid,
  Table,
  TableColumnResizing,
  TableHeaderRow,
  PagingPanel
} from "@devexpress/dx-react-grid-bootstrap4";

import { getUsers, removeError } from "../../store/ducks/listUsers";
import { editUser } from "../../store/ducks/createUser";

import { Loading } from "../";

const initial = {
  columns: [
    { name: "name", title: "Name" },
    { name: "email", title: "Email" },
    { name: "document", title: "Document" },
    { name: "edit", title: "Edit" }
  ]
};
class UserDataGrid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...initial,
      columnsSize: initial.columns.map(i => ({
        columnName: i.name,
        width: 180
      }))
    };
  }

  componentDidMount() {
    this.props.getUsers();
  }

  getUserList = () => {
    if (!this.props.users) return [];
    return this.props.users.userlist.map(i => ({
      ...i,
      edit: (
        <span
          className="oi oi-pencil btn btn-info"
          onClick={() => this.props.editUser(i)}
        />
      ),
      remove: <span className="oi oi-pencil btn btn-danger" />
    }));
  };

  render() {
    let { users } = this.props;
    const userList = this.getUserList();
    const { columns, columnsSize } = this.state;
    console.log(userList);
    return (
      <Loading active={users && users.loading} spinner>
        <Card>
          <Card.Header>
            <h4>Users</h4>
          </Card.Header>
          <Card.Body>
            <Grid rows={userList} columns={columns}>
              <PagingState defaultCurrentPage={0} pageSize={6} />
              <IntegratedPaging />
              <Table />
              <TableColumnResizing defaultColumnWidths={columnsSize} />
              <TableHeaderRow />
              <PagingPanel />
            </Grid>
          </Card.Body>
        </Card>
      </Loading>
    );
  }
}

const mapStateToProps = state => ({
  users: state.users
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ getUsers, removeError, editUser }, dispatch);

const UserGrid = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserDataGrid);

export { UserGrid };
