import React from "react";
import Period from "../Period/Period";
import "./CourseTableObj.css";

function CourseTableObj(props) {
    const { colors, title, inCol, spreadNext, spreadAll, setCourseDetails } = props;
    const mergedColors = {...colors[0],...colors[1]};
    return (
        <div className="courseColumn">
            <h5 className="periodTitle">{title}</h5>
            <div className="period">
                <Period colors={colors[0]} setCourseDetails={setCourseDetails} toMap={inCol} classN='period1D'></Period>
                <Period colors={colors[0]} setCourseDetails={setCourseDetails} toMap={spreadNext} classN='period2D'></Period>
                <Period colors={mergedColors} setCourseDetails={setCourseDetails} toMap={spreadAll} classN='period4D'></Period>
            </div>
        </div>
    )
}

export default CourseTableObj;