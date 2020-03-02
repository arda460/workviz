import React, { useState, useEffect, useContext } from "react";
import CourseTableContent from "../CourseTableContent/CourseTableContent";
import CourseDetails from "../CourseDetails/CourseDetails";
import { DataContext } from "../../context/DataContext";

import "./CourseTable.css";

export default function CourseTable(props) {
  const [data, setData] = useState(null);
  const { colorDist, HT20, VT20, loading } = useContext(DataContext);
  const [ buttonName, setButtonName ] = useState(['filterButton', 'filterButton']);


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
        setButtonName(['filterButton', 'filterButton']);
      }

    }
  };

  const handleFilter = (val) => {
    if (!loading) {

      const d = {
        autumnData: HT20,
        springData: VT20
      };

      let bNames = ['filterButton', 'filterButton']

      if( (val === 'red' && buttonName[0] === 'filterButton pressed') || (val === 'orange' && buttonName[1] === 'filterButton pressed') ) {
        setData(d);
        setButtonName(bNames);
        return;
      }

      bNames[0] = val === 'red' ? 'filterButton pressed' : bNames[0]
      bNames[1] = val === 'orange' ? 'filterButton pressed' : bNames[1]

      const courseColors = {...colorDist[0], ...colorDist[1]};

      const filterdAutumn = Object.keys(d['autumnData'])
        .filter(key => courseColors[key] === val)
        .reduce((obj, key) => {
          obj[key] = d['autumnData'][key];
          return obj;
        }, {});

      const filterdSpring = Object.keys(d['springData'])
        .filter(key => courseColors[key] === val)
        .reduce((obj, key) => {
          obj[key] = d['springData'][key];
          return obj;
        }, {});

        const filtered = {
          autumnData: filterdAutumn,
          springData: filterdSpring
        };

        setData(filtered);
        setButtonName(bNames)
    };
  };

    return (
      <div className="courseContainer">
        <div className="courseControls">
          <div className="courseSearch">
            <label className="searchLabel">Search for course code/short name</label>
            <input type="search" id="courseSeachInp" className="searchBar" onChange={e => handleKeyStroke(e.target.value)}></input>
          </div>
          <div className="courseFilter">
            <label className="filterLabel">Filter Options</label>
            <div>
              <button className={buttonName[0]} onClick={() => handleFilter('red')}>Filter on Red</button>
              <button className={buttonName[1]} onClick={() => handleFilter('orange')}>Filter on Yellow</button>
            </div>
          </div>
          <div className="courseInfo">
            <div className="redInfo">
                <div className="redBox"></div>
                <p className="reText">Task Hour Allocation Needed</p>
            </div>
            <div className="yellowInfo">
                <div className="yellowBox"></div>
                <p className="yellowText">Teacher Allocation Needed</p>
            </div>
          </div>
        </div>
        <div className="courseOverview">
          <CourseTableContent
            data={data}
          ></CourseTableContent>
        </div>
        <div className="courseDetailsContainer">
          <CourseDetails data={data}></CourseDetails>
        </div>
      </div>
    );
  }
