import json

# Global
fileN1 = './summary20.json'
fileN2 = './HT20.json'
fileN3 = './VT20.json'
outF1 = 'HT20-2.json'
outF2 = 'Vt20-2.json'

def addResp(data,key,teach):
    data[key]['Responsible'].append(teach)

def main():
    with open(fileN1, encoding='utf8') as f:
        summary = json.load(f)
    with open(fileN2, encoding='utf8') as f:
        ht = json.load(f)
    with open(fileN3, encoding='utf8') as f:
        vt = json.load(f)
    
    for course in ht:
        ht[course]['Responsible'] = []

    for course in vt:
        vt[course]['Responsible'] = []

    for teacher in summary:
        
        for i in range(len(summary[teacher]['Responsible VT'])):
            courseC = summary[teacher]['Responsible VT'][i]
            if courseC in vt:
                addResp(vt, courseC, teacher)
            else:
                addResp(ht, courseC, teacher)
        
        for i in range(len(summary[teacher]['Responsible HT'])):
            courseC = summary[teacher]['Responsible HT'][i]
            if courseC in ht:
                addResp(ht, courseC, teacher)
            else:
                addResp(vt, courseC, teacher)
    

    with open(outF1, 'w', encoding='utf8') as outfile:
        json.dump(ht, outfile, ensure_ascii=False)
    
    with open(outF2, 'w', encoding='utf8') as outfile:
        json.dump(vt, outfile, ensure_ascii=False)


if __name__ == "__main__":
    main()