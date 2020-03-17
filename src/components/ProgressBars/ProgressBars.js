import React, { useState, useEffect, useContext } from "react";
import ProgressBar from '../ProgressBar/ProgressBar';
import { GlobalStateContext } from "../../context/GlobalStateContext";
import "./ProgressBars.css";

export default function ProgressBars(props) {
    const { data } = props;
    const [teacherHoursSplit, setSplit] = useState({ 'Frl': 0, 'Ovn': 0, 'La': 0, 'Ha': 0, 'Ex': 0, 'Ku': 0, 'Adm': 0, 'Totalt': 0 });
    const [unknownHoursSplit, setUnknownSplit] = useState({});
    const { setTotalProgress } = useContext(GlobalStateContext);

    const cols = ['Föreläsning (Frl)  Budgeted', 'Övning (Ovn)  Budgeted', 'Laboration (La)  Budgeted',
        'Handledning (Ha)  Budgeted', 'Examination (Ex)  Budgeted', 'Kursutveckling (Ku)  Budgeted',
        'Administration (Adm)  Budgeted', 'Totalt  Budgeted'];

    const connection1 = {
        'Föreläsning (Frl)  Budgeted': 'Frl',
        'Övning (Ovn)  Budgeted': 'Ovn',
        'Laboration (La)  Budgeted': 'La',
        'Handledning (Ha)  Budgeted': 'Ha',
        'Examination (Ex)  Budgeted': 'Ex',
        'Kursutveckling (Ku)  Budgeted': 'Ku',
        'Administration (Adm)  Budgeted': 'Adm',
        'Totalt  Budgeted': 'Totalt'
    };

    const labels = ['Föreläsning', 'Övning', 'Laboration', 'Handledning', 'Examination', 'Kursutveckling', 'Administration', 'Totalt'];

    const getLabel = (str) => {
        for (let i = 0; i < labels.length; i++) {
            if (str.includes(labels[i]))
                return labels[i];
        }
    }

    useEffect(() => {
        const teacherHours = { 'Frl': 0, 'Ovn': 0, 'La': 0, 'Ha': 0, 'Ex': 0, 'Ku': 0, 'Adm': 0, 'Totalt': 0 };
        const teachers = Object.keys(data['Teachers']);
        for (const teacher of teachers) {
            const keys = Object.keys(data['Teachers'][teacher]);
            for (const key of keys) {
                teacherHours['Totalt'] += parseInt(data['Teachers'][teacher][key]);
                teacherHours[key] += parseInt(data['Teachers'][teacher][key]);
            }
        }

        let unknownHours = {};
        if (data['Teachers']['UNKNOWN MID']) {
            unknownHours = { ...data['Teachers']['UNKNOWN MID'] };
            const totalUnknown = Object.keys(data['Teachers']['UNKNOWN MID']).reduce((sum, k) => {
                return sum + parseInt(data['Teachers']['UNKNOWN MID'][k])
            }, 0);
            unknownHours['Totalt'] = totalUnknown;
        }

        setSplit(teacherHours);
        setUnknownSplit(unknownHours);
        setTotalProgress(getValuesNow('Totalt  Budgeted', teacherHours, unknownHours));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    function RingLabel({ cname, text }) {

        return (
            <div className="ringLabel">
                <div className={`ring ${cname}`}></div>
                <p className="labelText ringLabel">{text}</p>
            </div>
        );
    }
    function getValues(key) {
        // From data
        const alloKey = key.replace('Budgeted', 'Allocated');
        const budgetedHours = parseInt(data[key]);
        const allocatedHours = parseInt(data[alloKey]);
        const percentage = allocatedHours === 0 ? 0 : allocatedHours / budgetedHours;
        const label = getLabel(key);
        // Teacher Hours
        const tHours = teacherHoursSplit[connection1[key]];
        const percentage2 = tHours === 0 ? 0 : tHours / allocatedHours;
        // "UNKNOWN MID" hours
        const uHours = unknownHoursSplit[connection1[key]] ? unknownHoursSplit[connection1[key]] : 0;
        const percentage3 = uHours === 0 ? 0 : uHours / allocatedHours;

        return {
            key: key,
            percentage: percentage,
            percentage2: percentage2,
            percentage3: percentage3,
            bHours: budgetedHours,
            aHours: allocatedHours,
            tHours: tHours,
            uHours: uHours,
            label: label
        }
    }
    function getValuesNow(key, tSplit, uSplit) {
        // From data
        const alloKey = key.replace('Budgeted', 'Allocated');
        const budgetedHours = parseInt(data[key]);
        const allocatedHours = parseInt(data[alloKey]);
        const percentage = allocatedHours === 0 ? 0 : allocatedHours / budgetedHours;
        const label = getLabel(key);
        // Teacher Hours
        const tHours = tSplit[connection1[key]];
        const percentage2 = tHours === 0 ? 0 : tHours / allocatedHours;
        // "UNKNOWN MID" hours
        const uHours = uSplit[connection1[key]] ? uSplit[connection1[key]] : 0;
        const percentage3 = uHours === 0 ? 0 : uHours / allocatedHours;

        return {
            key: key,
            percentage: percentage,
            percentage2: percentage2,
            percentage3: percentage3,
            bHours: budgetedHours,
            aHours: allocatedHours,
            tHours: tHours,
            uHours: uHours,
            label: label
        }
    }

    return (
        <div className="progressRow">
            <div className="sLabels">
                <RingLabel cname="lightGreen" text="Allication matches budget" />
                <RingLabel cname="darkGreen" text="Allocation exceeds budget" />
                <RingLabel cname="red" text="Missing allocation" />
                <RingLabel cname="yellow" text="Missing teacher allocation" />
                <RingLabel cname="dotted" text="Not budgeted" />
            </div>
            <div className="detailsRow progress">
                {
                    cols.map(key => {
                        if (key !== 'Totalt  Budgeted') {
                            const vals = getValues(key);
                            return (
                                <ProgressBar
                                    key={key}
                                    percentage={vals.percentage}
                                    percentage2={vals.percentage2}
                                    percentage3={vals.percentage3}
                                    bHours={vals.bHours}
                                    aHours={vals.aHours}
                                    tHours={vals.tHours}
                                    uHours={vals.uHours}
                                    label={vals.label} />
                            )
                        }
                    })}
            </div>
        </div>
    )
}