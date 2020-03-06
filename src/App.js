import React, { useState, useContext } from "react";
import "./App.css";
import CourseTable from "./components/CourseTable/CourseTable";
import CourseDetails from "./components/CourseDetails/CourseDetails";
import BarChartData from "./components/BarChart/BarChartData";
import TeacherDetails from "./components/TeacherDetails/TeacherDetails";

import { DataContext } from "./context/DataContext";
import { GlobalStateContext } from "./context/GlobalStateContext";

function App() {
  const { loading } = useContext(DataContext);
  const { courseDetails, courseOverview } = useContext(GlobalStateContext);

  const {
    personHover,
    setSelectedPerson,
    selectedPerson,
    setShowTeacherDetails,
    showTeacherDetails
  } = useContext(GlobalStateContext);

  const updateBarClick = person => {
    setSelectedPerson(person);
    setShowTeacherDetails(true);
  };

  const checkPersonHover = () => {
    return personHover == null ? (
      <br />
    ) : (
        `${personHover.name}, ${personHover.value} %`
      );
  };
  /*
  <h3>WorkVis</h3>
  {checkPersonHover()}
  {!loading && <BarChartData onClick={updateBarClick} />}
  <CourseTable />
  {showTeacherDetails && (
    <TeacherDetails
      selectedPerson={selectedPerson}
      crossClick={setShowTeacherDetails}
    />
  )}
  */

  // TODO toggle details -> if coursedetails true then teacherdetails false and other way around

  return (
    <div className="App">
      <div className="container1">
        {courseDetails && <CourseDetails data={courseOverview}></CourseDetails>}
        {!courseDetails && checkPersonHover()}
        {!courseDetails && !loading && <BarChartData onClick={updateBarClick} />}
      </div>
      <div className="container2">
        <CourseTable />
      </div>
    </div>
  );
}

export default App;
