import React, { useState, useEffect } from "react";
import "./App.css";
import BarChartData from "./components/BarChart/BarChartData";

function App() {
  const [barHover, setBarHover] = useState("hover over bar to see employee");

  const updatebarHover = check => {
    if (typeof check.value != "undefined") {
      setBarHover(check);
    }
  };

  return (
    <div className="App">
      <h3>WorkVis</h3>
      <BarChartData selectPerson={updatebarHover} />
      {`${barHover.name}, ${barHover.value} %`}
    </div>
  );
}

export default App;
