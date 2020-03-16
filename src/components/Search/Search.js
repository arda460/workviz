import React, { useState, useContext } from "react";
import { DataContext } from "../../context/DataContext";
import { GlobalStateContext } from "../../context/GlobalStateContext";
import "./Search.css";

export default function Search() {
  const { colorDist, HT20, VT20, summary20, loading } = useContext(DataContext);
  const {
    courseOverview,
    setCourseOverview,
    setFilterTeachers,
    displayDetails,
    overView,
    setOverView
  } = useContext(GlobalStateContext);
  const [buttonName, setButtonName] = useState([
    "filterButton",
    "filterButton"
  ]);
  const [sliderStatus, setSliderStatus] = useState(false);

  const handleKeyStroke = val => {
    if (courseOverview !== null) {
      if (!sliderStatus) {
        const d = {
          autumnData: HT20,
          springData: VT20
        };

        if (val === "") {
          setCourseOverview(d);
        } else {
          const filterdAutumn = Object.keys(d["autumnData"])
            .filter(key => {
              if (
                key.includes(val.toUpperCase()) ||
                d["autumnData"][key]["short name"]
                  .toUpperCase()
                  .includes(val.toUpperCase())
              )
                return true;

              return false;
            })
            .reduce((obj, key) => {
              obj[key] = d["autumnData"][key];
              return obj;
            }, {});

          const filterdSpring = Object.keys(d["springData"])
            .filter(key => {
              if (
                key.includes(val.toUpperCase()) ||
                d["springData"][key]["short name"]
                  .toUpperCase()
                  .includes(val.toUpperCase())
              )
                return true;
              return false;
            })
            .reduce((obj, key) => {
              obj[key] = d["springData"][key];
              return obj;
            }, {});

          const filtered = {
            autumnData: filterdAutumn,
            springData: filterdSpring
          };

          setCourseOverview(filtered);
          setButtonName(["filterButton", "filterButton"]);
        }
      } else {
        if (val === "") {
          setFilterTeachers(null);
        } else {
          const oData = summary20;
          const filterTeachers = Object.keys(oData)
            .filter(key => {
              const teacherName = key.toUpperCase();
              if (teacherName.includes(val.toUpperCase())) return true;

              return false;
            })
            .reduce((obj, key) => {
              obj[key] = oData[key];
              return obj;
            }, {});

          setFilterTeachers(filterTeachers);
        }
      }
    }
  };

  const handleFilter = val => {
    if (!loading) {
      const d = {
        autumnData: HT20,
        springData: VT20
      };

      let bNames = ["filterButton", "filterButton"];

      if (
        (val === "red" && buttonName[0] === "filterButton pressed bg-red") ||
        (val === "orange" && buttonName[1] === "filterButton pressed bg-orange")
      ) {
        setCourseOverview(d);
        setButtonName(bNames);
        return;
      }

      bNames[0] = val === "red" ? "filterButton pressed bg-red" : bNames[0];
      bNames[1] =
        val === "orange" ? "filterButton pressed bg-orange" : bNames[1];

      const courseColors = { ...colorDist[0], ...colorDist[1] };

      const filterdAutumn = Object.keys(d["autumnData"])
        .filter(key => courseColors[key] === val)
        .reduce((obj, key) => {
          obj[key] = d["autumnData"][key];
          return obj;
        }, {});

      const filterdSpring = Object.keys(d["springData"])
        .filter(key => courseColors[key] === val)
        .reduce((obj, key) => {
          obj[key] = d["springData"][key];
          return obj;
        }, {});

      const filtered = {
        autumnData: filterdAutumn,
        springData: filterdSpring
      };

      setCourseOverview(filtered);
      setButtonName(bNames);
    }
  };

  const handleSlider = () => {
    const val = document.getElementById("searchSlider").checked;
    setSliderStatus(val);
    if (val) {
      const d = {
        autumnData: HT20,
        springData: VT20
      };
      setCourseOverview(d);
      setButtonName(["filterButton", "filterButton"]);
    } else {
      setFilterTeachers(null);
    }
  };

  return (
    <div className="courseControls">
      <div className="courseSearch">
        <label className="searchLabel">
          Search for{!sliderStatus ? " course code/short name" : " teacher"}
        </label>
        <div className="searchToggle">
          <input
            type="search"
            id="courseSeachInp"
            className="searchBar"
            onChange={e => handleKeyStroke(e.target.value)}
          ></input>
          <div className="toggler">
            <label className="switch">
              <input
                type="checkbox"
                id="searchSlider"
                onClick={() => handleSlider()}
              />
              <span className="slider round"></span>
            </label>
          </div>
        </div>
      </div>
      <div className="courseFilter">
          <label className="filterLabel">Filter on</label>
          <div className="filterButtons">
            <button className={buttonName[0]} onClick={() => handleFilter("red")}>
              Task Allocation
          </button>
            <button
              className={buttonName[1]}
              onClick={() => handleFilter("orange")}
            >
              Teacher Allocation
          </button>
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
      {displayDetails && (
        <div className="overViewToggle">
          <button
            className="ovToggleButton"
            onClick={() => setOverView(!overView)}
          >
            Toggle Overview
          </button>
        </div>
      )}
    </div>
  );
}