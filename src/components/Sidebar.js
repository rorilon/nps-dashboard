import React, { Component } from "react";
import { FormGroup, Label, Input } from "reactstrap";
import { DataContext } from "../contexts/data";

class Sidebar extends Component {
  render() {
    return (
      <DataContext.Consumer>
        {value => (
          <div>
            <div>
              <h5>NPS Group</h5>
              {value.npsGroups.map(npsGroup => (
                <NpsGroup npsGroup={npsGroup} key={npsGroup} />
              ))}
            </div>
            <div className="mt-2">
              <h5>Product Group</h5>
              {value.prdGroups.map(prdGroup => (
                <PrdGroup
                  selected={value.selectedPrdGroup === prdGroup}
                  prdGroup={prdGroup}
                  key={prdGroup}
                />
              ))}
            </div>
          </div>
        )}
      </DataContext.Consumer>
    );
  }
}

export default Sidebar;

const NpsGroup = ({ npsGroup }) => (
  <DataContext.Consumer>
    {value => (
      <FormGroup check>
        <Label check>
          <Input
            onChange={value.handleNpsGroup}
            checked={value.selectedNpsGroups.includes(npsGroup)}
            type="checkbox"
            name={npsGroup}
          />{" "}
          {npsGroup}
        </Label>
      </FormGroup>
    )}
  </DataContext.Consumer>
);

const PrdGroup = ({ prdGroup, selected }) => (
  <DataContext.Consumer>
    {value => (
      <FormGroup check>
        <Label check>
          <Input
            onClick={value.handleReset}
            value={prdGroup}
            checked={selected}
            onChange={value.handlePrdGroup}
            type="radio"
            name="prdGroup"
          />{" "}
          Product Group {prdGroup}
        </Label>
      </FormGroup>
    )}
  </DataContext.Consumer>
);
