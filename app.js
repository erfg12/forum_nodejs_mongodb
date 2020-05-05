const MongoClient = require('mongodb').MongoClient;
const mongo = require('mongodb');
const assert = require('assert');
const Express = require("express");
const BodyParser = require("body-parser");
var app = Express();
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));

// SERVER SETTINGS
const MONGODB_SERVER = "localhost";
const MONGODB_PORT = "27017";
const DB_NAME = "forums";
const POSTS_COLLECTION = "posts";
const CATEGORY_COLLECTION = "categories";
const REPLIES_COLLECTION = "replies";
const EXPRESS_PORT = 5000;
// end

const url = 'mongodb://' + MONGODB_SERVER + ':' + MONGODB_PORT;

//// ENDPOINTS

// thread posts
app.get("/thread/:id", (req, response) => {
  posts_collection.find({'_id':mongo.ObjectId(req.params.id)}).toArray((error, result1) => {
      if(error) {
          return response.status(500).send(error);
      }
      replies_collection.find({'thread_id':req.params.id}).toArray((error, result2) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send(result1.concat(result2));
      });
  });
});

// categories list
app.get("/categories", (req, response) => {
  category_collection.find({}).toArray((error, result) => {
      if(error) {
          return response.status(500).send(error);
      }
      response.send(result);
  });
});

// category posts
app.get("/category/:id", (req, response) => {
  posts_collection.find({'category_id':parseInt(req.params.id)}).toArray((error, result) => {
      if(error) {
          return response.status(500).send(error);
      }
      response.send(result);
  });
});

// make a new post in category
app.post("/post/category/:id", (request, response) => {
      posts_collection.insertOne({ post_title: request.body.post_title, post_body: request.body.post_body, author_id: request.body.author_id, category_id: request.params.id, post_timestamp: Number(new Date()) })
      .then(result => {
        console.log(result);
      })
      .catch(error => console.error(error))
});

// make a new reply in thread
app.post("/post/thread/:id", (request, response) => {
  replies_collection.insertOne({ post_body: request.body.post_body, author_id: request.body.author_id, thread_id: request.params.id, post_timestamp: Number(new Date()) })
      .then(result => {
        //console.log(result)
        console.log("Adding Post: " + request.body);
        console.log(JSON.stringify(request.body, null, 4));
      })
      .catch(error => console.error(error))
    });

app.listen(EXPRESS_PORT, () => {
  MongoClient.connect(url, { useNewUrlParser: true }, (error, client) => {
      if(error) {
          throw error;
      } else {
        console.log("Connected to DB, listening on port " + EXPRESS_PORT);
      }
      database = client.db(DB_NAME);
      posts_collection = database.collection(POSTS_COLLECTION);
      category_collection = database.collection(CATEGORY_COLLECTION);
      replies_collection = database.collection(REPLIES_COLLECTION);
  });
});