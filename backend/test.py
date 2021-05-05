import json

with open('info.json', encoding="utf-8") as fl:
    data_dict = json.load(fl)
print(data_dict['Bubulcus ibis']['image'])
