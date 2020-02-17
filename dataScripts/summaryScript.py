import csv
import json
import pandas as pd

# Global
filename = "./rawData/summary20.csv"
outputName = "summary20.json"
 
def getCourses(row, k):
    courseList = []
    # Handle multible courses in column
    if not isinstance(row[k], float):
        # Get all course lines
        lines = row[k].split('\n')
        for i in range(len(lines)):
            # Split course line into code,name and %
            course = lines[i].split(' ')
            tmp = {
                "Course Code": course[0],
                "Short Name": course[1][:-1], # Remove ":" from name
                "Work %": course[2]
            }
            courseList.append(tmp)
    return courseList

def clean(row, col, val):
    return row[col] if not isinstance(row[col], float) else val


def main():
    data = pd.read_csv(filename, encoding='utf8')
    teachers = {}

    for index, row in data.iterrows():
        # Check if empty line and skil "Total" line
        if not isinstance(row["Name"], float) and index != 0:
            teachers[row["Name"]] = {}

            teachers[row["Name"]]["Position"] = clean(row, "Position", "NA")            
            teachers[row["Name"]]["Department"] = clean(row, "Dept", "NA")
            teachers[row["Name"]]["Kontering HCT (%)"] = clean(row, "Kontering HCT (%)", "0")
            teachers[row["Name"]]["Bemnnad HCT Gru (%)"] = clean(row, "Bemnnad HCT Gru (%)", "0")
    
            teachers[row["Name"]]["VT Courses"] = getCourses(row, "VT courses + exjobb")
            teachers[row["Name"]]["Gru VT (%)"] = row["Gru VT (%).1"]
    
            teachers[row["Name"]]["HT Courses"] = getCourses(row, "HT courses")
            teachers[row["Name"]]["Gru HT (%)"] = row["Gru HT (%).1"]

            teachers[row["Name"]]["Self-development &Friskvård (%)"] = clean(row, "Self-development &Friskvård (%)", "0")
            teachers[row["Name"]]["Extra (%)"] = clean(row, "Extra (%)", "0")
            teachers[row["Name"]]["Balance (%)"] = clean(row, "Balance (%)", "0")
            teachers[row["Name"]]["GRU balance 19"] = clean(row, "GRU balance 19", "0")
            teachers[row["Name"]]["GRU balance 20"] = clean(row, "GRU balance 20", "0")
            teachers[row["Name"]]["Årsarbetstid %"] = clean(row, "Årsarbetstid %", "0")

    with open(outputName, 'w', encoding='utf8') as outfile:
        json.dump(teachers, outfile, ensure_ascii=False)


if __name__ == "__main__":
    main()