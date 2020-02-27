import React, { useState, useEffect, useContext } from "react";
import BarChart from "./BarChart";
import { DataContext } from "../../context/DataContext";
import { GlobalStateContext } from "../../context/GlobalStateContext";
import * as d3 from "d3";

function BarChartData(props) {
  const [personData, setPersonData] = useState([]);

  const { teacherSimple, loading } = useContext(DataContext);
  const { setPersonHover } = useContext(GlobalStateContext);

  const getWindowDimensions = () => {
    const { outerWidth: width, outerHeight: height } = window;
    return { height, width };
  };
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  const chartProps = {
    margin: { top: 30, left: 30, bottom: 30, right: 30 },
    smallBarLimit: 2,
    height: windowDimensions.height / 3,
    width: windowDimensions.width * 0.95,
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
  }, [loading, teacherSimple]);

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return <BarChart {...chartProps} data={personData} />;
}

export default BarChartData;
