import React, { useEffect } from "react";
import StackedBarchartVertical from "./StackedBarchartVertical";

function TeacherCourseAllocation({ data }) {
  const chartProps = {
    margin: { top: 20, bottom: 20, left: 20, right: 20 },
    height: 300,
    width: 300
  };
  const handleData = () => {
    console.log(data);
  };
  return (
    <>
      <StackedBarchartVertical {...chartProps}></StackedBarchartVertical>
    </>
  );
  useEffect(() => {
    if (data) {
      handleData();
    }
  }, [data]);
}

export default TeacherCourseAllocation;
