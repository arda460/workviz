import csv
import json
import pandas as pd
import re

# Global
filename = "./rawData/summary20.csv"
outputName = "summary20.json"

def cleanNumb(numb):
    # Change dash to minus
    numbNoDash = numb.replace('−','-')
    # Change , into .
    numbNoComma = numbNoDash.replace(',', '.')
    # remove \r endings
    numbNoEscape = numbNoComma if not re.search(r'\r', numbNoComma) else numbNoComma[:-1]
    # Remove % sign from end
    numbNoProc = numbNoEscape[:-1] if numbNoEscape.endswith('%') else numbNoEscape
    # If only . then replace with zero
    numbNoEmpty = 0 if numbNoProc == '.' else numbNoProc
    return float(numbNoEmpty)

def getResponsible(row, k):
    responsible = []
    # Handle multible courses in column
    if not isinstance(row[k], float):
        # Get all course lines
        lines = row[k].split('\n')
        for i in range(len(lines)):
            # Split course line into code,name and %
            course = lines[i].split(' ')
            
            if course[0][0] == '*':
                responsible.append(course[0][1:].upper())            
    
    return responsible
 
def getCourses(row, k):
    courseList = []
    
    # Handle multible courses in column
    if not isinstance(row[k], float):
        # Get all course lines
        lines = row[k].split('\n')
        for i in range(len(lines)):
            # Split course line into code,name and %
            course = lines[i].split(' ')
            code = course[0][1:] if course[0][0] == '*' else course[0]

            tmp = {
                "Course Code": code.upper(),
                "Short Name": course[1][:-1], # Remove ":" from name
                "Work %": cleanNumb(course[2])
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

            tmp = clean(row, "Kontering HCT (%)", "0")
            teachers[row["Name"]]["Kontering HCT (%)"] = cleanNumb(tmp)

            tmp = clean(row, "Bemnnad HCT Gru (%)", "0")
            teachers[row["Name"]]["Bemnnad HCT Gru (%)"] = cleanNumb(tmp)
    
            teachers[row["Name"]]["Responsible VT"] = getResponsible(row, "VT courses + exjobb")
            teachers[row["Name"]]["VT Courses"] = getCourses(row, "VT courses + exjobb")
            teachers[row["Name"]]["Gru VT (%)"] = cleanNumb(row["Gru VT (%).1"])
    
            teachers[row["Name"]]["Responsible HT"] = getResponsible(row, "HT courses")
            teachers[row["Name"]]["HT Courses"] = getCourses(row, "HT courses")
            teachers[row["Name"]]["Gru HT (%)"] = cleanNumb(row["Gru HT (%).1"])

            tmp = clean(row, "Self-development &Friskvård (%)", "0")
            teachers[row["Name"]]["Self-development &Friskvård (%)"] = cleanNumb(tmp)

            tmp = clean(row, "Extra (%)", "0")
            teachers[row["Name"]]["Extra (%)"] = cleanNumb(tmp)

            tmp = clean(row, "Balance (%)", "0")
            teachers[row["Name"]]["Balance (%)"] = cleanNumb(tmp)

            tmp = clean(row, "GRU balance 19", "0")
            teachers[row["Name"]]["GRU balance 19"] = cleanNumb(tmp)

            tmp = clean(row, "GRU balance 20", "0")
            teachers[row["Name"]]["GRU balance 20"] = cleanNumb(tmp)

            tmp = clean(row, "Årsarbetstid %", "0")
            teachers[row["Name"]]["Årsarbetstid %"] = cleanNumb(tmp)


    with open(outputName, 'w', encoding='utf8') as outfile:
        json.dump(teachers, outfile, ensure_ascii=False)


if __name__ == "__main__":
    main()