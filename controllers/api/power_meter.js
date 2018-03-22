// Based on this example:
// https://www.fusioncharts.com/dev/using-with-server-side-languages/tutorials/creating-interactive-charts-using-node-express-and-mongodb.html
// Allerdings sind vorher gelernte Sachen hier weniger schoen
// umgesetzt.
// Use Router object to use this module as middleware
var router = require('express').Router()
// var dbObject = require('../../db') // connect to mongodb

// using mongodb directly, here instead of mongoose
var mongodb = require('mongodb')
var dbHost = "mongodb://localhost:27017/muehle"
var dbObject;
var MongoClient = mongodb.MongoClient;

MongoClient.connect(dbHost, function(err, db){
  if (err) throw err;
  dbObject = db;
})

// Serves the power data at this url
router.get('/api/:tmin/:column', function(req, res, next) {

          var tmin =  new Date(parseInt(req.params.tmin));

          dbObject.collection(req.params.column).find({"time" : {$gt: tmin}}).toArray(function(err, docs){
          if ( err ) throw err;
          var dateArray = [];
          var counts = [];
       
          for ( index in docs ){
            var doc = docs[index];
            var t = doc['time'];

            var count = doc['count'];
            dateArray.push({"time": t});
            counts.push({"value" : count});
          }
       
          var response = {
            "dataset" : counts,
            "categories" : dateArray
          };

          res.json(response);
        });
      }
    )

module.exports = router;
