import React, { useRef, useEffect } from "react";
import ProgressBar from '../ProgressBar/ProgressBar';
import "./ProgressBars.css";

export default function ProgressBars(props) {
    const { data } = props;
    
    const cols = ['Föreläsning (Frl)  Budgeted', 'Övning (Ovn)  Budgeted', 'Laboration (La)  Budgeted',
        'Handledning (Ha)  Budgeted', 'Examination (Ex)  Budgeted', 'Kursutveckling (Ku)  Budgeted',
        'Administration (Adm)  Budgeted', 'Totalt  Budgeted'];

    return (
        <div className="detailsRow progress">
            {cols.map( key => {
                const alloKey = key.replace('Budgeted', 'Allocated');
                const budgetedHours = parseInt(data[key]);
                const allocatedHours = parseInt(data[alloKey]);
                const percentage = allocatedHours === 0 ? 0 : allocatedHours/budgetedHours;
                return <ProgressBar key={key} percentage={percentage}></ProgressBar>
            })}
        </div>
    )
}