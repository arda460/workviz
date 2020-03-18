import json
if __name__ == "__main__":
    anon_HT20 = {}
    anon_VT20 = {}
    anon_summary = {}
    course2anon = {}
    anon2shortname = {}
    index = 1000
    fruits = []
    fruit_counter = 0
    with open('fruits.txt', 'r') as fruitFile:

        fruits = fruitFile.read().split('\n')

    with open('HT20.json', encoding="utf-8") as json_file:

        data = json.load(json_file)
        for key in data:
            course = "XX"+str(index)
            if(key[-1] == "H"):
                course = course + " H"
            tmp = data[key]['short name']
            data[key]['short name'] = fruits[fruit_counter]
            anon2shortname[course] = fruits[fruit_counter]
            anon_HT20[course] = data[key]
            course2anon[key] = course
            fruit_counter += 1
            index += 1

    with open('VT20.json', encoding="utf-8") as json_file:

        data = json.load(json_file)
        for key in data:
            course = "XX"+str(index)
            if(key[-1] == "V"):
                course = course + " V"
            tmp = data[key]['short name']
            data[key]['short name'] = fruits[fruit_counter]
            anon2shortname[course] = fruits[fruit_counter]
            anon_VT20[course] = data[key]
            course2anon[key] = course
            fruit_counter += 1
            index += 1

    with open('summary20.json', encoding="utf-8") as json_file:
        data = json.load(json_file)
        for teacher in data:
            for course in data[teacher]['HT Courses']:
                tmp = course['Course Code']
                course['Course Code'] = course2anon[tmp]
                course['Short Name'] = anon2shortname[course2anon[tmp]]
            for course in data[teacher]['VT Courses']:
                tmp = course['Course Code']
                course['Course Code'] = course2anon[tmp]
                course['Short Name'] = anon2shortname[course2anon[tmp]]
        anon_summary = data

    with open('anonHT20.json', 'w', encoding="utf-8") as output:
        json.dump(anon_HT20, output, ensure_ascii=False)
    with open('anonVT20.json', 'w', encoding="utf-8") as output:
        json.dump(anon_VT20, output, ensure_ascii=False)

    with open('anon_summary.json', 'w', encoding="utf-8") as output:
        json.dump(anon_summary, output, ensure_ascii=False)
