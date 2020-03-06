import React, { useState, useContext } from "react";
import "./App.css";
import CourseTable from "./components/CourseTable/CourseTable";
import BarChartData from "./components/BarChart/BarChartData";
import TeacherDetails from "./components/TeacherDetails/TeacherDetails";
import DetailView from "./components/DetailView/DetailView";

import { DataContext } from "./context/DataContext";
import { GlobalStateContext } from "./context/GlobalStateContext";

function App() {
  const { loading } = useContext(DataContext);

  const {
    selectedPerson,
    showTeacherDetails,
    updateBarClick,
    courseDetails
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
      <h3>WorkVis</h3>
      <BarChartData onClick={updateBarClick} />
      {showTeacherDetails && <DetailView view="DetailTeacher" />}
      {courseDetails && <DetailView view="DetailCourse" />}
      {showTeacherDetails && <TeacherDetails selectedPerson={selectedPerson} />}
      <CourseTable />
    </div>
  );
}

export default App;
