import React, { useState, useEffect, useContext } from "react";
import CourseTableContent from "../CourseTableContent/CourseTableContent";
import CourseDetails from "../CourseDetails/CourseDetails";
import { DataContext } from "../../context/DataContext";

import "./CourseTable.css";

export default function CourseTable(props) {
  const [data, setData] = useState(null);
  const { HT20, VT20, loading } = useContext(DataContext);

  useEffect(() => {
    if (!loading) {
      const d = {
        autumnData: HT20,
        springData: VT20
      };
      setData(d);
    }
  }, [HT20, VT20, loading]);

  const handleKeyStroke = (val) => {
    if (data !== null) {
      const d = {
        autumnData: HT20,
        springData: VT20
      };

      if (val === '') {
        setData(d);
      }
      else {
        const filterdAutumn = Object.keys(d['autumnData']).filter(key => {
          if (key.includes(val.toUpperCase()) || d['autumnData'][key]['short name'].toUpperCase().includes(val.toUpperCase()))
            return true
          
          return false;
        })
          .reduce((obj, key) => {
            obj[key] = d['autumnData'][key];
            return obj;
          }, {});

        const filterdSpring = Object.keys(d['springData']).filter(key => {
          if (key.includes(val.toUpperCase()) || d['springData'][key]['short name'].toUpperCase().includes(val.toUpperCase()))
            return true;
          return false;
        })
          .reduce((obj, key) => {
            obj[key] = d['springData'][key];
            return obj;
          }, {});

        const filtered = {
          autumnData: filterdAutumn,
          springData: filterdSpring
        };

        setData(filtered);
      }

    }
  }

  return (
    <div className="courseContainer">
      <div className="courseSearch">
        <input type="search" id="courseSeachInp" onKeyUp={e => handleKeyStroke(e.target.value)}></input>
      </div>
      <div className="courseOverview">
        <CourseTableContent
          {...props}
          data={data}
        ></CourseTableContent>
      </div>
      <div className="courseDetailsContainer">
        <CourseDetails data={data}></CourseDetails>
      </div>
    </div>
  );
}
