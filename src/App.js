import React, { useState, useEffect } from "react";
import "./App.css";
import BarChart from "./components/BarChart/BarChart";
import CourseTable from "./components/CourseTable/CourseTable";

function App() {
  const [barHover, setBarHover] = useState("hover over bar to see employee");

  return (
    <div className="App">
      <h3>WorkVis</h3>
      <CourseTable />
    </div>
  );
}

export default App;
