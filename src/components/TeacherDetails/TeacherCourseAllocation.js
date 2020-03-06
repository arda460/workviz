import React, { useEffect, useState } from "react";
import StackedBarchartVertical from "./StackedBarchartVertical";
import * as d3 from "d3";

function TeacherCourseAllocation({ data }) {
  const chartProps = {
    margin: { top: 50, bottom: 50, left: 20, right: 20 },
    height: 300,
    width: 600
  };
  const [chartData, setChartData] = useState(null);

  const handleData = () => {
    const { name, courses, summary } = data;
    let vt = summary["VT Courses"].map(c => c["Course Code"]);
    let ht = summary["HT Courses"].map(c => c["Course Code"]);
    let courseArray = ht.concat(vt);
    let keys = { Adm: 0, Frl: 0, Ex: 0, Ku: 0, Ovn: 0, Ha: 0, La: 0, HaH: 0 };
    let roles = ["Adm", "Frl", "Ex", "Ku", "Ovn", "Ha", "La", "HaH"];
    let period = { 1: [], 2: [], 3: [], 4: [] };

    let teachervt = vt.map(course => {
      let c = courses.VT20[course];
      if (c) {
        return {
          group: course,
          keys: courses.VT20[course].Teachers[name],
          period: courses.VT20[course].Period
        };
      } else
        return {
          group: course,
          keys: courses.HT20[course].Teachers[name],
          period: courses.HT20[course].Period
        };
    });
    let teacherht = ht.map(course => {
      if (!(course in courses.HT20)) {
        //only one course requires this...
        return { group: course, keys: {}, period: [] };
      }
      return {
        group: course,
        keys: courses.HT20[course].Teachers[name],
        period: courses.HT20[course].Period
      };
    });

    let allcourses = teacherht.concat(teachervt);
    roles.forEach(role => {
      allcourses.forEach(course => {
        if (!course.keys.hasOwnProperty(role)) {
          course.keys[role] = 0;
        } else {
          course.keys[role] = Number(course.keys[role]);
        }
      });
    });

    allcourses.forEach(course => {});
    setChartData(allcourses);
  };

  useEffect(() => {
    if (data) {
      handleData();
    }
  }, [data]);
  if (chartData) {
    return (
      <StackedBarchartVertical
        {...chartProps}
        data={chartData}
      ></StackedBarchartVertical>
    );
  } else return <>Loading...</>;
}

export default TeacherCourseAllocation;
