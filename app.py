#!/usr/bin/env python
# coding=utf-8

from flask import Flask, jsonify, request
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


@app.after_request
def add_cors(resp):
    """
    Ensure all responses have the CORS headers. This ensures any failures are
    also accessible by the client.
    Source: http://mortoray.com/2014/04/09/allowing-unlimited-access-with-cors/
    """
    resp.headers['Access-Control-Allow-Origin'] = request.headers.get(
        'Origin', '*')

    resp.headers['Access-Control-Allow-Credentials'] = 'true'
    resp.headers['Access-Control-Allow-Methods'] = 'POST, OPTIONS, GET'

    resp.headers['Access-Control-Allow-Headers'] = request.headers.get(
        'Access-Control-Request-Headers', 'Authorization')

    # set low for debugging
    if app.debug:
        resp.headers['Access-Control-Max-Age'] = '1'

    return resp


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
    from flask import send_from_directory, send_file

    @app.route('/')
    def index():
        return send_file('static/app.html')

    @app.route('/<path:path>')
    def static_files(path):
        return send_from_directory('static', path)

    app.run(debug=True)
