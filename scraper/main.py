# coding: utf-8
import requests;
import json;

with open("../data/data.json")  as json_file:

    data = json.load(json_file);
    data_copy = json.loads(json.dumps(data));
    for med_ind in range(len(data)):
        med_name = data_copy[med_ind]["generic"].strip();
        url = "https://en.wikipedia.org/w/api.php?action=query&prop=extracts&format=json&exintro=&titles="+med_name+"&origin=*";
        r = requests.get(url);
        json_res = json.loads(r.content);
        
        key = json_res["query"]["pages"].keys()[0];
        try:
            if key != -1:
                extract = json_res["query"]["pages"][str(key)]["extract"];
                data_copy[med_ind]["extract"] = extract;
                print('['+ med_name +'] Successfully Fetched!');

        except:
            data_copy[med_ind]["extract"] = "";
            print("[" + med_name + "] Something happened!")
       


    json_str = json.dumps(data_copy);

    f = open('../data/data_copy.json', 'w');
    f.write(json_str);
    print(json_str);
    f.close();