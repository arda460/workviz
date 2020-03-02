import React, { useEffect, useState} from "react";
import ProgressBar from '../ProgressBar/ProgressBar';
import "./ProgressBars.css";

export default function ProgressBars(props) {
    const { data } = props;
    const [ progressHeight, setProgressHeight ] = useState(110);
    
    const cols = ['Föreläsning (Frl)  Budgeted', 'Övning (Ovn)  Budgeted', 'Laboration (La)  Budgeted',
        'Handledning (Ha)  Budgeted', 'Examination (Ex)  Budgeted', 'Kursutveckling (Ku)  Budgeted',
        'Administration (Adm)  Budgeted', 'Totalt  Budgeted'];

    const labels = ['Föreläsning', 'Övning', 'Laboration', 'Handledning', 'Examination', 'Kursutveckling', 'Administration', 'Totalt'];

    const getLabel = (str) => {
        for(let i=0; i<labels.length; i++) {
            if(str.includes(labels[i]))
                return labels[i];
        }
    }
    
    window.addEventListener("resize", () => {
        const container = document.getElementById('courseFlex');
        setProgressHeight(container.clientHeight * 0.334);
    });


    return (
        <div className="detailsRow progress">
            {cols.map( key => {
                const alloKey = key.replace('Budgeted', 'Allocated');
                const budgetedHours = parseInt(data[key]);
                const allocatedHours = parseInt(data[alloKey]);
                const percentage = allocatedHours === 0 ? 0 : allocatedHours/budgetedHours;
                const label = getLabel(key);
                return (
                    <ProgressBar 
                        key={key} 
                        percentage={percentage} 
                        budgeted={budgetedHours}
                        height={progressHeight}
                        label={label}/>
                )
            })}
        </div>
    )
}