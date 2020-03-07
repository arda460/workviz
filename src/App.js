import React, { useContext } from "react";
import "./App.css";
import BarChartData from "./components/BarChart/BarChartData";
import DetailView from "./components/DetailView/DetailView";
import Spinner from "./components/Spinner/Spinner";
import OverView from "./components/OverView/OverView";

import { DataContext } from "./context/DataContext";
import { GlobalStateContext } from "./context/GlobalStateContext";

function App() {
  const { loading } = useContext(DataContext);

  const {
    updateBarClick,
    displayDetails,
    detailView
  } = useContext(GlobalStateContext);

  if (loading) {
    return (
      <div className="App">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="App fade-in">
      <div className="container1">
        {!displayDetails && <BarChartData onClick={updateBarClick} />}
        {displayDetails && <DetailView view={detailView} />}
      </div>
      <OverView />
    </div>
  );
}

export default App;
