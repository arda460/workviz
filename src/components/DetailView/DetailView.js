import React, { useContext } from "react";
import CourseDetails from "../CourseDetails/CourseDetails";
import BarChartData from "../BarChart/BarChartData";
import TeacherDetails from "../TeacherDetails/TeacherDetails";
import { GlobalStateContext } from "../../context/GlobalStateContext";

function DetailView({ view }) {
  const {
    selectedPerson,
    displayDetails,
    updateBarClick,
    detailView
  } = useContext(GlobalStateContext);

  // {!displayDetails && <BarChartData onClick={updateBarClick} />}
  // {displayDetails && <DetailView view={detailView} />}
  function getView() {
    if (!displayDetails) {
      return <BarChartData onClick={updateBarClick} />;
    }

    return detailView === "CourseDetails" ? (
      <CourseDetails />
    ) : (
      <TeacherDetails selectedPerson={selectedPerson} />
    );
  }

  return <div className="view-container container1">{getView()}</div>;
}

export default DetailView;
