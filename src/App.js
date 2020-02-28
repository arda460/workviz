import React, { useState, useContext } from "react";
import "./App.css";
import CourseTable from "./components/CourseTable/CourseTable";
import BarChartData from "./components/BarChart/BarChartData";
import TeacherDetails from "./components/TeacherDetails/TeacherDetails";

import { DataContext } from "./context/DataContext";
import { GlobalStateContext } from "./context/GlobalStateContext";

function App() {
  const [selectedPerson, setSelectedPerson] = useState("");
  const [showTeacherDetails, setShowTeacherDetails] = useState(false);
  const { loading } = useContext(DataContext);

  const { personHover } = useContext(GlobalStateContext);

  const updateBarClick = person => {
    setSelectedPerson(person);
    setShowTeacherDetails(true);
  };

  const checkPersonHover = () => {
    return personHover == null
      ? "Welcome"
      : `${personHover.name}, ${personHover.value} %`;
  };
  return (
    <div className="App">
      <h3>WorkVis</h3>
      {checkPersonHover()}
      {!loading && <BarChartData onClick={updateBarClick} />}
      {showTeacherDetails && (
        <TeacherDetails
          selectedPerson={selectedPerson}
          crossClick={setShowTeacherDetails}
        />
      )}
      <CourseTable />
    </div>
  );
}

export default App;
