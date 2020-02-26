import React, { useState, useEffect, useContext } from "react";
import CourseTableContent from "../CourseTableContent/CourseTableContent";
import CourseDetails from "../CourseDetails/CourseDetails";
import { GlobalStateContext } from "../../context/GlobalStateContext";
import { DataContext } from "../../context/DataContext";

import "./CourseTable.css";

export default function CourseTable(props) {
  const [data, setData] = useState(null);
  const [courseDetails, setCourseDetails] = useState(false);

  const { personHover } = useContext(GlobalStateContext); //get related value from  the global state
  const { summary20, loading } = useContext(DataContext); //get summary20Data which has the course data for each person

  useEffect(() => {
    async function getData() {
      const autumnResponse = await fetch("./Data/HT20.json");
      const autumnData = await autumnResponse.json();
      const springResponse = await fetch("./Data/VT20.json");
      const springData = await springResponse.json();
      const data = {
        autumnData: autumnData,
        springData: springData
      };
      setData(data);
    }
    getData();
  }, []);

  return (
    <div className="courseContainer">
      <div className="courseOverview">
        <CourseTableContent
          {...props}
          setCourseDetails={setCourseDetails}
          data={data}
        ></CourseTableContent>
      </div>

      <p></p>
      <p>
        {!loading && personHover != null
          ? summary20[personHover.name]["VT Courses"].map(
              c => ` ${c["Course Code"]}`
            )
          : ""}
      </p>

      <div className="courseDetailsContainer">
        <CourseDetails courseKey={courseDetails} data={data}></CourseDetails>
      </div>
    </div>
  );
}
