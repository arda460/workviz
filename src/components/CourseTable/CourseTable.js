import React, { useState, useEffect } from "react";
import CourseTableContent from '../CourseTableContent/CourseTableContent';
import CourseDetails from '../CourseDetails/CourseDetails';

import "./CourseTable.css";

export default function CourseTable(props) {
    const [ data, setData ] = useState(null);
    const [courseDetails, setCourseDetails] = useState(false);

    useEffect(() => {
        async function getData() {
            const autumnResponse = await fetch('./Data/HT20.json');
            const autumnData = await autumnResponse.json();
            const springResponse = await fetch('./Data/VT20.json');
            const springData = await springResponse.json();
            const data = {
                autumnData: autumnData,
                springData: springData
            }
            setData(data);
        }
        getData();
     },[])  

    return (
        <div className="courseContainer">
            <div className="courseOverview">
                <CourseTableContent {...props} setCourseDetails={setCourseDetails} data={data} ></CourseTableContent>        
            </div>
            <div className="courseDetailsContainer">
                <CourseDetails courseKey={courseDetails} data={data}></CourseDetails>
            </div>
        </div>
    )
}