import React, { useRef, useContext } from "react";
import { GlobalStateContext } from "../../context/GlobalStateContext";
import CourseDetailsRow from "../CourseDetailsRow/CourseDetailsRow";
import "./CourseDetails.css";

export default function CourseDetails(props) {
    const { data } = props;
    const { courseDetails, setCourseDetails } = useContext(GlobalStateContext);
    const d = useRef(null);

    const exitDetails = () => {
        setCourseDetails(false);
        d.current = null;
    };

    if (courseDetails)
        d.current = data['autumnData'][courseDetails] ? data['autumnData'][courseDetails] : data['springData'][courseDetails];

    return (
        <div className="courseFlex">
            {d.current &&
                <div className="detailsColInfo">
                    <CourseDetailsRow cname="courseDetailInfo" label="Course" data={[courseDetails, d.current['short name']]}/>
                    <CourseDetailsRow 
                        cname="courseDetailInfo" 
                        label="Responsible" 
                        data={d.current['Responsible'].length > 0 ? d.current['Responsible'] : ['Not Available']}/>
                    <CourseDetailsRow cname="courseDetailInfo row" label="Periods" data={d.current['Period']}/>
                </div>
            }
            {d.current && 
                <div className="detailsCol"></div>
            }
            {d.current &&
                <div className="detailsCol exit">
                    <button className="exitDetailsButton" onClick={() => exitDetails()}>X</button>
                </div>
            }
        </div>
    )
}