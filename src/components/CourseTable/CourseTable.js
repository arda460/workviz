import React, { useState, useEffect } from "react";
import CourseTableContent from '../CourseTableContent/CourseTableContent';

import "./CourseTable.css";

export default function CourseTable(props) {

    const [ data, setData ] = useState(null);

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
        <div className="courseOverview">
            <CourseTableContent {...props} data={data}></CourseTableContent>
        </div>
    )
}