#!/usr/bin/python
# -*- coding: utf-8 -*-

import csv, sqlite3

con = sqlite3.connect("app.db")
cur = con.cursor()
cur.execute("CREATE TABLE IF NOT EXISTS votes (id integer not null, ishot integer, isnot integer);")

with open('data/mobiliario_monumental.csv','rb') as fin:
    # csv.DictReader uses first line in file for column headings by default
    dr = csv.DictReader(fin) # comma is default delimiter
    to_db = [(i['ID'], 0, 0) for i in dr]

cur.executemany("INSERT INTO votes (id, ishot, isnot) VALUES (?, ?, ?);", to_db)
con.commit()
