import React, { useState, useContext } from "react";
import "./App.css";
import CourseTable from "./components/CourseTable/CourseTable";
import CourseDetails from "./components/CourseDetails/CourseDetails";
import BarChartData from "./components/BarChart/BarChartData";
import TeacherDetails from "./components/TeacherDetails/TeacherDetails";
import DetailView from "./components/DetailView/DetailView";
import OverView from "./components/OverView/OverView";

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

  return (
    <div className="App fade-in">
      <div className="container1">
        {/* {console.log(!displayDetails)} */}
        {!displayDetails && <BarChartData onClick={updateBarClick} />}
        {displayDetails && <DetailView view={detailView} />}
      </div>
      <OverView />
    </div>
  );
}

export default App;
