const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const MongoClient = require("mongodb").MongoClient;
const Issue = require("./issue.js");
app.use(express.static("static"));
app.use(bodyParser.json());

var db;
var url = "mongodb://localhost:27018/issuetracker";

app.get("/api/issues", (req, res) => {
  db.collection("issues")
    .find()
    .toArray()
    .then(issues => {
      const metadata = { total_count: issues.length };
      res.json({ _metadata: metadata, records: issues });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: `Internal Server Error ${error}` });
    });
});

app.post("/api/issues", (req, res) => {
  const newIssue = req.body;

  newIssue.created = new Date();

  if (!newIssue.status) {
    newIssue.status = "New";
  }
  const err = Issue.validateIssue(newIssue);
  if (err) {
    res.status(422).json({ message: `Invalid request: ${err}` });
    return;
  }
  db.collection("issues")
    .insertOne(newIssue)
    .then(result => {
      return db
        .collection("issues")
        .find({ _id: result.insertedId })
        .limit(1)
        .next();
    })
    .then(newIssue => {
      res.json(newIssue);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: `Internal Server Error: ${error}` });
    });
});

MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
  if (err) throw err;
  db = client.db("issuetracker");
  app.listen(3000, () => {
    console.log("App started on port 3000");
  });
});
