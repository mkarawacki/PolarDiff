# -*- coding: utf-8 -*-
"""
Created on Sat Oct 20 22:19:05 2018

@author: Mikołaj
"""
from geojson import Polygon, Feature, FeatureCollection, dump
#import geojson
path = "qus-Arc99-200-200.ie"
features = []

f = open(path)
listofcoords=[]
coords=[]
last=[]
for line in f.readlines():
    
    #i=0
    if not line.startswith('0.000'):
        #i=i+1
        coords.append([ float(line.split(" ")[0]),float(line.split(" ")[1].rstrip('\n'))])
        #last=[ float(line.split(" ")[0]),float(line.split(" ")[1].rstrip('\n'))]
        #print(coords)
    else:
        #coords.append(last)
        coords=[]
        listofcoords.append(coords)
        #i=0
        continue
    #print (i)
#print (listofcoords)
poly=Polygon(listofcoords)
#features.append(Feature(geometry=poly, properties={"name": "Pokrywa lodowa"}))
#feature_collection = FeatureCollection(features)
#print(poly)
with open('data.geojson', 'w') as outfile:
    geojson.dump(poly, outfile)