import React from "react";
import {
  Table,
  CardBody,
  CardTitle,
  Card,
  Row as BsRow,
  Col
} from "reactstrap";

class TableTile extends React.Component {
  state = { key: null, direction: null };
  sortBy = (key, direction = "ASC") => {
    if (!key) return this.props.data;
    return this.props.data.sort((a, b) => {
      if (key !== "hier") {
        if (direction === "ASC") return a[key] - b[key];
        else return b[key] - a[key];
      } else {
        if (direction === "ASC") return a[key].localeCompare(b[key]);
        else return b[key].localeCompare(a[key]);
      }
    });
  };
  handleClick = key => {
    this.setState({
      key: key,
      direction:
        key === this.state.key ? this.newDirection(this.state.direction) : "ASC"
    });
  };
  newDirection = direction => {
    if (direction === "ASC") return "DESC";
    else return "ASC";
  };

  render() {
    return (
      <Card>
        <CardBody>
          <CardTitle>Team Performance</CardTitle>
          <Table responsive>
            <thead>
              <tr>
                {Object.keys(headerTitleByKey).map(key => (
                  <HeaderCell
                    key={key}
                    headerKey={key}
                    sortKey={this.state.key}
                    sortDirection={this.state.direction}
                    handleClick={this.handleClick}
                  />
                ))}
              </tr>
            </thead>
            <tbody>
              {this.sortBy(this.state.key, this.state.direction).map(row => (
                <Row row={row} key={row.hier} />
              ))}
            </tbody>
          </Table>
        </CardBody>
      </Card>
    );
  }
}

export default TableTile;

const headerTitleByKey = {
  hier: "Region",
  osat: "Overall",
  rsp: "Responsiveness",
  prd: "Product knowledge"
};
const HeaderCell = ({ headerKey, sortKey, sortDirection, handleClick }) => (
  <th scope="col" onClick={() => handleClick(headerKey)}>
    <BsRow noGutters>
      <Col>{headerTitleByKey[headerKey]}</Col>
      <Col xs="auto">
        {headerKey === sortKey ? (
          sortDirection === "ASC" ? (
            <i className="fas fa-arrow-up" />
          ) : (
            <i className="fas fa-arrow-down" />
          )
        ) : (
          <i className="fas fa-arrow-up invisible" />
        )}
      </Col>
    </BsRow>
  </th>
);

const Row = ({ row }) => (
  <tr>
    <th scope="row">{row.hier}</th>
    <Cell value={row.osat} />
    <Cell value={row.rsp} />
    <Cell value={row.prd} />
  </tr>
);

const Cell = ({ value }) => (
  <td className={classByValue(value)}>{value.toFixed(1)}</td>
);

const classByValue = value =>
  value < 5 ? "table-danger" : value >= 7 ? "table-success" : "table-light";
