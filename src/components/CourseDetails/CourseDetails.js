import React, { useRef } from "react";

import "./CourseDetails.css";

export default function CourseDetails(props) {
    const { courseKey, data } = props;
    const d = useRef(null);

    if (courseKey) 
        d.current = data['autumnData'][courseKey] ? data['autumnData'][courseKey] : data['springData'][courseKey];
    

    console.log(d);

    return (
        <div className="courseFlex">
            {d.current &&
                <div className="detailsCol">
                    <div className="detailsRow"></div>
                    <div className="detailsRow"></div>
                    <div className="detailsRow"></div>
                    <div className="detailsRow"></div>
                </div>
            }
            {d.current &&
                <div className="detailsCol">
                    <div className="detailsRow"></div>
                    <div className="detailsRow"></div>
                </div>
            }
        </div>
    )
}