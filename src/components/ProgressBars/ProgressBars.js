import React from "react";
import ProgressBar from '../ProgressBar/ProgressBar';
import "./ProgressBars.css";

export default function ProgressBars(props) {
    const { data } = props;

    const cols = ['Föreläsning (Frl)  Budgeted', 'Övning (Ovn)  Budgeted', 'Laboration (La)  Budgeted',
        'Handledning (Ha)  Budgeted', 'Examination (Ex)  Budgeted', 'Kursutveckling (Ku)  Budgeted',
        'Administration (Adm)  Budgeted'];

    function RingLabel({ cname, text }) {
        return (
            <div className="ringLabel">
                <div className={`ring ${cname}`}></div>
                <p className="labelText ringLabel">{text}</p>
            </div>
        );
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
                        return (
                            <ProgressBar
                                key={key}
                                percentage={data[key].percentage}
                                percentage2={data[key].percentage2}
                                percentage3={data[key].percentage3}
                                bHours={data[key].bHours}
                                aHours={data[key].aHours}
                                tHours={data[key].tHours}
                                uHours={data[key].uHours}
                                label={data[key].label} />
                        )
                    }
                    )}
            </div>
        </div>
    )
}