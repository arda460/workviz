import React, { useEffect, useContext } from "react";
import CourseTableContent from "../CourseTableContent/CourseTableContent";
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
      <CourseTableContent data={courseOverview}></CourseTableContent>
    </div>
  );
}
