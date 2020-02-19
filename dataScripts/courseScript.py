import csv
import json

# Global
filename = ["./rawData/VT20RAW.csv","./rawData/HT20RAW.csv"]
outputNames = ["VT20.json", "HT20.json"]

# Deal with top line (1)
def topLine(line, jsonCourses):
    lineCount = 0
    for i in range(4, len(line), 3):
        # Check if still in course range
        if line[ i + 1 ]:
            # Split periods into Array and save under period KEY within course code key
            periods = line[i].split()
            course = line[ i + 1].upper()
            jsonCourses[ course ] = { "Period": periods,
                                            "Teachers": {} }


# Deal with % line (2)
def secondLine(line, jsonCourses):
    # Do globaly
    keyList = list(jsonCourses)
    
    keyCount = 0
    for i in range(4, len(line), 3):
        if not line[i]:
            return

        key = keyList[keyCount]

        jsonCourses[key]["% no 1"] = line[i]
        jsonCourses[key]["short name"] = line[i+1]
        jsonCourses[key]["% no 2"] = line[i+2]
        
        keyCount += 1        

# Deal with no line (3) and salary line (4) written exam (9) hour distribution num (20) "dont worry" (21)
def middleValLines(innerKey, line, jsonCourses):
    # Do globaly
    keyList = list(jsonCourses)
    keyCount = 0
    for i in range(4, len(line), 3):
        key = keyList[keyCount]
        # Handles "-" in string (string interpritation)
        val = line[ i + 1 ].replace("âˆ’","-")
        jsonCourses[key][innerKey] = val
        
        keyCount += 1   

# Deal with course dev (5) and course assistants (7) general supervision (10)
def fullLines(k1,k2,k3,line, jsonCourses):
    # Do globaly
    keyList = list(jsonCourses)
    keyCount = 0
    for i in range(4, len(line), 3):
        key = keyList[keyCount]

        jsonCourses[key][k1] = line[i]
        jsonCourses[key][k2] = line[i+1]
        jsonCourses[key][k3] = line[i+2]
        
        keyCount += 1   

# preperation (6) and examination
def linesWithLast2(k1,k2,line, jsonCourses):
    # Do globaly
    keyList = list(jsonCourses)
    keyCount = 0
    for i in range(4, len(line), 3):
        key = keyList[keyCount]

        jsonCourses[key][k1] = line[i+1]
        jsonCourses[key][k2] = line[i+2]
        
        keyCount += 1  

def getName(rNo):
    if rNo == 12:
        return "Föreläsning (Frl) "
    elif rNo == 13:
        return "Övning (Ovn) "
    elif rNo == 14:
        return "Laboration (La) "
    elif rNo == 15:
        return "Handledning (Ha) "
    elif rNo == 16:
        return "Examination (Ex) "
    elif rNo == 17:
        return "Kursutveckling (Ku) "
    elif rNo == 18:
        return "Administration (Adm) "
    else:
        return "Totalt "

# hour distribution (12-19)
def hourDistribution(rowNo,line, jsonCourses):
    # Do globaly
    keyList = list(jsonCourses)
    keyCount = 0
    for i in range(4, len(line), 3):
        key = keyList[keyCount]

        k1 = "{} Budgeted".format(getName(rowNo))
        k2 = "{} Allocated".format(getName(rowNo))

        jsonCourses[key][k1] = line[i]
        jsonCourses[key][k2] = line[i+2]
        
        keyCount += 1  

#  teachers (22-.....)
def teacherDistribution(line, jsonCourses):
    # Do globaly
    keyList = list(jsonCourses)
    keyCount = 0
    for i in range(4, len(line), 3):
        if line[i] and keyCount < len(keyList):
            key = keyList[keyCount]

            teacher = line[ i +1 ]

            # If teacher object exists
            if teacher in jsonCourses[key]["Teachers"]:

                # If "teacher" is assigned the same work more than once -> sum the work
                if line[ i ] in jsonCourses[key]["Teachers"][ teacher ]:
                    oldVal = jsonCourses[key]["Teachers"][ teacher ][ line[ i ] ]
                    newVal = line[ i + 2 ]
                    oldVal = 0 if oldVal == '' else float(oldVal)
                    newVal = 0 if newVal == '' else float(newVal)
                    jsonCourses[key]["Teachers"][ teacher ][ line[ i ] ] = str(oldVal + newVal)

                # Else asigne teacher this work
                else:
                    jsonCourses[key]["Teachers"][ teacher ][ line[ i ] ] = line[ i + 2]

            # Create teacher object
            else:
                jsonCourses[key]["Teachers"][ teacher ] = { line[i]: line[ i + 2] }

        # Key count continues even if line is empty    
        keyCount += 1







def main():
    for i in range(2):
        jsonCourses = {}
        rowNo = 1
        with open(filename[i], newline='', encoding='utf-8') as csvfile:
            reader = csv.reader(csvfile, delimiter='\n')
            for row in reader:
                lineArray = row[0].split(',')
                
                if rowNo == 1:
                    topLine(lineArray, jsonCourses)
                elif rowNo == 2:
                    secondLine(lineArray, jsonCourses)
                elif rowNo == 3: 
                    middleValLines("Credits", lineArray, jsonCourses)
                elif rowNo == 4: 
                    middleValLines("Financial Outcome", lineArray, jsonCourses)
                elif rowNo == 9:
                    middleValLines("Written Exams", lineArray, jsonCourses)
                elif rowNo == 20:
                    middleValLines("Lärartimmar/elevpoäng", lineArray, jsonCourses)
                elif rowNo == 21:
                    middleValLines("Emplyee cost+LKP", lineArray, jsonCourses)
                elif rowNo == 5:
                    fullLines("Course Dev Hours","Lecture Hours","Prep time per lecture hour", lineArray, jsonCourses)
                elif rowNo == 7:
                    fullLines("Lab Assistans (teacher included)","Lab Hours","Prep time for labs in total", lineArray, jsonCourses)
                elif rowNo == 10:
                    fullLines("General Subervision per student","Number of students","Reporting hours per student", lineArray, jsonCourses)
                elif rowNo == 6:
                    linesWithLast2("Exercise Hours","Prep time per exercise hour", lineArray, jsonCourses)
                elif rowNo == 8:
                    linesWithLast2("Exam Hours","Examination hours per student", lineArray, jsonCourses)
                elif rowNo >= 12 and rowNo <= 19:
                    hourDistribution(rowNo, lineArray, jsonCourses)
                elif rowNo > 22:
                    teacherDistribution(lineArray, jsonCourses)
                
                rowNo += 1

        with open(outputNames[i], 'w', encoding='utf8') as outfile:
            json.dump(jsonCourses, outfile, ensure_ascii=False)


if __name__ == "__main__":
    main()