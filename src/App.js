import React, { useState, useEffect } from "react";
import "./App.css";
import BarChart from "./components/BarChart/BarChart";

function App() {
  const [barHover, setBarHover] = useState("hover over bar to see employee");

  return (
    <div className="App">
      <h3>WorkVis</h3>
      <BarChart selectPerson={setBarHover} />
      {barHover}
    </div>
  );
}

export default App;
