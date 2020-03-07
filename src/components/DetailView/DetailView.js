import React, { useContext } from "react";
import CourseDetails from "../CourseDetails/CourseDetails";
import TeacherDetails from "../TeacherDetails/TeacherDetails";
import { GlobalStateContext } from "../../context/GlobalStateContext";

function DetailView({ view }) {
  const { courseDetails, courseOverview, selectedPerson } = useContext(
    GlobalStateContext
  );

  // switch (view) {
  //   case "CourseDetails":
  //     view = <CourseDetails data={courseDetails} />;
  //     break;
  //   case "TeacherDetails":
  //     view = <TeacherDetails selectedPerson={selectedPerson} />;
  //     break;
  //   default:
  //     throw Error("No Proper DetailView Specified");
  // }
  return (
    <div>
      {view === "CourseDetails" ? <CourseDetails data={courseDetails} /> : null}
      {view === "TeacherDetails" ? (
        <TeacherDetails selectedPerson={selectedPerson} />
      ) : null}
    </div>
  );
}

export default DetailView;
