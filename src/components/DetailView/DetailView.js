import React, { useContext } from "react";
import CourseDetails from "../CourseDetails/CourseDetails";
import TeacherDetails from "../TeacherDetails/TeacherDetails";
import { GlobalStateContext } from "../../context/GlobalStateContext";

function DetailView({ view }) {
  const { courseDetails, courseOverview, selectedPerson } = useContext(
    GlobalStateContext
  );
  console.log(view);
  return (
    <div>
      {view === "CourseDetails" ? (
        <CourseDetails data={courseOverview} />
      ) : null}
      {view === "TeacherDetails" ? (
        <TeacherDetails selectedPerson={selectedPerson} />
      ) : null}
    </div>
  );
}

export default DetailView;
