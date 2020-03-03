import React from "react";

function TeacherInfo({ data, children }) {
  if (!data) {
    return <>loading...</>;
  }
  const { name, summary } = data;

  return (
    <div className="infoContainer flexrow">
      <div className="flexcontainer flexcol">
        <div className="teacher-row">
          <div className="teacherInfo">
            <h5 className="teacher-label w30">{summary.Position}</h5>
            <div className="flexcol">
              <h3 className="teacherItem">{name}</h3>
              <span className="teacher-item">{summary.Department}</span>
            </div>
          </div>
        </div>
        <div className="teacher-row">
          <div className="teacherInfo">
            <h5 className="teacher-label w30">Staffing</h5>
            <div className="flexcol">
              <div>
                <h6>
                  <strong>Gru Balance 19: </strong>
                  {summary["GRU balance 19"]}%<strong> Gru Balance 20: </strong>
                  {summary["GRU balance 20"]} %
                </h6>
              </div>
              <div className="flexcol">{children[0]}</div>
            </div>
          </div>
        </div>
        <div className="teacher-row">
          <div className="teacherInfo">
            <h5 className="teacher-label w30">Courses</h5>
            <div className=" flexcontainer flexrow w100">
              <div className="flexcol">
                <h5>HT</h5>
                {summary["HT Courses"].map(c => {
                  return <h6>{c["Course Code"]}</h6>;
                })}
              </div>
              <div className="flexcol">
                <h5>VT</h5>
                {summary["VT Courses"].map(c => {
                  return <h6>{c["Course Code"]}</h6>;
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>{children[1]}</div>
    </div>
  );
}

export default TeacherInfo;
//container(block) - courseFlex(flex) - courseInfo(column w=25%) - row(min-w 100%) - detailCourse(flex-row)
