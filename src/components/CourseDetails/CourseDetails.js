import React, { useRef } from "react";

import "./CourseDetails.css";

export default function CourseDetails(props) {
    const { courseKey, data } = props;
    const d = useRef(null);

    if (courseKey) {
        console.log(data);
        d.current = data['autumnData'][courseKey] ? data['autumnData'][courseKey] : data['springData'][courseKey];
    }

    return (
        <div className="courseDetails">
            {d.current &&
            <div className="detailsItem">
                <h4>Teachers</h4>
                {
                Object.keys(d.current['Teachers']).map(teach => {
                    return (
                        <ul key={teach}>
                            <li key={teach}>{teach}</li>
                        </ul>
                    )
                })
                }
            </div>
            }
            {d.current &&
            <div className="detailsItem">
                <h4>Periods</h4>
                {
                d.current['Period'].map(teach => {
                    return (
                        <ul key={teach}>
                            <li key={teach}>{teach}</li>
                        </ul>
                    )
                })
                }
            </div>
            }
        </div>
    )
}