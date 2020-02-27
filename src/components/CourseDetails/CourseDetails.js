import React, { useRef, useContext } from "react";
import { GlobalStateContext } from "../../context/GlobalStateContext";
import CourseWorksplitChart from "../CourseWorksplitChart/CourseWorksplitChart";
import "./CourseDetails.css";

export default function CourseDetails(props) {
    const { data } = props;
    const { courseDetails } = useContext(GlobalStateContext);
    const d = useRef(null);

    const margin = { top: 10, left: 10, bottom: 10, right: 10 };
    const height = 250;
    const width = 650;

    if (courseDetails)
        d.current = data['autumnData'][courseDetails] ? data['autumnData'][courseDetails] : data['springData'][courseDetails];

    return (
        <div className="courseFlex">
            {d.current &&
                <div className="detailsColInfo">
                    <div className="detailsRow">
                        <div className="courseDetailsCourse">
                            <h5 className="courseDetailCourseLabel">Course</h5>
                            <div className="courseDetailInfo">
                                <h4 className="courseDetailItem">{courseDetails}</h4>
                                <h6 className="courseDetailItem">{d.current['short name']}</h6>
                            </div>
                        </div>
                    </div>
                    <div className="detailsRow">
                        <div className="courseDetailsCourse">
                            <h5 className="courseDetailCourseLabel">Responsible</h5>
                            <div className="courseDetailInfo">
                                <h5 className="courseDetailItem">Name</h5>
                                <h6 className="courseDetailItem">Status</h6>
                                <h6 className="courseDetailItem">Department</h6>
                            </div>
                        </div>
                    </div>
                    <div className="detailsRow">
                        <div className="courseDetailsCourse">
                            <h5 className="courseDetailCourseLabel">Periods</h5>
                            <div className="courseDetailInfoRow">
                                {d.current['Period'].map(per => <h6 key={per} className="courseDetailItem">{per}</h6>)}
                            </div>
                        </div>
                    </div>
                    <div className="detailsRowFinal">
                        <div className="courseDetailsTeachers">
                            <div className="teacherTable">
                                <div>
                                    <div className="teacherTableTopRow">
                                        <h6>Responsibility</h6>
                                        <h6>Name</h6>
                                    </div>
                                </div>
                                <div className="teacherTableContent">
                                    {Object.keys(d.current['Teachers']).map(teach => {
                                        return (
                                            <div key={teach} className="teacherTableRow">
                                                <p>{Object.keys(d.current['Teachers'][teach]).map(resp => `${resp} `)}</p>
                                                <p>{teach}</p>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
            {d.current &&
                <div className="detailsCol">
                    <div className="detailsRow">
                        <CourseWorksplitChart d={d.current}></CourseWorksplitChart>
                    </div>
                    <div className="detailsRow"></div>
                </div>
            }
        </div>
    )
}