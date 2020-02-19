import React from "react";
import "./CourseTableObj.css";

function CourseTableObj(props) {
    const { colors, title, inCol, spreadNext, spreadAll, over, setHover } = props;
    return (
        <div className="courseColumn">
            <h5 className="periodTitle">{title}</h5>
            <div className="period">
                <div className="period1D">
                    {inCol &&
                        inCol.map(course => {
                            const color = colors[course];
                            const c1 = over === course ? 'button hover' : 'button';
                            const c2 = c1 === 'button hover' ? c1 : color ? `button ${color}` : 'button';
                            return (
                                <button key={course} className={c2} onMouseEnter={() => setHover(course)} onMouseLeave={() => setHover('')}>{course}</button>
                            )
                        })
                    }
                </div>
                <div className="period2D">
                    {spreadNext &&
                        spreadNext.map(course => {
                            const color = colors[course];
                            const c1 = over === course ? 'button hover' : 'button';
                            const c2 = c1 === 'button hover' ? c1 : color ? `button ${color}` : 'button';
                            return (
                                <button key={course} className={c2} onMouseEnter={() => setHover(course)} onMouseLeave={() => setHover('')}>{course}</button>
                            )
                    })
                }
                </div>
                <div className="period4D">
                    {spreadAll &&
                        spreadAll.map(course => {
                            const color = colors[course];
                            const c1 = over === course ? 'button hover' : 'button';
                            const c2 = c1 === 'button hover' ? c1 : color ? `button ${color}` : 'button';
                            return (
                                <button key={course} className={c2} onMouseEnter={() => setHover(course)} onMouseLeave={() => setHover('')}>{course}</button>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default CourseTableObj;