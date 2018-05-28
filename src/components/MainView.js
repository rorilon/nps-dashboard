import React, { Component } from "react";
import { Button, Row, Col } from "reactstrap";
import SimpleTile from "./SimpleTile";
import TableTile from "./TableTile";
import { DataContext } from "../contexts/data";

class MainView extends Component {
  render() {
    return (
      <DataContext.Consumer>
        {value => (
          <React.Fragment>
            <Button className="mt-2" onClick={this.props.handleToggle} outline>
              <i className="fas fa-filter" />
            </Button>
            <Row className="mt-2">
              <Col lg={6}>
                <Row className="h-100">
                  {value.simpleTilesData.map(simpleTile => (
                    <Col className="mb-4" md={6} key={simpleTile.title}>
                      <SimpleTile {...simpleTile} />
                    </Col>
                  ))}
                </Row>
              </Col>
              <Col className="mb-4" lg={6}>
                <TableTile data={value.tableData} />
              </Col>
            </Row>
          </React.Fragment>
        )}
      </DataContext.Consumer>
    );
  }
}

export default MainView;
