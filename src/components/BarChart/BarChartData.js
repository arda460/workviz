import React, { useState, useEffect } from "react";
import BarChart from "./BarChart";
import * as d3 from "d3";

function BarChartData(props) {
  let data = [];
  const CSV_URL = "./Data/2020-small-dash.csv";
  const [teacherData, setTeacherData] = useState(data);

  const chartProps = {
    margin: { top: 20, left: 10, bottom: 20, right: 10 },
    smallBarLimit: 2,
    height: 300,
    width: 1600,
    onHover: props.selectPerson
  };

  const handleData = data => {
    return data
      .filter(teacher => teacher.Name !== "")
      .filter(teacher => teacher["Balance ()"] !== "")
      .map(row => {
        return {
          id: "bar" + row.Name.replace(" ", ""),
          name: row.Name,
          value: Number(row["Balance ()"])
        };
      })
      .sort((a, b) => d3.descending(a.value, b.value));
  };
  const getCSV = _ => {
    d3.csv(CSV_URL)
      .then(handleData)
      .then(d => setTeacherData(d));
  };

  useEffect(() => {
    getCSV();
  }, []);

  return <BarChart {...chartProps} data={teacherData} />;
}

export default BarChartData;
