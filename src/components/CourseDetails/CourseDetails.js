import React, { useRef, useContext, useEffect, useState } from "react";
import { GlobalStateContext } from "../../context/GlobalStateContext";
import CourseDetailsRow from "../CourseDetailsRow/CourseDetailsRow";
import ProgressBars from "../ProgressBars/ProgressBars";
import StackedTeachers from "../StackedTeachers/StackedTeachers";
import { DataContext } from "../../context/DataContext";
import ProgressBar from "../ProgressBar/ProgressBar";
import ProgressCalculations from "../../utils/ProgressCalculations";

import "./CourseDetails.css";

export default function CourseDetails() {
  const { HT20, VT20 } = useContext(DataContext);
  const [progress, setProgress] = useState(null);
  const [totalProgress, setTotalProgress] = useState(null);

  const data = {
    autumnData: HT20,
    springData: VT20
  }

  const {
    courseDetails,
    setDisplayDetails,
    setOverView,
    setCourseDetails,
    setSelectedPerson,
    setPersonHover,
    personClick,
  } = useContext(GlobalStateContext);
  const d = useRef(null);

  const exitDetails = () => {
    setDisplayDetails(false);
    setOverView(true);
    setCourseDetails(false);
    setSelectedPerson(null);
    setPersonHover(null);
    d.current = null;
  };

  if (courseDetails) {
    d.current = data["autumnData"][courseDetails]
      ? data["autumnData"][courseDetails]
      : data["springData"][courseDetails];
  }

  useEffect(() => {
    const progressNumbers = ProgressCalculations(d.current);
    setTotalProgress(progressNumbers['Totalt  Budgeted']);
    delete progressNumbers['Totalt  Budgeted'];
    setProgress(progressNumbers);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [d.current]);


  return (
    <div className="courseDetailsContainer">
      <div id="courseFlex" className="courseFlex">
        {d.current && (
          <div className="detailsColInfo">
            <CourseDetailsRow
              cname="courseDetailInfo"
              label="Course"
              data={[courseDetails, d.current["short name"]]}
            />
            <CourseDetailsRow
              onClick={personClick}
              cname="courseDetailInfo"
              label="Responsible"
              data={
                d.current["Responsible"].length > 0
                  ? d.current["Responsible"]
                  : ["Not Available"]
              }
            />
            <CourseDetailsRow
              cname="courseDetailInfo row"
              label="Periods"
              data={d.current["Period"]}
            />
            <CourseDetailsRow
              cname="courseDetailInfo"
              label="Students"
              data={[d.current["Number of students"]]}
            />
            {d.current && progress &&
              <div className="detailsRow info">
                <h4 className="courseDetailCourseLabel">{totalProgress.label}</h4>
                <div className="courseDetailInfo">
                  <ProgressBar
                    key={totalProgress.key}
                    percentage={totalProgress.percentage}
                    percentage2={totalProgress.percentage2}
                    percentage3={totalProgress.percentage3}
                    bHours={totalProgress.bHours}
                    aHours={totalProgress.aHours}
                    tHours={totalProgress.tHours}
                    uHours={totalProgress.uHours}
                    label={totalProgress.label}
                    h={100}
                    totalMissingTH={totalProgress.TotalTeach} />
                </div>
              </div>
            }
          </div>
        )}
        {progress !== null && (
          <div className="detailsCol">
            <ProgressBars data={progress}></ProgressBars>
            <StackedTeachers d={d.current["Teachers"]}></StackedTeachers>
          </div>
        )}
        {d.current && (
          <div className="detailsCol exit">
            <button className="exitDetailsButton" onClick={() => exitDetails()}>
              X
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
