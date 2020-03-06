import React from 'react'
import CourseDetails from "./components/CourseDetails/CourseDetails";
import TeacherDetails from "./components/TeacherDetails/TeacherDetails";
import { GlobalStateContext } from "./context/GlobalStateContext";



function DetailView() {
  const { courseDetails, courseOverview } = useContext(GlobalStateContext);

  let view;
  switch(view){
    case "CourseDetails":
      view = <CourseDetails data={courseDetails}/>
      break
    case "TeacherDetails": view =
    default:view=null
  }
  return (
    <div>
      
    </div>
  )
}

export default DetailView
