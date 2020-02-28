import React, { useContext } from "react";
import CourseTableObj from '../CourseTableObj/CourseTableObj';
import { DataContext } from "../../context/DataContext";

import "./CourseTableContent.css";

function CourseTableContent(props) {
    const { autumnData = {}, springData = {} } = props.data ? props.data : {};
    const { colorDist } = useContext(DataContext);

    let per1 = [], per2 = [], per3 = [], per4 = [], per12 = [], per34 = [], per14 = [];
    const springColors = colorDist[1];
    const autumnColors = colorDist[0];

    const distributeAutumn = (data, key) => {
        const periods = data[key]['Period'];
        if (periods.length === 1) {
            if (periods[0] === '1')
                per1.push(key);
            else
                per2.push(key);
        }
        else if (periods.length === 2) {
            if (periods[1] !== '2')
                per1.push(key);
            else
                per12.push(key);
        }
        else
            per14.push(key);
    };

    const distributeSpring = (data, key) => {
        const periods = data[key]['Period'];
        if (periods.length === 1) {
            if (periods[0] === '3')
                per3.push(key);
            else
                per4.push(key);
        }
        else if (periods.length === 2) {
            if (periods[1] !== '4')
                per3.push(key);
            else
                per34.push(key);
        }
        else
            per14.push(key);
    };


    // eslint-disable-next-line array-callback-return
    Object.keys(autumnData).map(key => {
        distributeAutumn(autumnData, key);
    });
    // eslint-disable-next-line array-callback-return
    Object.keys(springData).map(key => {
        distributeSpring(springData, key);
    });


    // SORT in alphabetical order
    per1.sort();
    per2.sort();
    per3.sort();
    per4.sort();
    per12.sort();
    per34.sort();
    per14.sort();

    return (
        <div className="courseTable">
            <CourseTableObj {...props} colors={[autumnColors, springColors]} title='Period 1' inCol={per1} spreadNext={per12} spreadAll={per14}></CourseTableObj>
            <CourseTableObj {...props} colors={[autumnColors, springColors]} title='Period 2' inCol={per2} spreadNext={per12} spreadAll={per14}></CourseTableObj>
            <CourseTableObj {...props} colors={[springColors, autumnColors]} title='Period 3' inCol={per3} spreadNext={per34} spreadAll={per14}></CourseTableObj>
            <CourseTableObj {...props} colors={[springColors, autumnColors]} title='Period 4' inCol={per4} spreadNext={per34} spreadAll={per14}></CourseTableObj>
        </div>
    )
}

export default CourseTableContent;