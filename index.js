const express = require('express');
const bodyParser     = require('body-parser');
var app = express();
var db;
app.use(express.static('public'));

app.get("/", (req, res) => {
  res.sendFile("./index.html")
});
////MongoDB
app.use(bodyParser.urlencoded({ extended: true }));

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://lokineji:sunset777@ds229008.mlab.com:29008/bpmn_database"

MongoClient.connect(url, function(err,db) {
  var collection = db.collection('users');
  var user = {firstName:"Ivan", lastname: "Ivanov", age: 38 };

  collection.insertOne(user, function(err,result){

    if(err) {
      console.log(err);
      return;
    }
    console.log(result.ops);
    db.close();
  });
});

app.listen(3000);
