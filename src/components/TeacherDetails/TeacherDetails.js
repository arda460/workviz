import React, { useState, useEffect } from "react";
import * as d3 from "d3";
import "./TeacherDetails.css";

function TeacherDetails({ selectedPerson, crossClick, isShowing }) {
  const [person, setPerson] = useState("");
  const [table, setTable] = useState(
    <div>Click on a bar above for more information</div>
  );

  const handleData = () => {
    return d3.json("Data/summary20.json").then(d => {
      return { name: selectedPerson, data: d[selectedPerson] };
    });
  };

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

  const draw = ({ name, data }) => {
    if (selectedPerson === "") return;
    let vtcourses = data["VT Courses"];
    let htcourses = data["HT Courses"];
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
    handleData().then(draw);
  }, [selectedPerson]);

  return <>{table}</>;
}

export default TeacherDetails;
