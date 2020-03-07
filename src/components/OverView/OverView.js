import React, { useContext } from "react";
import "./OverView.css";
import CourseTable from "../CourseTable/CourseTable";
import BarChartData from "../BarChart/BarChartData";
import Search from "../Search/Search"
import { GlobalStateContext } from "../../context/GlobalStateContext";

export default function OverView() {

  const {
    updateBarClick,
    overView,
  } = useContext(GlobalStateContext);

  return (
      <div className="container2">
          <Search/>
          {overView && <CourseTable/>}
          {!overView && <BarChartData onClick={updateBarClick}/>}
      </div>
  );
}
