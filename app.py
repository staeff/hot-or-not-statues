#!/usr/bin/env python
# coding=utf-8

from flask import Flask, jsonify
from flask.ext.sqlalchemy import SQLAlchemy
import csv
import os

basedir = os.path.abspath(os.path.dirname(__file__))
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'app.db')
db = SQLAlchemy(app)

class Votes(db.Model):
    __tablename__ = 'votes'
    id = db.Column(db.Integer, primary_key=True, autoincrement=False)
    ishot = db.Column(db.Integer)
    isnot = db.Column(db.Integer)

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
    return jsonify(statues=parse())

@app.route('/statues/<int:number>')
def statue(number):
    vote = Votes.query.get(number)

    if vote:
        result = {
            'id': vote.id,
            'hot': vote.ishot,
            'not': vote.isnot,
        }
        return jsonify(**result)
    else:
        result = {'error': 'ID is not available.'}
        return jsonify(**result), 404


if __name__ == "__main__":
    app.run(debug=True)
