import React, { useState, useEffect, useContext } from "react";
import * as d3 from "d3";
import "./TeacherDetails.css";
import TeacherInfo from "./TeacherInfo";
import StaffingInfo from "./StaffingInfo";
import TeacherCourseAllocation from "./TeacherCourseAllocation";
import InfoChart from "./InfoChartData";
import { DataContext } from "../../context/DataContext";

function TeacherDetails({ selectedPerson }) {
  const { summary20, VT20, HT20, loading } = useContext(DataContext);
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!loading) {
      setData({
        name: selectedPerson,
        summary: summary20[selectedPerson],
        sum20: summary20,
        courses: { VT20, HT20 }
      });
    }
  }, [selectedPerson, loading]);

  return (
    <>
      {!loading && (
        <>
          <TeacherInfo data={data}>
            <InfoChart data={{ ...data }} />
            <TeacherCourseAllocation data={data} />>
          </TeacherInfo>
        </>
      )}
    </>
  );
}

export default TeacherDetails;
