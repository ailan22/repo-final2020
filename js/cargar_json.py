import json
with open("countries.json", "r") as archivo:
    datos = json.load(archivo)
    print(len(datos["countries"]))

#print ("Hello world")