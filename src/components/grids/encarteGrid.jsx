import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Card } from "react-bootstrap";
import {
  PagingState,
  IntegratedPaging,
  SortingState,
  IntegratedSorting
} from "@devexpress/dx-react-grid";
import {
  Grid,
  Table,
  TableColumnResizing,
  TableHeaderRow,
  PagingPanel,
} from "@devexpress/dx-react-grid-bootstrap4";

import { GetEncartes } from "../../store/ducks/listEncartes";

import { Loading } from "../";

const initial = {
  columns: [
    { name: "brand_id", title: "Brand" },
    { name: "start_date", title: "Start Date" },
    { name: "end_date", title: "End Date" },
    { name: "state", title: "State" },
    { name: "edit", title: "Edit" }
  ]
};
class EncartDataGrid extends React.Component {
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
    this.props.GetEncartes();
  }

  getEncartList = () => {
    if (!this.props.listEncartes) return [];
    return this.props.listEncartes.encartes.map(i => ({
      ...i,
      edit: (
        <span
          className="oi oi-pencil btn btn-info"
          onClick={() => alert("MODARATE Id:" + i.id)}
        />
      ),
      remove: <span className="oi oi-pencil btn btn-danger" />
    }));
  };

  render() {
    let { listEncartes } = this.props;
    const { columns, columnsSize } = this.state;
    const list = this.getEncartList();
    return (
      <Loading active={listEncartes && listEncartes.loading} spinner>
        <Card>
          <Card.Header>
            <h4>Encartes</h4>
          </Card.Header>
          <Card.Body>
            <Grid rows={list} columns={columns}>
              <PagingState defaultCurrentPage={0} pageSize={6} />
              <SortingState />
              <IntegratedPaging />
              <IntegratedSorting />
              <Table />
              <TableColumnResizing defaultColumnWidths={columnsSize} />
              <TableHeaderRow showSortingControls />
              <PagingPanel />
            </Grid>
          </Card.Body>
        </Card>
      </Loading>
    );
  }
}

const mapStateToProps = state => ({
  listEncartes: state.listEncartes
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ GetEncartes }, dispatch);

const EncartGrid = connect(
  mapStateToProps,
  mapDispatchToProps
)(EncartDataGrid);

export { EncartGrid };
