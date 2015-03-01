#!/usr/bin/env python
# coding=utf-8

from app import Votes, db
from random import randint

votes = Votes.query.all()

for v in votes:
    v.ishot = randint(1,100)
    v.isnot = randint(1,100)
    db.session.commit()
