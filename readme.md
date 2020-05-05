# Description
This is a NodeJS forum system with MongoDB as the database.

If using Postman to test sending post data. Be sure to send as RAW with JSON as the format.

TODO: Use OAuth service for accounts. Maybe GitHub or Twitter.

# How To Setup
1) Install MongoDB or use MongoDB Atlas - https://www.mongodb.com/download-center/community

2) Create a database called "forums" with a collection called "posts". Import the 3 JSON files in the database folder.

3) Open a command prompt or terminal in the directory, use "npm install" then "npm start". The Rest API will be listening on port 5000 by default.

Open app.js and edit settings section if you want.