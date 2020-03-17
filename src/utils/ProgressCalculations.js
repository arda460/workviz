export default function ProgressCalculations(data) {

    // Keys in Data (we need both Budgeted and Allocated keys, handled bellow)
    const cols = ['Föreläsning (Frl)  Budgeted', 'Övning (Ovn)  Budgeted', 'Laboration (La)  Budgeted',
        'Handledning (Ha)  Budgeted', 'Examination (Ex)  Budgeted', 'Kursutveckling (Ku)  Budgeted',
        'Administration (Adm)  Budgeted', 'Totalt  Budgeted'];

    // Map keys to labels
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

    // Labels for progress bars
    const labels = ['Föreläsning', 'Övning', 'Laboration', 'Handledning', 'Examination', 'Kursutveckling', 'Administration', 'Totalt'];

    // For a key, return label
    const getLabel = (str) => {
        for (let i = 0; i < labels.length; i++) {
            if (str.includes(labels[i]))
                return labels[i];
        }
    }


    // Sum all teacher hours for each task
    const teacherHours = { 'Frl': 0, 'Ovn': 0, 'La': 0, 'Ha': 0, 'Ex': 0, 'Ku': 0, 'Adm': 0, 'Totalt': 0 };
    const teachers = Object.keys(data['Teachers']);
    for (const teacher of teachers) {
        const keys = Object.keys(data['Teachers'][teacher]);
        for (const key of keys) {
            teacherHours['Totalt'] += parseInt(data['Teachers'][teacher][key]);
            teacherHours[key] += parseInt(data['Teachers'][teacher][key]);
        }
    };

    // Sum all "UNKNOWN MID" hours
    let unknownHours = {};
    if (data['Teachers']['UNKNOWN MID']) {
        unknownHours = { ...data['Teachers']['UNKNOWN MID'] };
        const totalUnknown = Object.keys(data['Teachers']['UNKNOWN MID']).reduce((sum, k) => {
            return sum + parseInt(data['Teachers']['UNKNOWN MID'][k])
        }, 0);
        unknownHours['Totalt'] = totalUnknown;
    };

    let totalMissingTeacherH = 0;
    function getValues(key) {
        // From data
        const alloKey = key.replace('Budgeted', 'Allocated');
        const budgetedHours = parseInt(data[key]);
        const allocatedHours = parseInt(data[alloKey]);
        const percentage = allocatedHours === 0 ? 0 : allocatedHours / budgetedHours;
        const label = getLabel(key);
        // Teacher Hours
        const tHours = teacherHours[connection1[key]];
        const percentage2 = tHours === 0 ? 0 : tHours / allocatedHours;
        // "UNKNOWN MID" hours
        const uHours = unknownHours[connection1[key]] ? unknownHours[connection1[key]] : 0;
        const percentage3 = uHours === 0 ? 0 : uHours / allocatedHours;
        // sum together total missing teacher hours
        if(tHours < allocatedHours && key !== 'Totalt  Budgeted')
            totalMissingTeacherH += (allocatedHours - tHours)

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

    let retObj = {};
    cols.map( key => {
        retObj[key] = getValues(key);
    })

    retObj['Totalt  Budgeted']['TotalTeach'] = totalMissingTeacherH;
    return retObj;
}