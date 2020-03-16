import React from "react";
import "./CourseDetailsRow.css";

export default function CourseDetails(props) {
    const { label, data, cname, onClick } = props;

    return (
        <div className="detailsRow">
            <h4 className="courseDetailCourseLabel">{label}</h4>
            <div className={cname}>
                {data.map((obj) => {
                    if (onClick && obj !== 'Not Available')
                        return <h5 className="courseDetailItem click" onClick={() => onClick(obj)} key={obj}>{obj}</h5>
                    else
                        return <h5 className="courseDetailItem" key={obj}>{obj}</h5>
                })
                }
            </div>
        </div>
    )
}