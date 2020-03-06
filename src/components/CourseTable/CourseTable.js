import React, { useEffect, useContext } from "react";
import Search from "../Search/Search"
import CourseTableContent from "../CourseTableContent/CourseTableContent";
import CourseDetails from "../CourseDetails/CourseDetails";
import { DataContext } from "../../context/DataContext";
import { GlobalStateContext } from "../../context/GlobalStateContext";

import "./CourseTable.css";

export default function CourseTable(props) {
  const { courseOverview, setCourseOverview} = useContext(GlobalStateContext);
  const { HT20, VT20, loading } = useContext(DataContext);

  useEffect(() => {
    if (!loading) {
      const d = {
        autumnData: HT20,
        springData: VT20
      };

      setCourseOverview(d);
    }
  }, [HT20, VT20, loading, setCourseOverview]);

  return (
    <div className="courseContainer">
      <Search></Search>
      <CourseTableContent data={courseOverview}></CourseTableContent>
      <CourseDetails data={courseOverview}></CourseDetails>
    </div>
  );
}
