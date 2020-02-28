export default function DistributeColors(autumnData, springData) {
    let springColors = {};
    let autumnColors = {};

    const cols = ['Föreläsning (Frl)  Budgeted', 'Övning (Ovn)  Budgeted', 'Laboration (La)  Budgeted',
        'Handledning (Ha)  Budgeted', 'Examination (Ex)  Budgeted', 'Kursutveckling (Ku)  Budgeted',
        'Administration (Adm)  Budgeted', 'Totalt  Budgeted'];


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

    const setColor = (data, key, autumn) => {
        const sum = teacherSum(data[key]['Teachers']);
        const totalBudg = isNaN(parseInt(data[key]['Totalt  Budgeted'])) ? 0 : parseInt(data[key]['Totalt  Budgeted']);
        const totalAllo = isNaN(parseInt(data[key]['Totalt  Allocated'])) ? 0 : parseInt(data[key]['Totalt  Allocated']);

        const check = cols.filter(k => {
            const alloKey = k.replace('Budgeted', 'Allocated');
            const budgVal = isNaN(parseInt(data[key][k])) ? 0 : parseInt(data[key][k]);
            const alloVal = isNaN(parseInt(data[key][alloKey])) ? 0 : parseInt(data[key][alloKey]);
            if (budgVal > alloVal)
                return true;
            return false;
        });

        if (autumn) {
            if (totalBudg === 0 || check.length > 0)
                autumnColors[key] = 'red';
            else if (sum < totalAllo || 'UNKNOWN MID' in data[key]['Teachers'])
                autumnColors[key] = 'orange';
        }
        else {
            if (totalBudg === 0 || check.length > 0)
                springColors[key] = 'red';
            else if (sum < totalAllo || 'UNKNOWN MID' in data[key]['Teachers'])
                springColors[key] = 'orange';
        }
    };

    // eslint-disable-next-line array-callback-return
    Object.keys(autumnData).map(key => {
        setColor(autumnData, key, true);
    });
    // eslint-disable-next-line array-callback-return
    Object.keys(springData).map(key => {
        setColor(springData, key, false);
    });

    return [autumnColors, springColors]
}