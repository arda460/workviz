import React from "react";

function TeacherInfo(props) {
  return (
    <div>
      <h3>Name</h3>
      {props.children}
    </div>
  );
}

export default TeacherInfo;
