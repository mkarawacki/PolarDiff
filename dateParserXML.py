# -*- coding: utf-8 -*-
"""
Created on Sun Oct 21 12:57:34 2018

@author: Mikołaj
"""

from xml.dom import minidom
import urllib3
import datetime
NISEurl = "https://neo.sci.gsfc.nasa.gov/servlet/FGDCMetadata?datasetId=NISE_D"
MOD11url = "https://neo.sci.gsfc.nasa.gov/servlet/FGDCMetadata?datasetId=MOD11C1_E_LSTNI"
from urllib.request import urlopen
resp = urlopen(NISEurl)
dom = minidom.parse(resp) # parse the data
date = dom.getElementsByTagName('caldate')

caldate = [date]
print(caldate)

from lxml import etree
el = etree.parse('MOD11C1_E_LSTNI.xml')
categories = el.xpath("//timeperd//timeinfo//mdattim//sngdate")
print(categories)
date_str = '20170101' # The date - 29 Dec 2017
format_str = '%Y%m%d' # The format
datetime_obj = datetime.datetime.strptime(date_str, format_str)
print(datetime_obj.date())