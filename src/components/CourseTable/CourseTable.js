import React, { useState, useEffect, useContext } from "react";
import CourseTableContent from "../CourseTableContent/CourseTableContent";
import CourseDetails from "../CourseDetails/CourseDetails";
import { DataContext } from "../../context/DataContext";

import "./CourseTable.css";

export default function CourseTable(props) {
  const [data, setData] = useState(null);
  const { HT20, VT20, loading } = useContext(DataContext);

  useEffect(() => {
    if (!loading){
      const d = {
        autumnData: HT20,
        springData: VT20
      };
      setData(d);
    } 
  }, [HT20, VT20, loading]);

  return (
    <div className="courseContainer">
      <div className="courseOverview">
        <CourseTableContent
          {...props}
          data={data}
        ></CourseTableContent>
      </div>
      <div className="courseDetailsContainer">
        <CourseDetails data={data}></CourseDetails>
      </div>
    </div>
  );
}
