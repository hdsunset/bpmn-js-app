const express = require('express');
var app = express();

const MongoClient    = require('mongodb').MongoClient;
const bodyParser     = require('body-parser');

app.use(express.static('public'));

app.get("/", (req, res) => {
  res.sendFile("./index.html")
});

var url ="mongodb://lokineji:sunset777@ds229008.mlab.com:29008/bpmn_database";
/// MongoDB

/// catch ajax requests
///GET
app.get("/exporttodb", (req, res) => {
  var keyData = [];
  db.createKeyStream()
  .on('data', function (data) {
  keyData.push(data.toString())
  })
  .on('end', function () {
  res.end(JSON.stringify({keys: keyData}))
  });
  ///Insert to Mongodb
  MongoClient.connect(url, function(err,db) {
    var collection = db.collection('bpmn-diagrams');      
    collection.insertOne(req.body, function(err,result){
 
      if(err) {
        console.log(err);
        return;
      }
      console.log(result.ops);
      db.close();

     });
   });


  });

  
///
// app.get("/exporttodb", (req, res) => {
//   db.get(req.query.name, function (err, value) {
//     if (err) return res.status(204).send("NO FILE")
//     res.send(value);
//     });
//     });

  
app.listen(3000);
