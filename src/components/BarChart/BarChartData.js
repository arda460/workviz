import React, { useState, useEffect, useContext } from "react";
import BarChart from "./BarChart";
import { DataContext } from "../../context/DataContext";
import { GlobalStateContext } from "../../context/GlobalStateContext";
import * as d3 from "d3";

function BarChartData(props) {
  const [personData, setPersonData] = useState([]);

  const { summary20, loading } = useContext(DataContext);
  const { setPersonHover, courseHover, filterTeachers } = useContext(
    GlobalStateContext
  );

  const getWindowDimensions = () => {
    const { innerWidth: width, innerHeight: height } = window;

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
    onClick: props.onClick,
    courseHover
  };

  const handleData = sum20 => {
    //these are not hired people and thus removed, it might be interesting later to add them back in some other visualisation
    delete sum20["Lab handl Teknolog MID"];
    delete sum20["UNKNOWN MID"];
    delete sum20["Fö Extern MID"];
    delete sum20["NN Doktorand"];
    delete sum20["Lab handl Teknolog TMH"];

    return Object.entries(sum20)
      .map(p => {
        return {
          name: p[0],
          value: p[1]["Balance (%)"],
          vt: p[1]["VT Courses"].map(c => c["Course Code"]),
          ht: p[1]["HT Courses"].map(c => c["Course Code"])
        };
      })
      .sort((a, b) => d3.descending(a.value, b.value));
  };

  useEffect(() => {
    if (!loading) setPersonData(handleData(summary20));
  }, [loading, summary20, courseHover, filterTeachers]);

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <BarChart {...chartProps} searchData={filterTeachers} data={personData} />
  );
}

export default BarChartData;
