import React, { useState, useContext } from "react";
import "./App.css";
import CourseTable from "./components/CourseTable/CourseTable";
import CourseDetails from "./components/CourseDetails/CourseDetails";
import BarChartData from "./components/BarChart/BarChartData";
import TeacherDetails from "./components/TeacherDetails/TeacherDetails";
import DetailView from "./components/DetailView/DetailView";

import { DataContext } from "./context/DataContext";
import { GlobalStateContext } from "./context/GlobalStateContext";

function App() {
  const { loading } = useContext(DataContext);
  // const { courseDetails, courseOverview } = useContext(GlobalStateContext);

  const {
    selectedPerson,
    showTeacherDetails,
    updateBarClick,
    courseDetails,
    courseOverview,
    displayDetails,
    detailView
  } = useContext(GlobalStateContext);

  if (loading) {
    return (
      <div className="App">
        <div class="spinner"></div>;
      </div>
    );
  }
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

  {
    /* {courseDetails && <CourseDetails data={courseOverview}></CourseDetails>} */
  }
  {
    /* {!courseDetails && !loading && (
    <BarChartData onClick={updateBarClick} />
  )} */
  }
  return (
    <div className="App fade-in">
      <div className="container1">
        {!displayDetails && <BarChartData onClick={updateBarClick} />}
        {displayDetails && <DetailView view={detailView} />}
      </div>
      <div className="container2">
        <CourseTable />
      </div>
    </div>
  );
}

export default App;
