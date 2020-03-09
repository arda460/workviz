import React, { useState, useEffect } from "react";
import DistributeColors from "../utils/DistributeColors";
import * as d3 from "d3";

const DataContext = React.createContext();

const DataProvider = props => {
  const [highlightPerson, setHighlightPerson] = useState({
    name: "",
    value: ""
  });
  const [loading, setLoading] = useState(true);
  const [teacherSimple, setteacherSimple] = useState();
  const [summary20, setTeacherData] = useState();
  const [HT20, setHT20] = useState();
  const [VT20, setVT20] = useState();
  const [colorDist, setColorDist] = useState([{}, {}]);

  const getData = async () => {
    try {
      const teacherSimpleData = await d3.csv("./Data/2020-small-dash.csv");
      const sum20Data = await d3.json("./Data/summary20.json");
      const HT20Data = await d3.json("./Data/HT20.json");
      const VT20Data = await d3.json("./Data/VT20.json");

      const colors = DistributeColors(HT20Data, VT20Data);

      setColorDist(colors);
      setteacherSimple(teacherSimpleData);
      setTeacherData(sum20Data);
      setHT20(HT20Data);
      setVT20(VT20Data);
      setLoading(false);
    } catch (error) {
      console.error("DataContext: failed @ getData() ", error);
    }
  };
  useEffect(() => {
    if (loading) getData();
  });
  return (
    <DataContext.Provider
      value={{
        loading,
        highlightPerson,
        setHighlightPerson,
        teacherSimple,
        summary20,
        HT20,
        VT20,
        colorDist
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
};

const DataConsumer = DataContext.Consumer;
export { DataProvider, DataConsumer, DataContext };
