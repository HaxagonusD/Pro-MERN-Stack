const MongoClient = require("mongodb").MongoClient,
  assert = require("assert");

var insertDocuments = function(db, callback) {
  var collection = db.collection("documents");
  collection.insertMany([{ a: 1 }, { a: 2 }, { a: 3 }], (err, result) => {
    assert.equal(err, null);
    assert.equal(3, result.result.n);
    assert.equal(3, result.ops.length);
    console.log("inserted 3 documents into the collection");
    callback(result);
  });
};

var url = "mongodb://localhost:27018/myproject";
function testWithCallbacks() {
  //   MongoClient.connect(
  //     "mongodb://localhost:27017/playground",
  //     { useNewUrlParser: true },
  //     function(err, db) {
  //       db.collection("employees").insertOne(
  //         { id: 1, name: "A. Callback" },
  //         function(err, result) {
  //           console.log("Result of insert:", result.insertId);
  //           db.collection("employees")
  //             .find({ id: 1 })
  //             .toArray(function(err, docs) {
  //               console.log("Result of find:", docs);
  //               db.closer();
  //             });
  //         }
  //       );
  //     }
  //   );

  // Use connect method to connect to the server
  MongoClient.connect(url, { useNewUrlParser: true }, function(err, client) {
    assert.equal(null, err);
    console.log("Connected successfully to server");
    var db = client.db("myproject");
    insertDocuments(db, function() {
      client.close();
    });
  });
}

var testWithPromises = () => {
  var client;
  MongoClient.connect(url, { useNewUrlParser: true })
    .then(connection => {
      client = connection;
      return client.db
        .collection("employees")
        .insertOne({ id: 1, name: "B. Promises" });
    })
    .then(result => {
      console.log("Result of insert:", result.insertId);
      return db
        .collection("employees")
        .find({ id: 1 })
        .toArray();
    })
    .then(docs => {
      console.log("result of find:", docs);
      client.close();
    })
    .catch(err => {
      console.log("ERROR", err);
    });
};
// testWithCallbacks();
testWithPromises();
