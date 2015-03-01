#!/usr/bin/env python
# coding=utf-8

from flask import Flask, jsonify, request
from flask.ext.sqlalchemy import SQLAlchemy
import csv
import os

basedir = os.path.abspath(os.path.dirname(__file__))
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'app.db') + "?check_same_thread=false"
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

@app.route('/statues/<int:number>', methods=['POST'])
def statue(number):
    # import ipdb; ipdb.set_trace()

    uservote = request.json['vote']
    db_vote = Votes.query.get(number)
    if db_vote is None:
        result = {'error': 'ID {0} is not available.'.format(number)}
        return jsonify(**result), 404

    if uservote == 'hot':
        db_vote.ishot += 1
        db.session.commit()
    elif uservote == 'not':
        db_vote.isnot += 1
        db.session.commit()
    else:
        result = {'error': '{0} is no valid choice'.format(uservote)}
        return jsonify(**result), 404

    result = {
        'id': db_vote.id,
        'hot': db_vote.ishot,
        'not': db_vote.isnot,
        'uservote': uservote
    }
    return jsonify(**result)


if __name__ == "__main__":
    app.run(debug=True)
