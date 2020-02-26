import React, { useState, useEffect, useContext } from "react";
import BarChart from "./BarChart";
import { DataContext } from "../../context/DataContext";
import { GlobalStateContext } from "../../context/GlobalStateContext";
import * as d3 from "d3";

function BarChartData(props) {
  const [personData, setPersonData] = useState([]);

  const { teacherSimple, loading } = useContext(DataContext);
  const { setPersonHover } = useContext(GlobalStateContext);

  const chartProps = {
    margin: { top: 30, left: 10, bottom: 20, right: 10 },
    smallBarLimit: 2,
    height: 300,
    width: 1600,
    onHover: setPersonHover,
    onClick: props.onClick
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

  useEffect(() => {
    if (!loading) setPersonData(handleData(teacherSimple));
  }, []);

  return <BarChart {...chartProps} data={personData} />;
}

export default BarChartData;
