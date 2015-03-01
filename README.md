Hot or Not for Statues in Gran Canaria
======================================

This repository contains an app that was built during the Open Data Hackathon
2015 in Gran Canaria. The app shows images of statues on the island and lets
users vote them "Hot" or "Not".


Development hints
=================

  * To initialize the database:

        $ python initdb.py

  * To keep CSS up to date:

        $ cd static/stylesheets
        $ sass --watch app.scss:app.css

  * Test: Does the frontend skip images that don’t load? (404, etc.)
