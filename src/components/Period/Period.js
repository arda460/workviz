import React from "react";
import "./Period.css";

export default function Period(props) {
    const { toMap, classN, colors, over, setHover, setCourseDetails } = props;
    return (
        <div className={classN}>
            {toMap &&
                toMap.map(course => {
                    const color = colors[course];
                    const c1 = over === course ? 'button hover' : 'button';
                    const c2 = c1 === 'button hover' ? c1 : color ? `button ${color}` : 'button';
                    return (
                        <button key={course} className={c2} data-id={course} onClick={ e => setCourseDetails(e.currentTarget.dataset.id)} onMouseEnter={() => setHover(course)} onMouseLeave={() => setHover('')}>{course}</button>
                    )
                })
            }
        </div>
    )
}
