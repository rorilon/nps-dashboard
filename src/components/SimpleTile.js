import React from "react";
import { Card, CardBody, CardTitle } from "reactstrap";

const SimpleTile = ({ value, title }) => (
  <Card className="h-100">
    <CardBody className="d-flex flex-column">
      <CardTitle>{title}</CardTitle>
      <div className="d-flex align-items-center justify-content-center flex-fill">
        <h4 className="font-weight-light">
          {isNaN(value) ? "N/D" : format(value, title)}
        </h4>
      </div>
    </CardBody>
  </Card>
);

const format = (number, title) =>
  title === "NPS" ? number.toFixed(0) : `${(number * 10).toFixed(0)}%`;

export default SimpleTile;
