var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://tan:12345@178.128.218.25:27017/mydb";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  console.log("Database created!");
  db.close();
});
