import React, { useContext } from "react";
import CourseDetails from "../CourseDetails/CourseDetails";
import TeacherDetails from "../TeacherDetails/TeacherDetails";
import { GlobalStateContext } from "../../context/GlobalStateContext";

function DetailView({ view }) {
  const { courseOverview, selectedPerson } = useContext(GlobalStateContext);

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
