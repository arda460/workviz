import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import "./StackedTeachers.css";

export default function StackedTeachers(props) {
    const svgRef = useRef(null);

    



    return (
        <div className="stackedTeachersRow">
            <svg className="stackedTeachers" ref={svgRef}></svg>
        </div>
    )
}