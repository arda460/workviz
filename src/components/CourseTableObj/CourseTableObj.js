import React from "react";
import Period from "../Period/Period";
import "./CourseTableObj.css";

function CourseTableObj(props) {
    const { colors, title, inCol, spreadNext, spreadAll, over, setHover, setCourseDetails } = props;
    return (
        <div className="courseColumn">
            <h5 className="periodTitle">{title}</h5>
            <div className="period">
                <Period colors={colors} setCourseDetails={setCourseDetails} toMap={inCol} classN='period1D' over={over} setHover={setHover}></Period>
                <Period colors={colors} setCourseDetails={setCourseDetails} toMap={spreadNext} classN='period2D' over={over} setHover={setHover}></Period>
                <Period colors={colors} setCourseDetails={setCourseDetails} toMap={spreadAll} classN='period4D' over={over} setHover={setHover}></Period>
            </div>
        </div>
    )
}

export default CourseTableObj;