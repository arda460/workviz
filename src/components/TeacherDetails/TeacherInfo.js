import React, { useContext } from "react";
import { GlobalStateContext } from "../../context/GlobalStateContext";
function TeacherInfo({ data, children }) {
  const {
    setDisplayDetails,
    setOverView,
    setSelectedPerson,
    exitTeacherDetails
  } = useContext(GlobalStateContext);
  if (!data) {
    return <>loading...</>;
  }
  const { name, summary } = data;
  return (
    <div className="infoContainer flex">
      <div className="flexcontainer flexcol">
        <div className="teacher-row">
          <div className="teacherInfo">
            <h5 className="teacher-label">{summary.Position}</h5>
            <div className="flexcol">
              <h3 className="teacherItem">{name}</h3>
              <span className="teacher-item">{summary.Department}</span>
            </div>
          </div>
        </div>
        <div className="teacher-row">
          <div className="teacherInfo">
            <h5 className="teacher-label">Staffing</h5>
            <div className="flexcol">
              <div>
                <h6>
                  {/* //eslint-ignore */}
                  <span className="info-title">
                    <strong>Gru Balance 20: </strong>
                    {summary["GRU balance 20"]}%
                  </span>
                  <span className="info-title">
                    <strong> Workload Balance: </strong>
                    {summary["Balance (%)"]} %
                  </span>
                </h6>
              </div>
              <div className="flexcol">{children[0]}</div>
            </div>
          </div>
        </div>
        <div className="teacher-row">
          <div className="teacherInfo">
            <h5 className="teacher-label">Courses</h5>
            <div className=" flexcontainer flexrow">
              <div className="flexcol course-list">
                <h5>HT</h5>
                {summary["HT Courses"].map(c => {
                  return <h6>{c["Course Code"]}</h6>;
                })}
              </div>
              <div className="flexcol course-list">
                <h5>VT</h5>
                {summary["VT Courses"].map(c => {
                  return <h6>{c["Course Code"]}</h6>;
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flexcol">
        <div>{children[1]}</div>
      </div>
      <div className="flexcol">
        <div className="detailsCol exit">
          <button
            className="exitDetailsButton"
            onClick={() => {
              exitTeacherDetails();
            }}
          >
            X
          </button>
        </div>
      </div>
    </div>
  );
}

export default TeacherInfo;
