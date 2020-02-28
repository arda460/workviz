import React from "react";
import CourseTableObj from '../CourseTableObj/CourseTableObj';

import "./CourseTableContent.css";

function CourseTableContent(props) {
    const { autumnData = {}, springData = {} } = props.data ? props.data : {};

    let per1 = [], per2 = [], per3 = [], per4 = [], per12 = [], per34 = [], per14 = [];
    let springColors = {};
    let autumnColors = {};

    const cols = ['Föreläsning (Frl)  Budgeted', 'Övning (Ovn)  Budgeted', 'Laboration (La)  Budgeted',
                    'Handledning (Ha)  Budgeted', 'Examination (Ex)  Budgeted', 'Kursutveckling (Ku)  Budgeted',
                    'Administration (Adm)  Budgeted', 'Totalt  Budgeted'];

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

    const teacherSum = (data) => {
        let sum = 0;
        const keys = Object.keys(data);
        for (const key of keys) {
            const innerKeys = Object.keys(data[key]);
            for (const innerKey of innerKeys) {
                sum += isNaN(parseInt(data[key][innerKey])) ? 0 : parseInt(data[key][innerKey]);
            }
        }
        return sum;
    };

    const setAutumnColor = (data, key) => {
        const sum = teacherSum(data[key]['Teachers']);
        const totalBudg = isNaN(parseInt(data[key]['Totalt  Budgeted'])) ? 0 : parseInt(data[key]['Totalt  Budgeted']);
        const totalAllo = isNaN(parseInt(data[key]['Totalt  Allocated'])) ? 0 : parseInt(data[key]['Totalt  Allocated']);
        
        const check = cols.filter(k => {
            const alloKey = k.replace('Budgeted', 'Allocated');
            const budgVal = isNaN(parseInt(data[key][k])) ? 0 : parseInt(data[key][k]);
            const alloVal = isNaN(parseInt(data[key][alloKey])) ? 0 : parseInt(data[key][alloKey]);
            if(budgVal > alloVal)
                return true;
            return false;
        });

        if ( totalBudg === 0 || check.length > 0)
            autumnColors[key] = 'red';
        else if (sum < totalAllo || 'UNKNOWN MID' in data[key]['Teachers'])
            autumnColors[key] = 'orange';
    };

    const setSpringColor = (data, key) => {
        const sum = teacherSum(data[key]['Teachers']);
        const totalBudg = isNaN(parseInt(data[key]['Totalt  Budgeted'])) ? 0 : parseInt(data[key]['Totalt  Budgeted']);
        const totalAllo = isNaN(parseInt(data[key]['Totalt  Allocated'])) ? 0 : parseInt(data[key]['Totalt  Allocated']);

        const check = cols.filter(k => {
            const alloKey = k.replace('Budgeted', 'Allocated');
            const budgVal = isNaN(parseInt(data[key][k])) ? 0 : parseInt(data[key][k]);
            const alloVal = isNaN(parseInt(data[key][alloKey])) ? 0 : parseInt(data[key][alloKey]);
            if(budgVal > alloVal)
                return true;
            return false;
        });

        if ( totalBudg === 0 || check.length > 0)
            springColors[key] = 'red';
        else if (sum < totalAllo || 'UNKNOWN MID' in data[key]['Teachers']) 
            springColors[key] = 'orange';
    };

    // eslint-disable-next-line array-callback-return
    Object.keys(autumnData).map(key => {
        distributeAutumn(autumnData, key);
        setAutumnColor(autumnData, key);
    });
    // eslint-disable-next-line array-callback-return
    Object.keys(springData).map(key => {
        distributeSpring(springData, key);
        setSpringColor(springData, key);
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