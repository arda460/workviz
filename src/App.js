import React, { useState, useEffect } from "react";
import "./App.css";
import BarChart from "./components/BarChart/BarChart";
import CourseTable from "./components/CourseTable/CourseTable";
import BarChartData from "./components/BarChart/BarChartData";
import TeacherDetails from "./components/TeacherDetails/TeacherDetails";

function App() {
  const [barHover, setBarHover] = useState("hover over bar to see employee");
  const [selectedPerson, setSelectedPerson] = useState("");
  const [showTeacherDetails, setShowTeacherDetails] = useState(true);

  const updatebarHover = check => {
    if (typeof check.value != "undefined") {
      setBarHover(check);
    }
  };
  const updateBarClick = person => {
    setSelectedPerson(person);
    setShowTeacherDetails(true);
  };
  const hideTeacherDetails = bool => {
    setShowTeacherDetails(bool);
  };

  return (
    <div className="App">
      <h3>WorkVis</h3>
      {`${barHover.name}, ${barHover.value} %`}
      <BarChartData selectPerson={updatebarHover} onClick={updateBarClick} />
      <CourseTable/>
      {showTeacherDetails && (
        <TeacherDetails
          selectedPerson={selectedPerson}
          crossClick={hideTeacherDetails}
        />
      )}
    </div>
  );
}

export default App;
