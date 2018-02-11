const express = require('express');
var app = express();

app.use(express.static('public'));

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://lokineji:sunset777@ds229008.mlab.com:29008/bpmn_database";

$("#js-export-diagram").click((e)=>{
  console.log('Zdarova');
  saveDiagramToBD(function(err, xml) {
    
     //setEncode(exportLink, 'diagram.bpmn', err ? null : xml);
  
      MongoClient.connect(url, function(err,db) {
        var collection = db.collection('bpmn-diagrams');      
        collection.insertOne(xml, function(err,result){
   
          if(err) {
            console.log(err);
            return;
          }
          console.log(result.ops);
          db.close();
        });
      });
   
  });

app.get("/", (req, res) => {
  res.sendFile("./index.html");
  console.log('Hello')
});

app.listen(3000);
