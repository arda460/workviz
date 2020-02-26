import React, {useContext} from "react";
import "./Period.css";
import { GlobalStateContext } from "../../context/GlobalStateContext";
import { DataContext } from "../../context/DataContext";

export default function Period(props) {
    const { toMap, classN, colors } = props;
    const { personHover, courseHover, setCourseHover, setCourseDetails } = useContext(GlobalStateContext); //get related value from  the global state
    const { summary20, loading } = useContext(DataContext); //get summary20Data which has the course data for each person

    return (
        <div className={classN}>
            {toMap &&
                toMap.map(course => {
                    const color = colors[course];
                    const c1 = color ? `button ${color}` : 'button'; 
                    // If hovering on course overView
                    const c2 = courseHover === course ? ' hover' : '';

                    let c3 = '';
                    // If hovering on techer overView
                    if (!loading && personHover) {
                        const vt = summary20[personHover.name]["VT Courses"].filter( c => course === c['Course Code']);
                        const ht = summary20[personHover.name]["HT Courses"].filter( c => course === c['Course Code']);
                        c3 = vt.length > 0 || ht.length > 0 ? ' hover' : ' notHovered';
                    }
                    const c4 = c3 ? c3 : c2;
                    const cName = c1 + c4;
                    return (
                        <button key={course} className={cName} data-id={course} onClick={ e => setCourseDetails(e.currentTarget.dataset.id)} onMouseEnter={() => setCourseHover(course)} onMouseLeave={() => setCourseHover(null)}>{course}</button>
                    )
                })
            }
        </div>
    )
}
