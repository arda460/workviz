import React, { useContext } from "react";
import CourseDetails from "../CourseDetails/CourseDetails";
import BarChartData from "../BarChart/BarChartData";
import TeacherDetails from "../TeacherDetails/TeacherDetails";
import { GlobalStateContext } from "../../context/GlobalStateContext";

function DetailView() {
  const {
    selectedPerson,
    displayDetails,
    updateBarClick,
    detailView
  } = useContext(GlobalStateContext);

  // {!displayDetails && <BarChartData onClick={updateBarClick} />}
  // {displayDetails && <DetailView view={detailView} />}
  const dViews = {
    TeacherDetails: <TeacherDetails selectedPerson={selectedPerson} />,
    CourseDetails: <CourseDetails />
  };
  function getView() {
    return displayDetails ? (
      dViews[detailView]
    ) : (
      <BarChartData onClick={updateBarClick} />
    );
  }

  return <div className="view-container container1">{getView()}</div>;
}

export default DetailView;
