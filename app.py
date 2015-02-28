#!/usr/bin/env python
# coding=utf-8

from flask import Flask, jsonify
import csv

app = Flask(__name__)

def parse(raw_file='data/mobiliario_monumental.csv', delimiter=','):
    """Parses a raw CSV file to a JSON-like object"""

    # Open CSV file
    opened_file = open(raw_file)

    # Read the CSV data
    csv_data = csv.reader(opened_file, delimiter=delimiter)

    # Setup an empty list
    parsed_data = []

    # Skip over the first line of the file for the headers
    fields = csv_data.next()

    # Iterate over each row of the csv file, zip together field -> value
    for row in csv_data:
        parsed_data.append(dict(zip(fields, row)))

    # Close the CSV file
    opened_file.close()

    return parsed_data

@app.route('/statues/')
def statues():
    return jsonify(items=parse())

@app.route('/statues/<int:number>')
def statue(number):
    ishot = 3143 # "gethotquery"
    isnot = 123  # "getnotquery"

    result = {
        'id': number,
        'hot': ishot,
        'not': isnot,
    }

    return jsonify(items=result)

if __name__ == "__main__":
    app.run(debug=True)
