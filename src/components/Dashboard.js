import React, { Component } from "react";
import "bootstrap/scss/bootstrap.scss";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Row, Col, Container } from "reactstrap";
import MainView from "./MainView";
import { DataContext } from "../contexts/data";
import { BrowserRouter as Router, Route } from "react-router-dom";

class Dashboard extends Component {
  state = { collapse: false };
  toggle = () => {
    this.setState({ collapse: !this.state.collapse });
  };

  render() {
    return (
      <Router>
        <Container>
          <Header />
          <Route
            exact
            path="/"
            render={() => (
              <Home collapse={this.state.collapse} toggle={this.toggle} />
            )}
          />
          <Route exact path="/headline" component={Headline} />
        </Container>
      </Router>
    );
  }
}

export default Dashboard;

const simpleTiles = [
  { value: 8, title: "NPS" },
  { value: 7, title: "Easy" },
  { value: 3, title: "Satisfaction" },
  { value: 55, title: "Renew" }
];
const Home = ({ collapse, toggle }) => (
  <DataContext.Consumer>
    {value => (
      <Row>
        {collapse && (
          <Col xs="auto">
            <Sidebar npsGroups={value.npsGroups} prdGroups={value.prdGroups} />
          </Col>
        )}
        <Col>
          <MainView simpleTiles={simpleTiles} handleToggle={toggle} />
        </Col>
      </Row>
    )}
  </DataContext.Consumer>
);
const Headline = () => <div className="row" />;
