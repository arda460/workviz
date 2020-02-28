import React, { useState, useEffect, useContext } from "react";
import * as d3 from "d3";
import "./TeacherDetails.css";
import TeacherInfo from "./TeacherInfo";
import StaffingInfo from "./StaffingInfo";
import InfoChart from "./InfoChart";
import { DataContext } from "../../context/DataContext";

function TeacherDetails({ selectedPerson, crossClick, isShowing }) {
  const { summary20, loading } = useContext(DataContext);
  const [data, setData] = useState(null);

  const [person, setPerson] = useState("");
  const [table, setTable] = useState(
    <div>Click on a bar above for more information</div>
  );

  const getCourses = courses => {
    return courses.map((data, i) => {
      return (
        <div key={i} className="flexcol txt-left">
          code: {data["Course Code"].replace("*", "")} {data["Short Name"]}{" "}
          Workload: {data["Work %"]}
        </div>
      );
    });
  };

  const draw = () => {
    if (selectedPerson === "") return;
    let name = selectedPerson;
    name = "Elphias Doge";
    let data = summary20[name];
    let vtcourses = data["VT Courses"];
    let htcourses = data["HT Courses"];
    console.log(htcourses);
    let out = (
      <div className="round-borders">
        <i
          className="far fa-2x fa-times-circle"
          onClick={() => crossClick(false)}
        ></i>
        <div>
          <div>{name}</div>
          <div>
            <span>Kontering: {data["Kontering HCT (%)"]} </span>
            <span>Overall Balance: {data["Balance (%)"]}</span>
          </div>
        </div>
        <div className="flexinline flexrow courselist">
          <div>
            <span>Courses HT</span>
            {getCourses(htcourses)}
          </div>
          <br></br>
          <div>
            <span>Courses VT</span>
            {getCourses(vtcourses)}
          </div>
        </div>
      </div>
    );
    setTable(out);
  };

  useEffect(() => {
    if (!loading)
      setData({ name: selectedPerson, summary: summary20[selectedPerson] });
  }, [selectedPerson, loading]);

  return (
    <>
      {!loading && (
        <TeacherInfo data={data}>
          <InfoChart data={data} />
        </TeacherInfo>
      )}
      <StaffingInfo />
    </>
  );
}

export default TeacherDetails;
