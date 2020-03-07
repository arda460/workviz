import React, { useState, useContext } from "react";
import "./App.css";
import CourseTable from "./components/CourseTable/CourseTable";
import CourseDetails from "./components/CourseDetails/CourseDetails";
import BarChartData from "./components/BarChart/BarChartData";
import TeacherDetails from "./components/TeacherDetails/TeacherDetails";
import DetailView from "./components/DetailView/DetailView";
import Spinner from "./components/Spinner/Spinner";
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
      <div className="container2">
        <CourseTable />
      </div>
    </div>
  );
}

export default App;
