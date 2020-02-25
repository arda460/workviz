import React from "react";
import "./Period.css";

export default function Period(props) {
    const { toMap, classN, colors, over, setHover, setCourseDetails } = props;
    return (
        <div className={classN}>
            {toMap &&
                toMap.map(course => {
                    const color = colors[course];
                    const c1 = color ? `button ${color}` : 'button'; 
                    const c2 = over === course ? ' hover' : ''; 
                    const cName = c1 + c2;
                    return (
                        <button key={course} className={cName} data-id={course} onClick={ e => setCourseDetails(e.currentTarget.dataset.id)} onMouseEnter={() => setHover(course)} onMouseLeave={() => setHover('')}>{course}</button>
                    )
                })
            }
        </div>
    )
}
