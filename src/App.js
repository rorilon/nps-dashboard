import React, { Component } from "react";
import Dashboard from "./components/Dashboard";
import "bootstrap/dist/css/bootstrap.min.css";
import { DataContext } from "./contexts/data";
import {
  generateJSON,
  calculateNpsGroupList,
  calculatePrdGroupList,
  filterByNpsGroup,
  filterByProductGroup,
  tableTileData,
  simpleTilesData
} from "./data";

class App extends Component {
  constructor(props) {
    super(props);
    const data = generateJSON(50);
    const npsGroups = calculateNpsGroupList(data);
    const prdGroups = calculatePrdGroupList(data);
    this.state = {
      data,
      npsGroups,
      prdGroups,
      selectedNpsGroups: ["Detractor", "Passive", "Promoter"],
      selectedPrdGroup: null
    };
  }

  render() {
    return (
      <DataContext.Provider
        value={{
          ...this.state,
          handleNpsGroup: this.handleNpsGroup,
          handlePrdGroup: this.handlePrdGroup,
          tableData: this.tableData(),
          simpleTilesData: this.simpleTilesData(),
          handleReset: this.handleReset
        }}
      >
        <Dashboard />
      </DataContext.Provider>
    );
  }

  tableData = () => tableTileData(this.filteredData());

  simpleTilesData = () => simpleTilesData(this.filteredData());

  filteredData = () => {
    const { data, selectedNpsGroups, selectedPrdGroup } = this.state;
    return filterByNpsGroup(
      selectedNpsGroups,
      filterByProductGroup(selectedPrdGroup, data)
    );
  };

  handleNpsGroup = event => {
    let newNpsGroups;
    if (event.target.checked)
      newNpsGroups = [...this.state.selectedNpsGroups, event.target.name];
    else
      newNpsGroups = this.state.selectedNpsGroups.filter(
        npsGroup => npsGroup !== event.target.name
      );
    this.setState({ selectedNpsGroups: newNpsGroups });
  };
  handlePrdGroup = event => {
    this.setState({ selectedPrdGroup: event.target.value });
  };

  handleReset = event => {
    if (event.target.value === this.state.selectedPrdGroup)
      this.setState({
        selectedPrdGroup: null
      });
  };
}

export default App;
